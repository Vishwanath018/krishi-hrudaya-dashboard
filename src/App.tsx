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
  FileBarChart,
  Grid2X2,
  Leaf,
  LockKeyhole,
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
  ["Power failure detected", "Ward 26 Å“ Rammurthy Nagara", "2 mins ago", Bell, "danger"],
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
  const [search, setSearch] = useState("");
  const [assistantInput, setAssistantInput] = useState("");
  const [assistantMessages, setAssistantMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);

  const assistantData = {
    users: 880,
    products: 3687,
    assignedProducts: 1683,
    activeDevices: 3578,
    farms: 256,
    borewells: 3578,
    installations: 3578,
    testPassed: 3573,
    testFailed: 6,
    permissions: 1621,
    enquiries: 5,
    divisions: 2,
    subDivisions: 6,
    constituencies: 34,
    wards: 213,
    officials: 26,
    division1Installations: 569,
    division1Active: 450,
    division1Inactive: 119,
    division2Installations: 1108,
    division2Active: 791,
    division2Inactive: 317,
    totalReportInstallations: 1680,
    activeReportInstallations: 1241,
    inactiveReportInstallations: 436
  };

  const normalizeAssistantQuestion = (question: string) =>
    question
      .toLowerCase()
      .replace(/[?,.!]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const getAssistantResponse = (question: string) => {
    const q = normalizeAssistantQuestion(question);
    const previousQuestion =
      assistantMessages.length > 0
        ? normalizeAssistantQuestion(
            [...assistantMessages]
              .reverse()
              .find((message) => message.role === "user")?.text || ""
          )
        : "";

    const totalWater =
      waterReportData.reduce((total, item) => total + item.water, 0);

    const totalCycles =
      waterReportData.reduce((total, item) => total + item.cycles, 0);

    const highestWaterCategory = waterReportData.reduce(
      (highest, item) => (item.water > highest.water ? item : highest),
      waterReportData[0]
    );

    const dashboardSummary =
      `Dashboard Summary\n\n` +
      `Users: ${assistantData.users.toLocaleString()}\n` +
      `Products: ${assistantData.products.toLocaleString()}\n` +
      `Assigned Products: ${assistantData.assignedProducts.toLocaleString()}\n` +
      `Active Devices: ${assistantData.activeDevices.toLocaleString()}\n` +
      `Farms: ${assistantData.farms.toLocaleString()}\n` +
      `Borewells: ${assistantData.borewells.toLocaleString()}\n` +
      `Installations: ${assistantData.installations.toLocaleString()}\n` +
      `Tests Passed: ${assistantData.testPassed.toLocaleString()}\n` +
      `Tests Failed: ${assistantData.testFailed.toLocaleString()}\n` +
      `User Permissions: ${assistantData.permissions.toLocaleString()}\n` +
      `Enquiries: ${assistantData.enquiries.toLocaleString()}`;

    if (!q) {
      return "Please ask me something about the Dashboard or Reports.";
    }

    if (
      q === "hi" ||
      q === "hello" ||
      q === "hey" ||
      q.includes("good morning") ||
      q.includes("good afternoon") ||
      q.includes("good evening")
    ) {
      return "Hello! I can answer questions using the Dashboard and Reports data currently displayed in Krishi Hrudaya.";
    }

    if (
      q.includes("complete dashboard") ||
      q.includes("dashboard summary") ||
      q.includes("full dashboard") ||
      q.includes("all dashboard") ||
      q === "dashboard"
    ) {
      return dashboardSummary;
    }

    if (
      q.includes("active device") ||
      q.includes("online device") ||
      q.includes("how many devices") ||
      q.includes("device count") ||
      q.includes("number of devices")
    ) {
      return `There are ${assistantData.activeDevices.toLocaleString()} active devices shown on the Dashboard.`;
    }

    if (
      q.includes("failed test") ||
      q.includes("test failed") ||
      q.includes("tests failed")
    ) {
      return `${assistantData.testFailed} tests are currently shown as failed. ${assistantData.testPassed.toLocaleString()} tests are shown as passed.`;
    }

    if (
      q.includes("passed test") ||
      q.includes("test passed") ||
      q.includes("tests passed") ||
      q.includes("pass rate")
    ) {
      return `${assistantData.testPassed.toLocaleString()} tests are shown as passed and ${assistantData.testFailed} as failed.`;
    }

    if (
      q.includes("assigned product") ||
      q.includes("assigned products")
    ) {
      return `The Dashboard shows ${assistantData.assignedProducts.toLocaleString()} assigned products out of ${assistantData.products.toLocaleString()} total products.`;
    }

    if (
      q.includes("product") ||
      q.includes("products")
    ) {
      return `The Dashboard shows ${assistantData.products.toLocaleString()} total products, including ${assistantData.assignedProducts.toLocaleString()} assigned products.`;
    }

    if (
      q.includes("user permission") ||
      q.includes("permissions")
    ) {
      return `There are ${assistantData.permissions.toLocaleString()} user permissions shown on the Dashboard.`;
    }

    if (
      q.includes("user") ||
      q.includes("users")
    ) {
      return `There are ${assistantData.users.toLocaleString()} users currently shown on the Dashboard.`;
    }

    if (
      q.includes("farm") ||
      q.includes("farms")
    ) {
      return `There are ${assistantData.farms.toLocaleString()} farms shown on the Dashboard.`;
    }

    if (
      q.includes("borewell") ||
      q.includes("bore wells")
    ) {
      return `The Dashboard currently shows ${assistantData.borewells.toLocaleString()} borewells.`;
    }

    if (
      q.includes("enquiry") ||
      q.includes("enquiries")
    ) {
      return `There are ${assistantData.enquiries.toLocaleString()} enquiries currently shown on the Dashboard.`;
    }

    if (
      q.includes("division 1") &&
      (q.includes("compare") || q.includes("versus") || q.includes("vs"))
    ) {
      return (
        `Division comparison\n\n` +
        `Division 1: ${assistantData.division1Installations} installations, ` +
        `${assistantData.division1Active} active, ${assistantData.division1Inactive} inactive.\n\n` +
        `Division 2: ${assistantData.division2Installations.toLocaleString()} installations, ` +
        `${assistantData.division2Active} active, ${assistantData.division2Inactive} inactive.`
      );
    }

    if (
      (q.includes("compare") || q.includes("comparison")) &&
      q.includes("division")
    ) {
      return (
        `Division comparison\n\n` +
        `Division 1: ${assistantData.division1Installations} installations, ` +
        `${assistantData.division1Active} active, ${assistantData.division1Inactive} inactive.\n\n` +
        `Division 2: ${assistantData.division2Installations.toLocaleString()} installations, ` +
        `${assistantData.division2Active} active, ${assistantData.division2Inactive} inactive.`
      );
    }

    if (
      q.includes("division 1") ||
      (q.includes("division one"))
    ) {
      return (
        `Division 1 has ${assistantData.division1Installations} installations: ` +
        `${assistantData.division1Active} active and ${assistantData.division1Inactive} inactive.`
      );
    }

    if (
      q.includes("division 2") ||
      q.includes("division two")
    ) {
      return (
        `Division 2 has ${assistantData.division2Installations.toLocaleString()} installations: ` +
        `${assistantData.division2Active} active and ${assistantData.division2Inactive} inactive.`
      );
    }

    if (
      (q === "and division 2" ||
        q === "what about division 2" ||
        q.includes("what about division 2")) &&
      previousQuestion.includes("division 1")
    ) {
      return (
        `Division 2 has ${assistantData.division2Installations.toLocaleString()} installations: ` +
        `${assistantData.division2Active} active and ${assistantData.division2Inactive} inactive.`
      );
    }

    if (
      (q === "and division 1" ||
        q === "what about division 1" ||
        q.includes("what about division 1")) &&
      previousQuestion.includes("division 2")
    ) {
      return (
        `Division 1 has ${assistantData.division1Installations} installations: ` +
        `${assistantData.division1Active} active and ${assistantData.division1Inactive} inactive.`
      );
    }

    if (
      q.includes("sub division") ||
      q.includes("subdivision") ||
      q.includes("constituenc") ||
      q.includes("ward") ||
      q.includes("official")
    ) {
      return (
        `The Reports page currently shows ${assistantData.divisions} divisions, ` +
        `${assistantData.subDivisions} sub-divisions, ` +
        `${assistantData.constituencies} constituencies, ` +
        `${assistantData.wards} wards, and ` +
        `${assistantData.officials} officials.`
      );
    }

    if (
      q.includes("installation") ||
      q.includes("installations")
    ) {
      return (
        `The Reports page contains ${assistantData.totalReportInstallations.toLocaleString()} installations. ` +
        `${assistantData.activeReportInstallations.toLocaleString()} are active and ` +
        `${assistantData.inactiveReportInstallations.toLocaleString()} are inactive.`
      );
    }

    if (
      q.includes("water total") ||
      q.includes("total water") ||
      q.includes("total water yield")
    ) {
      return (
        `The displayed water values total ${totalWater.toLocaleString()} units across ` +
        `${totalCycles.toLocaleString()} displayed cycles/trips.`
      );
    }

    if (
      q.includes("highest water") ||
      q.includes("most water") ||
      q.includes("maximum water")
    ) {
      return (
        `${highestWaterCategory.name} has the highest displayed water value at ` +
        `${highestWaterCategory.water.toLocaleString()}.`
      );
    }

    if (
      q.includes("water") ||
      q.includes("water yield")
    ) {
      return (
        `Water Yield values shown in Reports:\n\n` +
        `ON Cycle: ${waterReportData[0].water.toLocaleString()} with ${waterReportData[0].cycles} cycles\n` +
        `OFF Cycle: ${waterReportData[1].water.toLocaleString()} with ${waterReportData[1].cycles} cycles\n` +
        `Overload Trip: ${waterReportData[2].water.toLocaleString()} with ${waterReportData[2].cycles} cycles/trips\n` +
        `Unload Trip: ${waterReportData[3].water.toLocaleString()} with ${waterReportData[3].cycles} cycles/trips`
      );
    }

    if (q.includes("on cycle")) {
      return `ON Cycle shows ${waterReportData[0].water.toLocaleString()} water units and ${waterReportData[0].cycles} cycles.`;
    }

    if (q.includes("off cycle")) {
      return `OFF Cycle shows ${waterReportData[1].water.toLocaleString()} water units and ${waterReportData[1].cycles} cycles.`;
    }

    if (q.includes("overload")) {
      return `Overload Trip shows ${waterReportData[2].water.toLocaleString()} water units and ${waterReportData[2].cycles} cycles/trips.`;
    }

    if (q.includes("unload")) {
      return `Unload Trip shows ${waterReportData[3].water.toLocaleString()} water units and ${waterReportData[3].cycles} cycles/trips.`;
    }

    if (
      q.includes("latest motor") ||
      q.includes("latest event") ||
      q.includes("most recent event")
    ) {
      const latest = activities[0];

      return (
        `Latest displayed event:\n\n` +
        `${latest.title}\n` +
        `Time: ${latest.time}\n` +
        `UID: ${latest.uid}\n` +
        `Details: ${latest.description}`
      );
    }

    if (
      q.includes("recent motor") ||
      q.includes("motor event") ||
      q.includes("recent event") ||
      q.includes("activity") ||
      q.includes("activities")
    ) {
      return (
        `Recent displayed motor activities:\n\n` +
        `1. ${activities[0].title} at ${activities[0].time}. UID: ${activities[0].uid}.\n\n` +
        `2. ${activities[1].title} at ${activities[1].time}. UID: ${activities[1].uid}.`
      );
    }

    if (
      q.includes("voltage") ||
      q.includes("amps") ||
      q.includes("current") ||
      q.includes("run time") ||
      q.includes("uid")
    ) {
      return (
        `The two displayed activities contain voltage, current, run-time, water-yield, and UID information. ` +
        `Ask "latest motor event" to see the complete latest activity record.`
      );
    }

    if (
      q.includes("offline motor") ||
      q.includes("which motor is offline") ||
      q.includes("motor offline")
    ) {
      return (
        `Offline motor status is not available in the currently displayed Dashboard or Reports data. ` +
        `The available activity data only shows two recent motor stop events.`
      );
    }

    if (
      q.includes("power failure") ||
      q.includes("power failures")
    ) {
      return (
        `The current Dashboard version does not display power-failure history in its visible activity data, ` +
        `so I cannot provide a verified power-failure count from the current frontend data.`
      );
    }

    if (
      q.includes("alert") ||
      q.includes("alerts")
    ) {
      return (
        `A complete alert dataset is not available in the currently displayed Dashboard and Reports data, ` +
        `so I cannot provide a verified list of all alerts.`
      );
    }

    if (
      q.includes("last month") ||
      q.includes("previous month") ||
      q.includes("compare this month")
    ) {
      return (
        `A previous-month dataset is not available in the current frontend data, ` +
        `so I cannot make a verified month-to-month comparison.`
      );
    }

    if (
      q.includes("report") &&
      (q.includes("summary") || q.includes("overview"))
    ) {
      return (
        `Reports Summary\n\n` +
        `Divisions: ${assistantData.divisions}\n` +
        `Sub-divisions: ${assistantData.subDivisions}\n` +
        `Constituencies: ${assistantData.constituencies}\n` +
        `Wards: ${assistantData.wards}\n` +
        `Officials: ${assistantData.officials}\n` +
        `Installations: ${assistantData.totalReportInstallations.toLocaleString()}\n` +
        `Active Installations: ${assistantData.activeReportInstallations.toLocaleString()}\n` +
        `Inactive Installations: ${assistantData.inactiveReportInstallations.toLocaleString()}`
      );
    }

    if (
      q.includes("dashboard") ||
      q.includes("statistics") ||
      q.includes("stats")
    ) {
      return dashboardSummary;
    }

    return (
      `I can answer questions using the data currently available in the Dashboard and Reports.\n\n` +
      `Try asking about active devices, users, products, failed tests, farms, ` +
      `installations, divisions, water yield, or recent motor activity.`
    );
  };

  const askAssistant = (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    const answer = getAssistantResponse(trimmedQuestion);

    setAssistantMessages((messages) => [
      ...messages,
      { role: "user", text: trimmedQuestion },
      { role: "assistant", text: answer }
    ]);

    setAssistantInput("");
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
        <div className="menu-label">{sidebarOpen ? "MENU" : "•"}</div>

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
          {sidebarOpen ? "PERMISSION" : "•"}
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
                        <div className="product-status-icon">✓</div>
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
                    <span>Water, energy and crops Å“ optimized.</span>
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
          <div className="assistant-panel">
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

              <button
                className="assistant-close"
                onClick={() => setAssistantOpen(false)}
                aria-label="Close assistant"
              >
                <XCircle size={21} />
              </button>
            </div>

            <div className="assistant-body">
              {assistantMessages.length > 0 && (
                <div className="assistant-messages">
                  {assistantMessages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`assistant-message ${message.role}`}
                    >
                      <span>{message.text}</span>
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
                    I’m your Krishi Assistant. I can help you analyze dashboard
                    data, check device status, view reports, and answer
                    questions about your farms.
                  </p>
                </div>
              </div>

              <div className="assistant-section-title">
                Here are some quick actions
              </div>

              <div className="assistant-actions">
                <button>
                  <span className="assistant-action-icon">
                    <FileBarChart size={19} />
                  </span>
                  <span>
                    <strong>Show failed tests</strong>
                    <small>View recent test failures</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button>
                  <span className="assistant-action-icon">
                    <Zap size={19} />
                  </span>
                  <span>
                    <strong>Today's power failures</strong>
                    <small>Check latest power issues</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button>
                  <span className="assistant-action-icon">
                    <Cpu size={19} />
                  </span>
                  <span>
                    <strong>Active devices</strong>
                    <small>How many devices are online?</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button>
                  <span className="assistant-action-icon">
                    <Activity size={19} />
                  </span>
                  <span>
                    <strong>Recent motor events</strong>
                    <small>View motor activity logs</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button>
                  <span className="assistant-action-icon">
                    <Leaf size={19} />
                  </span>
                  <span>
                    <strong>Farm statistics</strong>
                    <small>Get overall farm insights</small>
                  </span>
                  <ChevronRight size={16} />
                </button>

                <button>
                  <span className="assistant-action-icon">
                    <FileBarChart size={19} />
                  </span>
                  <span>
                    <strong>Generate report</strong>
                    <small>Create a custom report</small>
                  </span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="assistant-or">
                <span />
                <strong>OR ASK ANYTHING</strong>
                <span />
              </div>

              <div className="assistant-prompts">
                <button>“Show water yield for this month”</button>
                <button>“Which motor is offline?”</button>
                <button>“Compare this month with last month”</button>
                <button>“Show all alerts”</button>
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

              <div className="assistant-hint">
                <span>💡</span>
                <p>
                  Try asking about devices, motors, water yield, alerts, or
                  reports.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;






















