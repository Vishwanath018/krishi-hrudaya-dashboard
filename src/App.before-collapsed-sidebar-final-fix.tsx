import { useEffect, useState } from "react";
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
  FileBarChart,
  Grid2X2,
  Leaf,
  LockKeyhole,
  LogOut,
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
  ResponsiveContainer,
  Tooltip
} from "recharts";

const stats = [
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

const notifications = [
  ["Power failure detected", "Ward 26 Å“ Rammurthy Nagara", "2 mins ago", Bell, "danger"],
  ["Test completed", "Farm ID: 1024", "12 mins ago", CheckCircle2, "success"],
  ["New device registered", "Device ID: KH-4582", "1 hour ago", Cpu, "blue"]
];

const menuItems = [
  ["Dashboard", Grid2X2],
  ["Categories", ClipboardList],
  ["Products", Package],
  ["Users", Users],
  ["Event Logs", Activity],
  ["Sim Database", ClipboardList],
  ["BWSSB", Droplets],
  ["Reports", FileBarChart]
];

const permissionItems = [
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

        <div className="sidebar-bottom-actions">
  <button
    className="sidebar-logout-button"
    title="Logout"
  >
    <LogOut size={20} />
    {sidebarOpen && <span>Logout</span>}
  </button>

  <button
          className="collapse-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          {sidebarOpen && "Collapse"}
        </button>
</div>
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
                      <div className="stat-icon">
                        <Icon size={24} />
                      </div>
                      <div className="stat-info">
                        <span>{title}</span>
                        <strong>{value}</strong>
                      </div>
                      <div className="stat-arrow">
                        <ChevronRight size={17} />
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

                            const radians = -midAngle * (Math.PI / 180);
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

                        <Tooltip />

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

                  <div className="product-overview">
                    <div className="overview-heading">
                      <span>PRODUCT OVERVIEW</span>
                      <strong>Testing & Assignment Status</strong>
                    </div>

                    <div className="overview-item">
                      <div>
                        <span>Assigned Products</span>
                        <strong>1,683</strong>
                      </div>

                      <div className="overview-bar warning">
                        <i style={{ width: "45.6%" }} />
                      </div>

                      <small>45.6%</small>
                    </div>

                    <div className="overview-item">
                      <div>
                        <span>Total Products</span>
                        <strong>3,687</strong>
                      </div>

                      <div className="overview-bar">
                        <i style={{ width: "100%" }} />
                      </div>

                      <small>100%</small>
                    </div>

                    <div className="overview-item">
                      <div>
                        <span>Test Passed</span>
                        <strong>3,573</strong>
                      </div>

                      <div className="overview-bar success">
                        <i style={{ width: "96.9%" }} />
                      </div>

                      <small>96.9%</small>
                    </div>

                    <div className="overview-item">
                      <div>
                        <span>Test Failed</span>
                        <strong>6</strong>
                      </div>

                      <div className="overview-bar danger">
                        <i style={{ width: "8%" }} />
                      </div>

                      <small>0.2%</small>
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
                    placeholder="Ask me anything..."
                  />
                  <button aria-label="Additional options">
                    <ClipboardList size={17} />
                  </button>
                </div>

                <button className="assistant-send" aria-label="Send">
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




















