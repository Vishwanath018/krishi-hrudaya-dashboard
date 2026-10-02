import json
import re
import joblib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import mysql.connector


ROOT = Path(__file__).resolve().parent.parent
DATABASE_CONFIG_FILE = ROOT / "database.txt"

NLP_MODEL_FILE = Path(__file__).resolve().parent / "nlp" / "intent_classifier.joblib"
NLP_CONFIDENCE_THRESHOLD = 0.75
NLP_MODEL = None


def load_nlp_model():
    global NLP_MODEL

    if NLP_MODEL is not None:
        return NLP_MODEL

    if not NLP_MODEL_FILE.exists():
        return None

    NLP_MODEL = joblib.load(NLP_MODEL_FILE)

    return NLP_MODEL


def predict_nlp_intent(question):
    model = load_nlp_model()

    if model is None:
        return None, 0.0

    try:
        probabilities = model.predict_proba([question])[0]
        classes = model.classes_

        best_index = probabilities.argmax()

        return (
            classes[best_index],
            float(probabilities[best_index])
        )

    except Exception:
        return None, 0.0



def load_database_config():
    config = {}

    with open(DATABASE_CONFIG_FILE, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()

            if line and "=" in line:
                key, value = line.split("=", 1)
                config[key.strip()] = value.strip()

    return config


def get_connection():
    config = load_database_config()

    return mysql.connector.connect(
        host=config["DB_HOST"],
        port=int(config["DB_PORT"]),
        database=config["DB_NAME"],
        user=config["DB_USER"],
        password=config.get("DB_PASSWORD", "")
    )


def get_database_password():
    """
    Password is intentionally NOT stored in this source file.

    The server asks for DB_PASSWORD through the environment.
    """
    import os

    password = os.environ.get("KH_DB_PASSWORD")

    if not password:
        raise RuntimeError(
            "KH_DB_PASSWORD environment variable is not set."
        )

    return password


def get_connection():
    config = load_database_config()

    return mysql.connector.connect(
        host=config["DB_HOST"],
        port=int(config["DB_PORT"]),
        database=config["DB_NAME"],
        user=config["DB_USER"],
        password=get_database_password()
    )


def scalar(cursor, query, params=None):
    cursor.execute(query, params or ())
    row = cursor.fetchone()

    if not row:
        return 0

    return row[0]


def database_summary():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()

        result = {
            "users": scalar(
                cursor,
                "SELECT COUNT(*) FROM `users`"
            ),

            "active_users": scalar(
                cursor,
                "SELECT COUNT(*) FROM `users` WHERE `is_active` = 1"
            ),

            "products": scalar(
                cursor,
                "SELECT COUNT(*) FROM `products`"
            ),

            "farms": scalar(
                cursor,
                "SELECT COUNT(*) FROM `farms`"
            ),

            "installations": scalar(
                cursor,
                "SELECT COUNT(*) FROM `installations`"
            ),

            "borewells": scalar(
                cursor,
                "SELECT COUNT(*) FROM `borewell`"
            ),

            "starter_devices": scalar(
                cursor,
                "SELECT COUNT(*) FROM `starter_data`"
            ),

            "statistics_records": scalar(
                cursor,
                "SELECT COUNT(*) FROM `starter_statistics`"
            ),

            "event_logs": scalar(
                cursor,
                "SELECT COUNT(*) FROM `event_logs`"
            ),

            "user_permissions": scalar(
                cursor,
                "SELECT COUNT(*) FROM `user_permissions`"
            ),

            "enquiries": scalar(
                cursor,
                "SELECT COUNT(*) FROM `enquiries`"
            ),

            "bwssb_records": scalar(
                cursor,
                "SELECT COUNT(*) FROM `bwssb`"
            ),
        }

        return result

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()


def get_devices():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                `uid`,
                `farm_id`,
                `pump_name`,
                `voltage1`,
                `voltage2`,
                `voltage3`,
                `current1`,
                `current2`,
                `current3`,
                `power_available`,
                `motor_state`,
                `device_state`,
                `total_run_time`,
                `device_mode`,
                `signal_strength`,
                `actual_water_level`,
                `flow_counter`,
                `captured_date`,
                `updated_at`,
                `status`
            FROM `starter_data`
            ORDER BY `updated_at` DESC
            LIMIT 100
            """
        )

        rows = cursor.fetchall()

        return rows

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()


def get_recent_events():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                `id`,
                `uid`,
                `event_category`,
                `message`,
                `user_name`,
                `created_at`
            FROM `event_logs`
            ORDER BY `created_at` DESC
            LIMIT 50
            """
        )

        return cursor.fetchall()

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()

def get_installation_summary():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                COUNT(*) AS total_installations,
                SUM(CASE WHEN `status` = 1 THEN 1 ELSE 0 END)
                    AS status_1_installations,
                SUM(CASE WHEN `status` = 0 THEN 1 ELSE 0 END)
                    AS status_0_installations
            FROM `installations`
            """
        )

        row = cursor.fetchone()

        return row

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()


def normalize_question(question):
    question = question.lower()

    question = re.sub(r"[^a-z0-9\s]", " ", question)

    question = re.sub(r"\s+", " ", question)

    return question.strip()



def get_count(table_name):
    allowed_tables = {
        "users",
        "products",
        "farms",
        "installations",
        "borewell",
        "user_permissions",
        "enquiries",
    }

    if table_name not in allowed_tables:
        raise ValueError("Invalid table requested.")

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor()
        cursor.execute(f"SELECT COUNT(*) FROM `{table_name}`")
        return cursor.fetchone()[0]
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()


def get_product_test_status():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                CAST(`status` AS CHAR) AS status,
                COUNT(*) AS count
            FROM `products`
            GROUP BY `status`
            ORDER BY count DESC
            LIMIT 20
            """
        )

        return cursor.fetchall()
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()


def get_failed_products():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                `id`,
                `uid`,
                `product_type`,
                `test_status`,
                `test_remarks`,
                CAST(`status` AS CHAR) AS status
            FROM `products`
            WHERE LOWER(CAST(`test_status` AS CHAR)) LIKE '%fail%'
               OR LOWER(CAST(`test_remarks` AS CHAR)) LIKE '%fail%'
            ORDER BY `id` DESC
            LIMIT 100
            """
        )

        return cursor.fetchall()
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()


def get_today_power_failures():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                `id`,
                `uid`,
                `event_category`,
                `message`,
                `user_name`,
                `created_at`
            FROM `event_logs`
            WHERE DATE(`created_at`) = CURDATE()
              AND LOWER(
                    CONCAT(
                        COALESCE(`event_category`, ''),
                        ' ',
                        COALESCE(`message`, '')
                    )
                  ) LIKE '%power%'
              AND LOWER(
                    CONCAT(
                        COALESCE(`event_category`, ''),
                        ' ',
                        COALESCE(`message`, '')
                    )
                  ) LIKE '%fail%'
            ORDER BY `created_at` DESC
            LIMIT 50
            """
        )

        return cursor.fetchall()
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()


def get_recent_motor_events():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                `id`,
                `uid`,
                `event_category`,
                `message`,
                `user_name`,
                `created_at`
            FROM `event_logs`
            WHERE LOWER(COALESCE(`message`, '')) LIKE '%motor%'
            ORDER BY `created_at` DESC
            LIMIT 50
            """
        )

        return cursor.fetchall()

    finally:
        if cursor is not None:
            cursor.close()

        if connection is not None:
            connection.close()

def get_active_devices():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                `uid`,
                `farm_id`,
                `pump_name`,
                `motor_state`,
                `device_state`,
                `power_available`,
                `signal_strength`,
                `actual_water_level`,
                `device_mode`,
                `captured_date`,
                `updated_at`,
                `status`
            FROM `starter_data`
            WHERE `status` = 1
            ORDER BY `updated_at` DESC
            LIMIT 100
            """
        )

        return cursor.fetchall()
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()


def get_farm_statistics():
    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                COUNT(*) AS statistics_records,
                COALESCE(SUM(`day_water_yield`), 0) AS total_day_water_yield,
                COALESCE(SUM(`month_water_yield`), 0) AS total_month_water_yield,
                COALESCE(SUM(`year_water_yield`), 0) AS total_year_water_yield,
                COALESCE(SUM(`total_on_off_cycles`), 0) AS total_on_off_cycles,
                COALESCE(SUM(`total_overload_trips`), 0) AS total_overload_trips,
                COALESCE(SUM(`total_underload_trips`), 0) AS total_underload_trips,
                COALESCE(SUM(`maintenance_alert`), 0) AS maintenance_alerts
            FROM `starter_statistics`
            """
        )

        statistics = cursor.fetchone()

        cursor.execute("SELECT COUNT(*) AS total_farms FROM `farms`")
        farms = cursor.fetchone()

        cursor.execute("SELECT COUNT(*) AS total_borewells FROM `borewell`")
        borewells = cursor.fetchone()

        return {
            **statistics,
            **farms,
            **borewells,
        }
    finally:
        if cursor is not None:
            cursor.close()
        if connection is not None:
            connection.close()


def normalize_question(question):
    question = question.lower()
    question = re.sub(r"[^a-z0-9\s]", " ", question)
    question = re.sub(r"\s+", " ", question)
    return question.strip()


def detect_requested_intents(question):
    normalized = normalize_question(question)
    intents = []

    # Complete database / database-summary requests
    database_phrases = {
        "database",
        "database report",
        "database summary",
        "database information",
        "database details",
        "database data",
        "database records",
        "show database",
        "show me database",
        "show database report",
        "show me database report",
        "give database report",
        "give me database report",
        "complete database",
        "full database",
        "entire database",
        "complete database report",
        "full database report",
        "complete database summary",
        "full database summary",
        "complete report",
        "full report",
        "entire report"
    }

    if normalized in database_phrases:
        intents.append("database_summary")


    # Specific phrases must be detected before generic phrases.
    if "motor events" in normalized or "motor event" in normalized:
        intents.append("motor_events")
    elif "event logs" in normalized or "event log" in normalized or "recent events" in normalized or "events" in normalized:
        intents.append("events")

    if "power failure" in normalized or "power failures" in normalized or "power failed" in normalized:
        intents.append("power_failures")

    if "failed tests" in normalized or "failed products" in normalized or "product tests" in normalized:
        intents.append("failed_tests")

    if "active devices" in normalized or "active device" in normalized:
        intents.append("active_devices")

    if "farm statistics" in normalized or "farm statistic" in normalized:
        intents.append("farm_statistics")
    elif "farm" in normalized or "farms" in normalized:
        intents.append("farms")

    if "user" in normalized or "users" in normalized:
        intents.append("users")

    if "product" in normalized or "products" in normalized:
        intents.append("products")

    if "installation" in normalized or "installations" in normalized:
        intents.append("installations")

    if "borewell" in normalized or "borewells" in normalized:
        intents.append("borewells")

    if "permission" in normalized or "permissions" in normalized:
        intents.append("permissions")

    if "enquiry" in normalized or "enquiries" in normalized:
        intents.append("enquiries")

    if "device" in normalized or "devices" in normalized:
        intents.append("devices")

    # Remove duplicate intents while preserving order.
    unique_intents = []
    for intent in intents:
        if intent not in unique_intents:
            unique_intents.append(intent)

    # Existing rule-based detection remains authoritative for
    # multi-intent questions.
    #
    # NLP is used only when the rules found nothing.
    if not unique_intents:
        nlp_intent, nlp_confidence = predict_nlp_intent(question)

        if (
            nlp_intent is not None
            and nlp_confidence >= NLP_CONFIDENCE_THRESHOLD
        ):
            unique_intents.append(nlp_intent)

    return unique_intents

    return unique_intents

def route_question(question):
    intents = detect_requested_intents(question)

    if len(intents) == 1:
        return intents[0]

    if len(intents) > 1:
        return "multi"

    return "unknown"


def build_single_intent_result(intent):
    if intent == "users":
        return {
            "label": "Users",
            "data": {
                "count": get_count("users")
            }
        }

    if intent == "products":
        return {
            "label": "Products",
            "data": {
                "count": get_count("products"),
                "status_breakdown": get_product_test_status()
            }
        }

    if intent == "farms":
        return {
            "label": "Farms",
            "data": {
                "count": get_count("farms")
            }
        }

    if intent == "installations":
        return {
            "label": "Installations",
            "data": get_installation_summary()
        }

    if intent == "borewells":
        return {
            "label": "Borewells",
            "data": {
                "count": get_count("borewell")
            }
        }

    if intent == "permissions":
        return {
            "label": "User Permissions",
            "data": {
                "count": get_count("user_permissions")
            }
        }

    if intent == "enquiries":
        return {
            "label": "Enquiries",
            "data": {
                "count": get_count("enquiries")
            }
        }

    if intent == "devices":
        data = get_devices()

        return {
            "label": "Devices",
            "data": data
        }

    if intent == "events":
        data = get_recent_events()

        return {
            "label": "Recent Events",
            "data": data
        }

    if intent == "motor_events":
        data = get_recent_motor_events()

        return {
            "label": "Recent Motor Events",
            "data": data
        }

    if intent == "power_failures":
        data = get_today_power_failures()

        return {
            "label": "Today's Power Failures",
            "data": data
        }

    if intent == "failed_tests":
        data = get_failed_products()

        return {
            "label": "Failed Tests",
            "data": data
        }

    if intent == "farm_statistics":
        data = get_farm_statistics()

        return {
            "label": "Farm Statistics",
            "data": data
        }

    return None


def build_assistant_response(question):
    intents = detect_requested_intents(question)

    if not intents:
        return {
            "success": False,
            "intent": "unknown",
            "question": question,
            "message": (
                "I could not identify the database information requested. "
                "Try asking for users, products, devices, farms, installations, "
                "events, borewells, permissions, enquiries, failed tests, "
                "power failures, motor events, farm statistics, or a complete report."
            ),
        }

    if intents == ["database_summary"]:
        data = database_summary()

        return {
            "success": True,
            "intent": "database_summary",
            "requested_intents": intents,
            "question": question,
            "message": "Complete database summary retrieved from the read-only database.",
            "data": data,
        }

    results = []

    for intent in intents:
        result = build_single_intent_result(intent)

        if result is not None:
            results.append({
                "intent": intent,
                "label": result["label"],
                "data": result["data"],
            })

    if not results:
        return {
            "success": False,
            "intent": "unknown",
            "question": question,
            "message": "No supported database information was requested.",
        }

    if len(results) == 1:
        return {
            "success": True,
            "intent": results[0]["intent"],
            "requested_intents": intents,
            "question": question,
            "message": f"{results[0]['label']} information retrieved from the read-only database.",
            "data": results[0]["data"],
        }

    return {
        "success": True,
        "intent": "multi",
        "requested_intents": intents,
        "question": question,
        "message": (
            f"Retrieved {len(results)} requested information sections "
            "from the read-only database."
        ),
        "data": {
            "sections": results
        },
    }


class RequestHandler(BaseHTTPRequestHandler):

    def send_json(self, status_code, payload):
        body = json.dumps(
            payload,
            default=str,
            ensure_ascii=False
        ).encode("utf-8")

        self.send_response(status_code)

        self.send_header(
            "Content-Type",
            "application/json; charset=utf-8"
        )

        self.send_header(
            "Access-Control-Allow-Origin",
            "http://localhost:5173"
        )

        self.send_header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS"
        )

        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        )

        self.send_header(
            "Content-Length",
            str(len(body))
        )

        self.end_headers()

        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_json(
            200,
            {"success": True}
        )

    def do_GET(self):

        if self.path == "/api/health":
            try:
                connection = get_connection()
                connection.close()

                self.send_json(
                    200,
                    {
                        "success": True,
                        "database": "connected",
                        "mode": "read-only"
                    }
                )

            except Exception as error:
                self.send_json(
                    500,
                    {
                        "success": False,
                        "database": "connection_failed",
                        "error": str(error)
                    }
                )

            return


        if self.path.startswith("/api/dashboard/recent-activities"):
            try:
                from urllib.parse import parse_qs, urlparse

                query = parse_qs(urlparse(self.path).query)
                requested_limit = query.get("limit", ["20"])[0].lower()

                if requested_limit == "20":
                    limit = 20
                elif requested_limit == "50":
                    limit = 50
                elif requested_limit == "100":
                    limit = 100
                elif requested_limit == "all":
                    limit = 100
                else:
                    limit = 20

                connection = get_connection()
                cursor = connection.cursor(dictionary=True)

                cursor.execute(
                    f"""
                    SELECT
                        `id`,
                        `uid`,
                        `event_category`,
                        `message`,
                        `user_name`,
                        `created_at`
                    FROM `event_logs`
                    ORDER BY `created_at` DESC
                    LIMIT {limit}
                    """
                )

                rows = cursor.fetchall()

                cursor.close()
                connection.close()

                self.send_json(
                    200,
                    {
                        "success": True,
                        "mode": "read-only",
                        "count": len(rows),
                        "data": rows
                    }
                )

            except Exception as error:
                self.send_json(
                    500,
                    {
                        "success": False,
                        "error": str(error)
                    }
                )

            return

        if self.path == "/api/assistant/database-summary":
            try:
                data = database_summary()

                self.send_json(
                    200,
                    {
                        "success": True,
                        "mode": "read-only",
                        "data": data
                    }
                )

            except Exception as error:
                self.send_json(
                    500,
                    {
                        "success": False,
                        "error": str(error)
                    }
                )

            return

        self.send_json(
            404,
            {
                "success": False,
                "message": "Endpoint not found."
            }
        )

    def do_POST(self):

        if self.path != "/api/assistant":
            self.send_json(
                404,
                {
                    "success": False,
                    "message": "Endpoint not found."
                }
            )

            return

        try:
            content_length = int(
                self.headers.get("Content-Length", "0")
            )

            body = self.rfile.read(content_length)

            payload = json.loads(body.decode("utf-8"))

            question = str(
                payload.get("question", "")
            ).strip()

            if not question:
                self.send_json(
                    400,
                    {
                        "success": False,
                        "message": "Question is required."
                    }
                )

                return

            response = build_assistant_response(question)

            self.send_json(
                200,
                response
            )

        except Exception as error:
            self.send_json(
                500,
                {
                    "success": False,
                    "error": str(error)
                }
            )


def main():
    host = "127.0.0.1"
    port = 5000

    server = ThreadingHTTPServer(
        (host, port),
        RequestHandler
    )

    print()
    print("========================================")
    print("KRISHI HRUDAYA READ-ONLY BACKEND")
    print("========================================")
    print(f"Server: http://{host}:{port}")
    print("Database mode: READ ONLY")
    print()
    print("GET  /api/health")
    print("GET  /api/assistant/database-summary")
    print("POST /api/assistant")
    print()
    print("Press CTRL+C to stop.")
    print("========================================")

    server.serve_forever()


if __name__ == "__main__":
    main()
