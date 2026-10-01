import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import {
  Activity,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  ClipboardList,
  Cpu,
  Droplets,
  Download,
  Database,
  FileBarChart,
  Grid2X2,
  Leaf,
  LockKeyhole,
  Maximize2,
  Minimize2,
  Menu,
  MessageSquare,
  Moon,
  Package,
  Search,
  Settings2,
  Shield,
  ShieldCheck,
  Sun,
  UserCog,
  Users,
  Wrench,
  XCircle,
  Zap
} from "lucide-react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const stats: [string, string, any, string][] = [
  ["Total Users", "880", Users, "blue"],
  ["Total Products", "3,687", Package, "yellow"],
  ["Active Devices", "3,578", Cpu, "purple"],
  ["Total Farms", "256", Leaf, "green"],
  ["Total Borewells", "3,578", Droplets, "red"],
  ["Total Installations", "3,578", Wrench, "indigo"],
  ["Test Passed", "3,573", CheckCircle2, "success"],
  ["Test Failed", "6", XCircle, "danger"],
  ["User Permissions", "1,621", Shield, "amber"],
  ["Enquiries", "5", MessageSquare, "sky"]
];

const chartData = [
  { name: "Total Products", value: 3687 },
  { name: "Test Passed", value: 3573 },
  { name: "Test Failed", value: 6 },
  { name: "Assigned Products", value: 1683 }
];

const activities = [

  {
    title: "Motor stopped in MANUAL mode (Stop PB)..!",
    description:
      "R: 419 volts Y: 338 volts B: 313 volts R: 0 amps Y: 0 amps B: 0 amps Current Run Time: 590 minutes Total Run Time: 590 minutes Water Yield: 103250 liters",
    uid: "865357062788797",
    time: "09:36 PM",
    icon: Settings2,
    type: "success"
  },
  {
    title: "Motor stopped in REMOTE COMMAND mode..!",
    description:
      "R: 397 volts Y: 392 volts B: 426 volts R: 0 amps Y: 0 amps B: 0 amps Current Run Time: 29 minutes Total Run Time: 73 minutes Water Yield: 12775 liters",
    uid: "8656310987417142",
    time: "09:31 PM",
    icon: Activity,
    type: "warning"
  }
];

const notifications: [string, string, string, any, string][] = [
  ["Power failure detected", "Ward 26 Ãƒâ€¦Ã¢â‚¬Å“ Rammurthy Nagara", "2 mins ago", Bell, "danger"],
  ["Test completed", "Farm ID: 1024", "12 mins ago", CheckCircle2, "success"],
  ["New device registered", "Device ID: KH-4582", "1 hour ago", Cpu, "blue"]
];

const menuItems: [string, any][] = [
  ["Dashboard", Grid2X2],
  ["Categories", ClipboardList],
  ["Products", Package],
  ["Users", Users],
  ["Event Logs", Activity],
  ["Sim Database", ClipboardList],
  ["BWSSB", Droplets],
  ["Reports", FileBarChart]
];

const permissionItems: [string, any][] = [
  ["Manage Users", UserCog],
  ["Manage Role", ShieldCheck],
  ["Manage Permission", LockKeyhole]
];

const chartColors = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"];

function App() {
  const [heroSlide, setHeroSlide] = useState(0);

useEffect(() => {
  const interval = window.setInterval(() => {
    setHeroSlide((current) => (current + 1) % 3);
  }, 2500);

  return () => window.clearInterval(interval);
}, []);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantMaximized, setAssistantMaximized] = useState(false);
  const [search, setSearch] = useState("");
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);

  const askAssistant = async (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) return;

    setAssistantMessages((messages) => [
      ...messages,
      { role: "user", text: trimmedQuestion },
    ]);

    setAssistantInput("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: trimmedQuestion,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
          result.message ||
          "Assistant backend request failed"
        );
      }

      const formatDatabaseSummary = (
        data: Record<string, unknown>
      ): string => {
        const rows = [
          ["Users", data.users],
          ["Active Users", data.active_users],
          ["Products", data.products],
          ["Farms", data.farms],
          ["Installations", data.installations],
          ["Borewells", data.borewells],
          ["Starter Devices", data.starter_devices],
          ["Statistics Records", data.statistics_records],
          ["Event Logs", data.event_logs],
          ["User Permissions", data.user_permissions],
          ["Enquiries", data.enquiries],
          ["BWSSB Records", data.bwssb_records],
        ];

        const table = rows
          .map(
            ([label, value]) =>
              `| ${label} | ${Number(value ?? 0).toLocaleString("en-IN")} |`
          )
          .join("\n");

        const users = Number(data.users ?? 0).toLocaleString("en-IN");
        const farms = Number(data.farms ?? 0).toLocaleString("en-IN");
        const installations = Number(
          data.installations ?? 0
        ).toLocaleString("en-IN");
        const products = Number(data.products ?? 0).toLocaleString("en-IN");
        const borewells = Number(
          data.borewells ?? 0
        ).toLocaleString("en-IN");
        const eventLogs = Number(
          data.event_logs ?? 0
        ).toLocaleString("en-IN");

        return [
          "## Database Summary",
          "",
          "The following information was retrieved from the live Krishi Hrudaya database using read-only access.",
          "",
          "| Category | Current Count |",
          "|---|---:|",
          table,
          "",
          "### Summary",
          "",
          `The database currently contains **${users} users** across **${farms} farms** and **${installations} installations**. It contains **${products} products** and **${borewells} borewells**. The event log currently contains **${eventLogs} records**.`,
        ].join("\n");
      };

      const formatRecordsAsTable = (
        records: unknown[]
      ): string => {
        if (records.length === 0) {
          return "No records were found.";
        }

        const limitedRecords = records.slice(0, 20);

        const objectRecords = limitedRecords.filter(
          (record): record is Record<string, unknown> =>
            typeof record === "object" &&
            record !== null &&
            !Array.isArray(record)
        );

        if (objectRecords.length === 0) {
          return limitedRecords
            .map((record, index) => `${index + 1}. ${String(record)}`)
            .join("\n");
        }

        const preferredColumns = [
          "uid",
          "farm_id",
          "pump_name",
          "motor_state",
          "device_state",
          "power_available",
          "signal_strength",
          "actual_water_level",
          "status",
          "created_at",
          "updated_at",
        ];

        const columns = preferredColumns.filter((column) =>
          objectRecords.some((record) => column in record)
        );

        const fallbackColumns =
          columns.length > 0
            ? columns
            : Object.keys(objectRecords[0]).slice(0, 8);

        const header = `| ${fallbackColumns
          .map((column) =>
            column
              .replaceAll("_", " ")
              .replace(/\b\w/g, (letter) => letter.toUpperCase())
          )
          .join(" | ")} |`;

        const separator = `| ${fallbackColumns
          .map(() => "---")
          .join(" | ")} |`;

        const body = objectRecords
          .map(
            (record) =>
              `| ${fallbackColumns
                .map((column) => {
                  const value = record[column];

                  if (value === null || value === undefined) {
                    return "N/A";
                  }

                  return String(value)
                    .replaceAll("|", "\\|")
                    .replaceAll("\n", " ");
                })
                .join(" | ")} |`
          )
          .join("\n");

        const showingText =
          records.length > 20
            ? `Showing the first **20 records** out of **${records.length} retrieved records**.`
            : `Showing **${records.length} records** retrieved from the read-only database.`;

        return [
          showingText,
          "",
          header,
          separator,
          body,
        ].join("\n");
      };

      const formatBackendResponse = (
        intent: string,
        data: unknown
      ): string => {
        if (
          intent === "database_summary" &&
          typeof data === "object" &&
          data !== null &&
          !Array.isArray(data)
        ) {
          return formatDatabaseSummary(
            data as Record<string, unknown>
          );
        }

        if (Array.isArray(data)) {
          return [
            "## Database Records",
            "",
            "The following records were retrieved from the live read-only database.",
            "",
            formatRecordsAsTable(data),
          ].join("\n");
        }

        if (
          typeof data === "object" &&
          data !== null
        ) {
          const objectData = data as Record<string, unknown>;

          const formatCell = (value: unknown): string => {
            if (value === null || value === undefined) {
              return "N/A";
            }

            if (
              typeof value === "object"
            ) {
              return JSON.stringify(value);
            }

            return String(value);
          };

          const formatObjectTable = (
            value: Record<string, unknown>
          ): string => {
            const rows = Object.entries(value)
              .filter(([, item]) => !Array.isArray(item))
              .map(
                ([key, item]) =>
                  `| ${key
                    .replaceAll("_", " ")
                    .replace(/\b\w/g, (letter) => letter.toUpperCase())} | ${formatCell(item)} |`
              );

            return [
              "| Field | Value |",
              "|---|---:|",
              ...rows,
            ].join("\n");
          };

          const formatArrayTable = (
            items: unknown[]
          ): string => {
            if (items.length === 0) {
              return "No records found.";
            }

            const objects = items.filter(
              (item): item is Record<string, unknown> =>
                typeof item === "object" &&
                item !== null &&
                !Array.isArray(item)
            );

            if (objects.length === 0) {
              return [
                "| Value |",
                "|---|",
                ...items.map((item) => `| ${formatCell(item)} |`),
              ].join("\n");
            }

            const columns = Array.from(
              new Set(
                objects.flatMap((item) => Object.keys(item))
              )
            );

            const header = `| ${columns
              .map((column) =>
                column
                  .replaceAll("_", " ")
                  .replace(/\b\w/g, (letter) =>
                    letter.toUpperCase()
                  )
              )
              .join(" | ")} |`;

            const separator = `| ${columns
              .map(() => "---")
              .join(" | ")} |`;

            const rows = objects.map(
              (item) =>
                `| ${columns
                  .map((column) => formatCell(item[column]))
                  .join(" | ")} |`
            );

            return [
              header,
              separator,
              ...rows,
            ].join("\n");
          };

          // Handle multi-intent responses.
          if (Array.isArray(objectData.sections)) {
            const sections = objectData.sections
              .map((section) => {
                if (
                  typeof section !== "object" ||
                  section === null ||
                  Array.isArray(section)
                ) {
                  return "";
                }

                const sectionObject =
                  section as Record<string, unknown>;

                const label =
                  String(
                    sectionObject.label ??
                    sectionObject.intent ??
                    "Database Information"
                  );

                const sectionData =
                  sectionObject.data;

                if (
                  Array.isArray(sectionData)
                ) {
                  return [
                    `### ${label}`,
                    "",
                    formatArrayTable(sectionData),
                  ].join("\n");
                }

                if (
                  typeof sectionData === "object" &&
                  sectionData !== null
                ) {
                  const dataObject =
                    sectionData as Record<string, unknown>;

                  const scalarData: Record<string, unknown> = {};
                  const nestedParts: string[] = [];

                  Object.entries(dataObject).forEach(
                    ([key, value]) => {
                      if (Array.isArray(value)) {
                        const title = key
                          .replaceAll("_", " ")
                          .replace(
                            /\b\w/g,
                            (letter) =>
                              letter.toUpperCase()
                          );

                        nestedParts.push(
                          [
                            `### ${title}`,
                            "",
                            formatArrayTable(value),
                          ].join("\n")
                        );
                      } else {
                        scalarData[key] = value;
                      }
                    }
                  );

                  const parts: string[] = [];

                  if (
                    Object.keys(scalarData).length > 0
                  ) {
                    parts.push(
                      formatObjectTable(scalarData)
                    );
                  }

                  parts.push(...nestedParts);

                  return [
                    `### ${label}`,
                    "",
                    parts.join("\n\n"),
                  ].join("\n");
                }

                return [
                  `### ${label}`,
                  "",
                  "| Field | Value |",
                  "|---|---:|",
                  `| Value | ${formatCell(sectionData)} |`,
                ].join("\n");
              })
              .filter(Boolean);

            return [
              "## Database Information",
              "",
              `Retrieved ${sections.length} requested information sections from the read-only database.`,
              "",
              ...sections,
            ].join("\n");
          }

          // Handle normal object responses.
          const scalarData: Record<string, unknown> = {};
          const nestedParts: string[] = [];

          Object.entries(objectData).forEach(
            ([key, value]) => {
              if (Array.isArray(value)) {
                const title = key
                  .replaceAll("_", " ")
                  .replace(
                    /\b\w/g,
                    (letter) => letter.toUpperCase()
                  );

                nestedParts.push(
                  [
                    `### ${title}`,
                    "",
                    formatArrayTable(value),
                  ].join("\n")
                );
              } else {
                scalarData[key] = value;
              }
            }
          );

          const parts: string[] = [];

          if (
            Object.keys(scalarData).length > 0
          ) {
            parts.push(
              formatObjectTable(scalarData)
            );
          }

          parts.push(...nestedParts);

          return [
            "## Database Information",
            "",
            "The requested information was retrieved from the live read-only database.",
            "",
            parts.join("\n\n"),
          ].join("\n");
        }

        return String(data ?? "No data available.");
      };

      const dataText =
        result.data !== undefined
          ? `\n\n${formatBackendResponse(
              result.intent,
              result.data
            )}`
          : "";

      const answer =
        `${result.message || "Database information retrieved."}` +
        dataText;

      setAssistantMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          text: answer,
        },
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown backend error";

      setAssistantMessages((messages) => [
        ...messages,
        {
          role: "assistant",
          text:
            `I couldn't retrieve live database information right now.\n\n` +
            message,
        },
      ]);
    }
  };


  const renderAssistantMessage = (text: string) => {
    const normalized = text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\\n/g, "\n");

    const lines = normalized.split("\n");
    const elements: React.ReactNode[] = [];

    let index = 0;

    while (index < lines.length) {
      const line = lines[index].trim();

      if (!line) {
        index++;
        continue;
      }

      // Database Summary heading
      if (line.includes("## Database Summary")) {
        elements.push(
          <div className="assistant-response-title" key={`title-${index}`}>
            <div className="assistant-response-title-icon">
              <Database size={17} />
            </div>

            <div>
              <strong>Database Summary</strong>
              <span>Live database summary retrieved using read-only access</span>
            </div>
          </div>
        );

        index++;
        continue;
      }

      // Summary heading
      if (line.includes("### Summary")) {
        const summaryText = line
          .replace(/^#+\s*Summary\s*/i, "")
          .trim();

        elements.push(
          <div className="assistant-summary-card" key={`summary-${index}`}>
            <div className="assistant-summary-icon">
              <Activity size={17} />
            </div>

            <div className="assistant-summary-content">
              <strong>Summary</strong>

              <p>
                {summaryText
                  .replace(/\*\*/g, "")
                  .replace(/\s+/g, " ")
                  .trim()}
              </p>
            </div>
          </div>
        );

        index++;
        continue;
      }

      // Section heading such as Farms, Products, Installations, etc.
      if (line.startsWith("### ")) {
        const heading = line
          .replace(/^###\s*/, "")
          .replace(/\*\*/g, "")
          .trim();

        if (heading && heading.toLowerCase() !== "summary") {
          elements.push(
            <div
              className="assistant-section-heading"
              key={`section-heading-${index}`}
            >
              <strong>{heading}</strong>
            </div>
          );

          index++;
          continue;
        }
      }

      // Markdown table
      if (
        line.startsWith("|") &&
        index + 1 < lines.length &&
        lines[index + 1].trim().startsWith("|")
      ) {
        const tableLines: string[] = [];

        while (
          index < lines.length &&
          lines[index].trim().startsWith("|")
        ) {
          tableLines.push(lines[index].trim());
          index++;
        }

        if (tableLines.length >= 2) {
          const parseRow = (row: string) =>
            row
              .split("|")
              .slice(1, -1)
              .map((cell) => cell.trim());

          const headers = parseRow(tableLines[0]);

          const dataLines = tableLines.slice(1).filter(
            (row) => !/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(row)
          );

          const rows = dataLines.map(parseRow);

          elements.push(
            <div className="assistant-table-card" key={`table-${index}`}>
              <div className="assistant-table-wrapper">
                <table className="assistant-data-table">
                  <thead>
                    <tr>
                      {headers.map((header, headerIndex) => (
                        <th key={headerIndex}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={
                              cellIndex === row.length - 1
                                ? "assistant-table-value"
                                : ""
                            }
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );

          continue;
        }
      }

      // Normal paragraph
      if (
        !line.startsWith("##") &&
        !line.startsWith("|")
      ) {
        const cleanText = line
          .replace(/\*\*/g, "")
          .replace(/\s+/g, " ")
          .trim();

        if (cleanText) {
          elements.push(
            <p
              className="assistant-response-paragraph"
              key={`paragraph-${index}`}
            >
              {cleanText}
            </p>
          );
        }
      }

      index++;
    }

    /*
     * The backend may sometimes return the complete Markdown response
     * without newline characters. In that case, parse the table directly
     * from the raw text as a fallback.
     */
    if (
      elements.length <= 1 &&
      normalized.includes("| Category | Current Count |")
    ) {
      const tableMatch = normalized.match(
        /(\|\s*Category\s*\|\s*Current Count\s*\|[\s\S]*?)(?=###\s*Summary|$)/i
      );

      if (tableMatch) {
        const tableText = tableMatch[1];
        const tableLines = tableText
          .split(/\s*(?=\|)/)
          .map((line) => line.trim())
          .filter((line) => line.startsWith("|"));

        if (tableLines.length >= 2) {
          const parseRow = (row: string) =>
            row
              .split("|")
              .slice(1, -1)
              .map((cell) => cell.trim());

          const headers = parseRow(tableLines[0]);

          const rows = tableLines
            .slice(1)
            .filter(
              (row) =>
                !/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(row)
            )
            .map(parseRow);

          return (
            <div className="assistant-rich-message">
              <div className="assistant-response-title">
                <div className="assistant-response-title-icon">
                  <Database size={17} />
                </div>

                <div>
                  <strong>Database Summary</strong>
                  <span>
                    Live database summary retrieved using read-only access
                  </span>
                </div>
              </div>

              <div className="assistant-table-card">
                <div className="assistant-table-wrapper">
                  <table className="assistant-data-table">
                    <thead>
                      <tr>
                        {headers.map((header, i) => (
                          <th key={i}>{header}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={
                                cellIndex === row.length - 1
                                  ? "assistant-table-value"
                                  : ""
                              }
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        }
      }
    }

    return (
      <div className="assistant-rich-message">
        {elements}
      </div>
    );
  };

  const runAssistantAction = (question: string) => {
    askAssistant(question);
  };

  const [reportDivision, setReportDivision] = useState("All Divisions");
  const [reportStatus, setReportStatus] = useState("All Status");
  const [reportPeriod, setReportPeriod] = useState("This Month");
  const [mapMode, setMapMode] = useState("Satellite");
  const [mapZoom, setMapZoom] = useState(1);

  const reportDivisions = [
    { name: "Division 1", total: 569, active: 450, inactive: 119 },
    { name: "Division 2", total: 1108, active: 791, inactive: 317 }
  ];

  const waterReportData = [
    { name: "ON Cycle", water: 540, cycles: 70 },
    { name: "OFF Cycle", water: 728, cycles: 166 },
    { name: "Overload Trip", water: 4547, cycles: 340.78 },
    { name: "Unload Trip", water: 22007, cycles: 220 }
  ];

  const selectedDivisions =
    reportDivision === "All Divisions"
      ? reportDivisions
      : reportDivisions.filter((item) => item.name === reportDivision);

  const filteredInstallations = selectedDivisions.reduce(
    (result, item) => {
      const active = reportStatus === "Inactive" ? 0 : item.active;
      const inactive = reportStatus === "Active" ? 0 : item.inactive;
      return {
        total: active + inactive,
        active: result.active + active,
        inactive: result.inactive + inactive
      };
    },
    { total: 0, active: 0, inactive: 0 }
  );

  const selectedDivisionNames = selectedDivisions.map((item) => item.name).join(", ");

  const downloadReport = () => {
    const doc = new jsPDF();
    const activePercentage = filteredInstallations.total
      ? ((filteredInstallations.active / filteredInstallations.total) * 100).toFixed(1)
      : "0.0";
    const inactivePercentage = filteredInstallations.total
      ? ((filteredInstallations.inactive / filteredInstallations.total) * 100).toFixed(1)
      : "0.0";

    doc.setFontSize(20);
    doc.text("Krishi Hrudaya", 20, 22);
    doc.setFontSize(14);
    doc.text("Division Report", 20, 32);

    doc.setFontSize(10);
    doc.text(`Period: ${reportPeriod}`, 20, 43);
    doc.text(`Division: ${selectedDivisionNames}`, 20, 50);
    doc.text(`Status Filter: ${reportStatus}`, 20, 57);

    doc.setFontSize(13);
    doc.text("Division Map & Administration", 20, 72);
    doc.setFontSize(10);
    doc.text("Divisions: 2", 25, 82);
    doc.text("Sub Divisions: 6", 25, 89);
    doc.text("Total Constituencies: 34", 25, 96);
    doc.text("Total Wards: 213", 25, 103);
    doc.text("Total Officials: 26", 25, 110);
    doc.text("Total Users: 880", 25, 117);

    doc.setFontSize(13);
    doc.text("Installation Hierarchy", 20, 132);
    doc.setFontSize(10);
    doc.text(`Total Installations: ${filteredInstallations.total.toLocaleString()}`, 25, 142);
    doc.text(`Active Installations: ${filteredInstallations.active.toLocaleString()} (${activePercentage}%)`, 25, 149);
    doc.text(`Inactive Installations: ${filteredInstallations.inactive.toLocaleString()} (${inactivePercentage}%)`, 25, 156);

    let y = 168;
    selectedDivisions.forEach((item) => {
      const active = reportStatus === "Inactive" ? 0 : item.active;
      const inactive = reportStatus === "Active" ? 0 : item.inactive;
      doc.text(`${item.name}: ${active + inactive} installations`, 25, y);
      y += 7;
      doc.text(`Active: ${active} | Inactive: ${inactive}`, 35, y);
      y += 9;
    });

    doc.setFontSize(13);
    doc.text("Water Yield vs ON/OFF Cycle and Trips", 20, y + 8);
    doc.setFontSize(10);
    y += 18;

    waterReportData.forEach((item) => {
      doc.text(`${item.name}: ${item.water.toLocaleString()} | ${item.cycles}`, 25, y);
      y += 8;
    });

    doc.text(`Total Active Installations: ${filteredInstallations.active.toLocaleString()}`, 20, y + 8);
    doc.text(`Total Inactive Installations: ${filteredInstallations.inactive.toLocaleString()}`, 20, y + 16);

    doc.save("krishi-hrudaya-division-report.pdf");
  };


  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="brand"><img src="/KH.png" alt="Krishi Hrudaya" /></div><div className="sidebar-divider" />
        <div className="menu-label">{sidebarOpen ? "MENU" : "Ã¢â‚¬Â¢"}</div>

        <nav className="sidebar-nav">
          {menuItems.map(([label, Icon]) => (
            <button
              key={label}
              className={`nav-item ${activeMenu === label ? "active" : ""}`}
              onClick={() => setActiveMenu(label)}
              title={label}
            >
              <Icon size={20} />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div className="menu-label permission-label">
          {sidebarOpen ? "PERMISSION" : "Ã¢â‚¬Â¢"}
        </div>

        <nav className="sidebar-nav">
          {permissionItems.map(([label, Icon]) => (
            <button
              key={label}
              className={`nav-item ${activeMenu === label ? "active" : ""}`}
              onClick={() => setActiveMenu(label)}
              title={label}
            >
              <Icon size={20} />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="sidebar-card">
            
            <div>
              <strong>Growing Smarter</strong>
              <span>Farms Together</span>
            </div>
          </div>
        )}

        <button
          className="collapse-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          {sidebarOpen && "Collapse"}
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <button
            className="mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={22} />
          </button>

          <div className="top-search">
            <Search size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search farms, products, users, events..."
            />
            <span className="shortcut">Ctrl K</span>
          </div>

          <div className="top-actions">
            <button
              className="icon-button"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="notification-wrapper">
              <button
                className="notification-button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell size={21} />
                <span className="notification-count">3</span>
              </button>

              {notificationsOpen && (
                <div className="notification-panel">
                  <div className="notification-header">
                    <div>
                      <strong>Notifications</strong>
                      <span>3 unread notifications</span>
                    </div>
                    <button>Mark all as read</button>
                  </div>

                  {notifications.map(([title, description, time, Icon, type]) => (
                    <div className="notification-item" key={title}>
                      <div className={`notification-icon ${type}`}>
                        <Icon size={18} />
                      </div>
                      <div className="notification-content">
                        <strong>{title}</strong>
                        <span>{description}</span>
                        <small>{time}</small>
                      </div>
                      <span className="unread-dot" />
                    </div>
                  ))}

                  <button className="view-notifications">
                    View all notifications
                    <ChevronRight size={17} />
                  </button>
                </div>
              )}
            </div>

            <button className="icon-button">
              <MessageSquare size={20} />
            </button>

            <button className="icon-button">
              <CalendarDays size={20} />
            </button>

            <div className="profile">
              <div className="profile-avatar">
                <CircleUserRound size={27} />
              </div>
              <div className="profile-info">
                <strong>SuperAdmin</strong>
                <span>admin</span>
              </div>
              <ChevronDown size={17} />
            </div>
          </div>
        </header>

        <div className="content">
          {activeMenu === "Dashboard" ? (
            <>
              <section className="hero hero-image-carousel">
  <div className="hero-page-heading">
    <div className="hero-breadcrumb">
      <span>Admin</span>
      <ChevronRight size={15} />
      <span>Dashboard</span>
    </div>
    <h1>Dashboard</h1>
  </div>

  <div className="hero-date">
    <CalendarDays size={19} />
    <div>
      <span>Sunday</span>
      <strong>13 Sep 2026</strong>
    </div>
  </div>

  <div className="hero-page-heading">
    <div className="hero-breadcrumb">
      <span>Admin</span>
      <ChevronRight size={15} />
      <span>Dashboard</span>
    </div>
    <h1>Dashboard</h1>
  </div>
  <div className="hero-carousel-images">
    {["/hk1.png", "/hk2.png", "/hk3.png"].map((image, index) => (
      <img
        key={image}
        src={image}
        alt=""
        className={`hero-carousel-image ${heroSlide === index ? "active" : ""}`}
      />
    ))}
  </div>

  <div className="hero-carousel-dots">
    {[0, 1, 2].map((index) => (
      <button
        key={index}
        type="button"
        className={`hero-carousel-dot ${heroSlide === index ? "active" : ""}`}
        onClick={() => setHeroSlide(index)}
        aria-label={`Show slide ${index + 1}`}
      />
    ))}
  </div>
</section>

<section className="dashboard-grid">
                <div className="stats-grid">
                  {stats.map(([title, value, Icon, type]) => (
                    <div className={`stat-card ${type}`} key={title}>
                      <div className="stat-card-top">
                        <div className="stat-card-heading">
                          <div className="stat-icon">
                            <Icon size={19} />
                          </div>
                          <span>{title}</span>
                        </div>
                        <div className="stat-arrow">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                      <div className="stat-card-main">
                        <strong>{value}</strong>
                      </div>
                      <div className="stat-card-support">
                        {title === "Total Products" && <><span>1,683 Assigned</span><span>45.6%</span></>}
                        {title === "Active Devices" && <><span>97.1% Operational</span><span>Operational</span></>}
                        {title === "Total Farms" && <><span>+18 This Month</span><span>Trend</span></>}
                        {title === "Total Borewells" && <><span>Connected / Active</span><span>Active</span></>}
                        {title === "Total Installations" && <><span>98.4% Completed</span><span>98.4%</span></>}
                        {title === "Test Passed" && <><span>97.2% Pass Rate</span><span>97.2%</span></>}
                        {title === "Test Failed" && <><span>Requires Attention</span><span>Warning</span></>}
                        {title === "Total Users" && <><span>+12.4% This Month</span><span>Growth</span></>}
                        {title === "User Permissions" && <><span>Active Permissions</span><span>Utilization</span></>}
                        {title === "Enquiries" && <><span>3 New Today</span><span>Activity</span></>}
                      </div>
                      <div className={`stat-card-visual ${title === "Total Users" || title === "Total Farms" ? "stat-trend" : title === "Total Borewells" ? "stat-status" : title === "User Permissions" ? "stat-permissions" : title === "Enquiries" ? "stat-activity" : title === "Test Failed" ? "stat-warning" : "stat-progress-wrap"}`}>
                        {title === "Total Users" && <><span /><span /><span /><span /><span /></>}
                        {title === "Total Farms" && <><span /><span /><span /><span /><span /></>}
                        {title === "Total Borewells" && <><span /><span /><span /><span /></>}
                        {title === "User Permissions" && <><span /><span /><span /><span /><span /></>}
                        {title === "Enquiries" && <><span /><span /><span /></>}
                        {title === "Test Failed" && <div className="stat-warning-line"><span /></div>}
                        {!["Total Users", "Total Farms", "Total Borewells", "User Permissions", "Enquiries", "Test Failed"].includes(title) && <div className="stat-progress"><span /></div>}
                      </div>
                    </div>
                  ))}
                </div>
                <section className="panel statistics-panel">
                  <div className="panel-header">
                    <div>
                      <span className="panel-kicker">ANALYTICS</span>
                      <h3>Product Statistics</h3>
                    </div>
                    <button className="period-button">
                      This Month <ChevronDown size={15} />
                    </button>
                  </div>

                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="45%"
                          innerRadius="58%"
                          outerRadius="78%"
                          paddingAngle={2}
                          dataKey="value"
                          strokeWidth={0}
                          labelLine={false}
                          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                            if (!percent || percent < 0.01) return null;

                            const radius =
                              innerRadius +
                              (outerRadius - innerRadius) *
                                (index === 1 ? 0.35 : 0.55);

                            const radians = -(midAngle ?? 0) * (Math.PI / 180);
                            const x = cx + radius * Math.cos(radians);
                            const y = cy + radius * Math.sin(radians);

                            return (
                              <text
                                x={x}
                                y={y}
                                fill="#ffffff"
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize={11}
                                fontWeight={800}
                                style={{
                                  textShadow: "0 1px 3px rgba(0,0,0,0.22)"
                                }}
                              >
                                {(percent * 100).toFixed(1)}%
                              </text>
                            );
                          }}
                        >
                          {chartData.map((_, index) => (
                            <Cell
                              key={index}
                              fill={chartColors[index]}
                            />
                          ))}
                        </Pie>
                        <Legend
                          verticalAlign="bottom"
                          height={35}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="chart-center">
                      <strong>3,687</strong>
                      <span>Total Products</span>
                    </div>
                  </div>

                  <div className="product-status">
                    <div className="product-status-header">
                      <div>
                        <span>PRODUCT OVERVIEW</span>
                        <strong>Testing & Assignment Status</strong>
                      </div>
                      <span className="product-status-live">LIVE</span>
                    </div>

                    <div className="product-status-grid">
                      <div className="product-status-item assigned">
                        <div className="product-status-icon">A</div>
                        <div>
                          <span>Assigned</span>
                          <strong>1,683</strong>
                        </div>
                        <small>45.6%</small>
                      </div>

                      <div className="product-status-item total">
                        <div className="product-status-icon">P</div>
                        <div>
                          <span>Total Products</span>
                          <strong>3,687</strong>
                        </div>
                        <small>100%</small>
                      </div>

                      <div className="product-status-item passed">
                        <div className="product-status-icon">Ã¢Å“â€œ</div>
                        <div>
                          <span>Test Passed</span>
                          <strong>3,573</strong>
                        </div>
                        <small>97.2%</small>
                      </div>

                      <div className="product-status-item failed">
                        <div className="product-status-icon">!</div>
                        <div>
                          <span>Test Failed</span>
                          <strong>6</strong>
                        </div>
                        <small>0.2%</small>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="panel activities-panel">
                  <div className="panel-header">
                    <div>
                      <span className="panel-kicker">LIVE MONITORING</span>
                      <h3>Recent Activities</h3>
                    </div>
                    <button className="view-all">View All</button>
                  </div>

                  <div className="activities-list">
                    {activities.map((activity) => {
                      const Icon = activity.icon;

                      const voltage = activity.description.match(
                        /R:\s*(\d+)\s*volts\s*Y:\s*(\d+)\s*volts\s*B:\s*(\d+)\s*volts/
                      );

                      const amps = activity.description.match(
                        /R:\s*(\d+)\s*amps\s*Y:\s*(\d+)\s*amps\s*B:\s*(\d+)\s*amps/
                      );

                      const currentRunTime = activity.description.match(
                        /Current Run Time:\s*([^;]+)/
                      )?.[1];

                      const totalRunTime = activity.description.match(
                        /Total Run Time:\s*([^;]+)/
                      )?.[1];

                      const waterYield = activity.description.match(
                        /Water Yield:\s*(.+)$/
                      )?.[1];

                      const descriptionText = activity.description
                        .replace(
                          /R:\s*\d+\s*volts\s*Y:\s*\d+\s*volts\s*B:\s*\d+\s*volts/,
                          ""
                        )
                        .replace(
                          /R:\s*\d+\s*amps\s*Y:\s*\d+\s*amps\s*B:\s*\d+\s*amps/,
                          ""
                        )
                        .replace(/Current Run Time:\s*[^;]+;?/g, "")
                        .replace(/Total Run Time:\s*[^;]+;?/g, "")
                        .replace(/Water Yield:\s*.+$/g, "")
                        .trim();

                      return (
                        <div className="activity-item" key={activity.uid}>
                          <div className={`activity-icon ${activity.type}`}>
                            <Icon size={18} />
                          </div>

                          <div className="activity-content">
                            <div className="activity-title-row">
                              <strong>{activity.title}</strong>
                              <ChevronRight size={15} />
                            </div>

                            {descriptionText && (
                              <p className="activity-description">
                                {descriptionText}
                              </p>
                            )}

                            {voltage && (
                              <div className="activity-data-row">
                                <span className="activity-data-box">
                                  <b>R:</b> {voltage[1]} volts
                                </span>
                                <span className="activity-data-box">
                                  <b>Y:</b> {voltage[2]} volts
                                </span>
                                <span className="activity-data-box">
                                  <b>B:</b> {voltage[3]} volts
                                </span>
                              </div>
                            )}

                            {amps && (
                              <div className="activity-data-row">
                                <span className="activity-data-box">
                                  <b>R:</b> {amps[1]} amps
                                </span>
                                <span className="activity-data-box">
                                  <b>Y:</b> {amps[2]} amps
                                </span>
                                <span className="activity-data-box">
                                  <b>B:</b> {amps[3]} amps
                                </span>
                              </div>
                            )}

                            {(currentRunTime || totalRunTime || waterYield) && (
                              <div className="activity-data-row activity-extra-row">
                                {currentRunTime && (
                                  <span className="activity-data-box">
                                    <b>Current Run Time:</b> {currentRunTime}
                                  </span>
                                )}

                                {totalRunTime && (
                                  <span className="activity-data-box">
                                    <b>Total Run Time:</b> {totalRunTime}
                                  </span>
                                )}

                                {waterYield && (
                                  <span className="activity-data-box">
                                    <b>Water Yield:</b> {waterYield}
                                  </span>
                                )}
                              </div>
                            )}

                            <div className="activity-meta">
                              <span className="activity-uid">
                                UID: {activity.uid}
                              </span>
                              <span className="activity-meta-divider" />
                              <span>Sep 13, 2026</span>
                              <span className="activity-meta-divider" />
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>                </section>
              </section>

              <section className="feature-row">
                <div className="feature-card">
                  <div className="feature-icon green"></div>
                  <div>
                    <strong>Empowering Farmers with Technology</strong>
                    <span>Sustainable today, stronger tomorrow.</span>
                  </div>
                  <button><ChevronRight size={18} /></button>
                </div>

                <div className="feature-card">
                  <div className="feature-icon blue"><Activity size={24} /></div>
                  <div>
                    <strong>Smart Monitoring</strong>
                    <span>Real-time insights for better decisions.</span>
                  </div>
                  <button><ChevronRight size={18} /></button>
                </div>

                <div className="feature-card">
                  <div className="feature-icon cyan"><Droplets size={24} /></div>
                  <div>
                    <strong>Efficient Resource Use</strong>
                    <span>Water, energy and crops Ãƒâ€¦Ã¢â‚¬Å“ optimized.</span>
                  </div>
                  <button><ChevronRight size={18} /></button>
                </div>
              </section>
            </>
          ) : activeMenu === "Reports" ? (
            <section className="division-report-page">
              <div className="report-filter-bar">
                <div className="report-filter-heading">
                  <div>
                    <span>REPORTS</span>
                    <h1>Division Report</h1>
                  </div>
                  <small>Device distribution, installations and water activity</small>
                </div>

                <div className="report-filters">
                  <label>
                    <span>Division</span>
                    <select value={reportDivision} onChange={(e) => setReportDivision(e.target.value)}>
                      <option>All Divisions</option>
                      {reportDivisions.map((item) => (
                        <option key={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Status</span>
                    <select value={reportStatus} onChange={(e) => setReportStatus(e.target.value)}>
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </label>

                  <label>
                    <span>Period</span>
                    <select value={reportPeriod} onChange={(e) => setReportPeriod(e.target.value)}>
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>All Time</option>
                    </select>
                  </label>

                  <button className="report-filter-download" onClick={downloadReport}>
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>

              <div className="division-report-top">
                <div className="division-map-panel">
                  <div className="division-map-header">
                    <div className="division-map-title">
                      <div className="division-map-pin">
                        <Droplets size={24} />
                      </div>
                      <div>
                        <h2>Division Map</h2>
                        <span>Device Distribution (North)</span>
                      </div>
                    </div>

                    <div className="map-mode-buttons">
                      {["Satellite", "Street", "Terrain"].map((mode) => (
                        <button
                          key={mode}
                          className={mapMode === mode ? "active" : ""}
                          onClick={() => setMapMode(mode)}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`division-map map-mode-${mapMode.toLowerCase()}`}>
                    <div
                      className="map-interactive-layer"
                      style={{ transform: `scale(${mapZoom})` }}
                    >
                      <div className="map-grid-lines" />

                      <div className="map-region region-one">
                        <span>Division 1</span>
                        <strong>569 Installations</strong>
                        <small>450 Active ? 119 Inactive</small>
                      </div>

                      <div className="map-region region-two">
                        <span>Division 2</span>
                        <strong>1,108 Installations</strong>
                        <small>791 Active ? 317 Inactive</small>
                      </div>

                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((marker) => (
                        <button
                          key={marker}
                          className={`map-marker m${marker}`}
                          onClick={() =>
                            setReportDivision(marker <= 5 ? "Division 1" : "Division 2")
                          }
                          title={marker <= 5 ? "Division 1" : "Division 2"}
                        />
                      ))}

                      <div className="map-heat heat-one">569</div>
                      <div className="map-heat heat-two">1,108</div>
                      <div className="map-heat heat-three">1,680</div>
                    </div>

                    <div className="map-legend">
                      <strong>Map Legend</strong>
                      <span><i className="legend-blue" /> DIVISIONS</span>
                      <span><i className="legend-cyan" /> SUB-DIVISIONS</span>
                      <span><i className="legend-purple" /> CONSTITUENCIES</span>
                      <span><i className="legend-orange" /> WARDS</span>
                    </div>

                    <div className="map-controls">
                      <button onClick={() => setMapZoom((value) => Math.min(1.5, value + 0.1))}>+</button>
                      <button onClick={() => setMapZoom((value) => Math.max(0.8, value - 0.1))}>?</button>
                      <button onClick={() => setMapZoom(1)}>Reset</button>
                    </div>

                    <div className="map-selection">
                      Showing: <strong>{reportDivision}</strong>
                    </div>
                  </div>
                </div>

                <div className="division-report-stats">
                  <div className="division-stat-card blue">
                    <div className="division-stat-icon"><Grid2X2 size={34} /></div>
                    <strong>2</strong>
                    <span>Divisions</span>
                  </div>

                  <div className="division-stat-card green">
                    <div className="division-stat-icon"><Users size={34} /></div>
                    <strong>6</strong>
                    <span>Sub Divisions</span>
                  </div>

                  <div className="division-stat-card orange">
                    <div className="division-stat-icon"><ClipboardList size={34} /></div>
                    <strong>34</strong>
                    <span>Total Constituencies</span>
                  </div>

                  <div className="division-stat-card purple">
                    <div className="division-stat-icon"><Users size={34} /></div>
                    <strong>213</strong>
                    <span>Total Wards</span>
                  </div>

                  <div className="division-stat-card cyan">
                    <div className="division-stat-icon"><CircleUserRound size={34} /></div>
                    <strong>26</strong>
                    <span>Total Officials</span>
                  </div>

                  <div className="division-stat-card red">
                    <div className="division-stat-icon"><Users size={34} /></div>
                    <strong>880</strong>
                    <span>Total Users</span>
                  </div>
                </div>
              </div>

              <div className="division-report-middle">
                <section className="installation-hierarchy-panel">
                  <div className="division-report-section-title">
                    <div>
                      <Settings2 size={27} />
                      <div>
                        <h2>Installation Hierarchy</h2>
                        <span>Total installations with division-wise and status-wise breakdown</span>
                      </div>
                    </div>
                  </div>

                  <div className="installation-total">
                    <div className="installation-total-icon">
                      <Settings2 size={25} />
                    </div>
                    <div>
                      <span>Filtered Installations</span>
                      <strong>{filteredInstallations.total.toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="hierarchy-line" />

                  <div className="division-installations">
                    {selectedDivisions.map((division) => {
                      const active = reportStatus === "Inactive" ? 0 : division.active;
                      const inactive = reportStatus === "Active" ? 0 : division.inactive;
                      const total = active + inactive;
                      const percentage = total ? (active / total) * 100 : 0;

                      return (
                        <div className="division-install-card" key={division.name}>
                          <div className="division-install-header">
                            <div className="division-install-icon">
                              <Grid2X2 size={28} />
                            </div>
                            <div>
                              <span>{division.name}</span>
                              <strong>{total.toLocaleString()}</strong>
                              <small>Installations</small>
                            </div>
                          </div>

                          <div className="installation-status-box">
                            <h4>Installation Status</h4>

                            <div className="status-content">
                              <div
                                className="status-donut"
                                style={{
                                  background: `conic-gradient(#10b981 ${percentage}%, #dbe4ef ${percentage}% 100%)`
                                }}
                              >
                                <div className="donut-label">
                                  <strong>{active.toLocaleString()}</strong>
                                  <span>{percentage.toFixed(1)}%</span>
                                </div>
                              </div>

                              <div className="status-legend">
                                <div>
                                  <i className="active-dot" />
                                  <span>
                                    <strong>Active</strong>
                                    {active.toLocaleString()} ({percentage.toFixed(1)}%)
                                  </span>
                                </div>
                                <div>
                                  <i className="inactive-dot" />
                                  <span>
                                    <strong>Inactive</strong>
                                    {inactive.toLocaleString()} ({total ? ((inactive / total) * 100).toFixed(1) : "0.0"}%)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="water-yield-panel">
                  <div className="division-report-section-title">
                    <div>
                      <Activity size={28} />
                      <div>
                        <h2>Water Yield vs ON/OFF Cycle and Trips</h2>
                        <span>{reportPeriod} ? {reportDivision}</span>
                      </div>
                    </div>
                  </div>

                  <div className="water-recharts">
                    <ResponsiveContainer width="100%" height={310}>
                      <ComposedChart data={waterReportData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="water" />
                        <YAxis yAxisId="cycles" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="water" dataKey="water" name="Water Yield (L)" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        <Line yAxisId="cycles" type="monotone" dataKey="cycles" name="Cycles / Trips" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              </div>

              <div className="installation-summary-panel">
                <div className="summary-title">
                  <Activity size={29} />
                  <strong>Installation Summary</strong>
                </div>

                <div className="summary-metric active">
                  <i />
                  <div>
                    <span>Total Active Installations</span>
                    <strong>
                      {filteredInstallations.active.toLocaleString()}
                      <small>
                        ({filteredInstallations.total
                          ? ((filteredInstallations.active / filteredInstallations.total) * 100).toFixed(1)
                          : "0.0"}%)
                      </small>
                    </strong>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-metric inactive">
                  <i />
                  <div>
                    <span>Total Inactive Installations</span>
                    <strong>
                      {filteredInstallations.inactive.toLocaleString()}
                      <small>
                        ({filteredInstallations.total
                          ? ((filteredInstallations.inactive / filteredInstallations.total) * 100).toFixed(1)
                          : "0.0"}%)
                      </small>
                    </strong>
                  </div>
                </div>

                <button className="download-report-button" onClick={downloadReport}>
                  <Download size={22} />
                  <span>Download Report</span>
                </button>
              </div>
            </section>
                    ) : (
            <div className="coming-page">
              <div className="coming-icon">
                <Settings2 size={38} />
              </div>
              <h2>{activeMenu}</h2>
              <p>
                This section is prepared for the next prototype phase.
              </p>
              <button onClick={() => setActiveMenu("Dashboard")}>
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
        <button
          className={`assistant-button ${assistantOpen ? "open" : ""}`}
          onClick={() => setAssistantOpen(!assistantOpen)}
          aria-label="Open Krishi Assistant"
        >
          <div className="assistant-button-logo">
            <img src="/KH.png" alt="Krishi Hrudaya" />
          </div>
          <span>
            {assistantOpen ? "Close Assistant" : "Ask Krishi Assistant"}
            {!assistantOpen && <small>How can I help you today?</small>}
          </span>
          {assistantOpen ? <XCircle size={20} /> : <MessageSquare size={20} />}
        </button>

        {assistantOpen && (
          <div className={`assistant-panel ${assistantMaximized ? "maximized" : ""}`}>
            <div className="assistant-header">
              <div className="assistant-brand">
                <div className="assistant-logo">
                  <img src="/KH.png" alt="Krishi Hrudaya" />
                </div>
                <div>
                  <strong>Krishi Assistant</strong>
                  <span>Your smart farming dashboard partner</span>
                </div>
              </div>

              <div className="assistant-header-actions">


                <button


                  className="assistant-maximize"


                  onClick={() => setAssistantMaximized(!assistantMaximized)}


                  aria-label={assistantMaximized ? "Restore assistant" : "Maximize assistant"}


                  title={assistantMaximized ? "Restore" : "Maximize"}


                >


                  {assistantMaximized ? <Minimize2 size={19} /> : <Maximize2 size={19} />}


                </button>


              


              <button
                className="assistant-close"
                onClick={() => setAssistantOpen(false)}
                aria-label="Close assistant"
              >
                <XCircle size={21} />
              </button>
            </div>
            </div>

            <div className="assistant-body">
              {assistantMessages.length > 0 && (
                <div className="assistant-messages">
                  {assistantMessages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`assistant-message ${message.role}`}
                    >
                      {message.role === "assistant" ? (
                        renderAssistantMessage(message.text)
                      ) : (
                        <span>{message.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="assistant-welcome">
                <div className="assistant-bot-icon">
                  <MessageSquare size={21} />
                  <i />
                </div>

                <div className="assistant-welcome-card">
                  <strong>Hello! 👋</strong>
                  <p>
                    I'm your Krishi Assistant. I can help you analyze dashboard
                    data, check device status, view reports, and answer
                    questions about your farms.
                  </p>
                </div>
              </div>

              <div className="assistant-section-title">
                Here are some quick actions
              </div>

              <div className="assistant-actions">
                <button onClick={() => runAssistantAction("Show failed tests")}><span className="assistant-action-icon">
                    <FileBarChart size={19} />
                  </span>
                  <span>
                    <strong>Show failed tests</strong>
                    <small>View recent test failures</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button onClick={() => runAssistantAction("Today's power failures")}><span className="assistant-action-icon">
                    <Zap size={19} />
                  </span>
                  <span>
                    <strong>Today's power failures</strong>
                    <small>Check latest power issues</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button onClick={() => runAssistantAction("Active devices")}><span className="assistant-action-icon">
                    <Cpu size={19} />
                  </span>
                  <span>
                    <strong>Active devices</strong>
                    <small>How many devices are online?</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button onClick={() => runAssistantAction("Recent motor events")}>
                  <span className="assistant-action-icon">
                    <Activity size={19} />
                  </span>
                  <span>
                    <strong>Recent motor events</strong>
                    <small>View motor activity logs</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button onClick={() => runAssistantAction("Farm statistics")}><span className="assistant-action-icon">
                    <Leaf size={19} />
                  </span>
                  <span>
                    <strong>Farm statistics</strong>
                    <small>Get overall farm insights</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button onClick={() => runAssistantAction("Give me the complete database")}>
                  <span className="assistant-action-icon">
                    <Database size={19} />
                  </span>
                  <span>
                    <strong>Complete Database Report</strong>
                    <small>View the complete live database summary</small>
                  </span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="assistant-or">
                <span />
                <strong>OR ASK ANYTHING</strong>
                <span />
              </div>

              <div className="assistant-input">
                <div className="assistant-input-field">
                  <Zap size={17} />
                  <input
                    type="text"
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        askAssistant(assistantInput);
                      }
                    }}
                    placeholder="Ask me anything..."
                  />
                  <button
                    aria-label="Additional options"
                    onClick={() => runAssistantAction("Show dashboard statistics")}
                  >
                    <ClipboardList size={17} />
                  </button>
                </div>

                <button
                  className="assistant-send"
                  aria-label="Send"
                  onClick={() => askAssistant(assistantInput)}
                >
                  <Search size={19} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;































