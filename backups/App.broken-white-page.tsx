import { useState } from "react";
import {
  Activity,
  BarChart3,
  MapPin,
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
    title: "Power Notification ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Farm: Ward 26 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Rammurthy Nagara Motor",
    description:
      "Vivekananda Street 1st main Rammurthy nagara Power failed..! R: 279 volts Y: 222 volts B: 284 volts",
    uid: "865357060805437",
    time: "09:37 PM",
    icon: Zap,
    type: "danger"
  },
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
  ["Power failure detected", "Ward 26 ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ Rammurthy Nagara", "2 mins ago", Bell, "danger"],
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
          {sidebarOpen ? "PERMISSION" : "ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢"}
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
          <div className="page-top">
            <div>
              <div className="breadcrumb">
                Admin <ChevronRight size={14} /> {activeMenu}
              </div>
              <h1>{activeMenu}</h1>
            </div>

            <div className="date-chip">
              <CalendarDays size={17} />
              <div>
                <span>Sunday</span>
                <strong>13 Sep 2026</strong>
              </div>
            </div>
          </div>

          {activeMenu === "Dashboard" ? (
            <>
              <section className="hero">
                <div className="hero-content">
                  <span className="hero-eyebrow">
                    
                    Smart Farming Platform
                  </span>
                  <h2>Welcome back, Admin!</h2>
                  <p>
                    Monitor, manage and empower farms with smarter technology.
                  </p>
                  <div className="hero-tags">
                    <span> Healthy Farms</span>
                    <span><Activity size={15} /> Stronger Communities</span>
                    <span><Zap size={15} /> Sustainable Tomorrow</span>
                  </div>
                </div>
                <div className="hero-visual">
                  <div className="sun" />
                  <div className="mountain mountain-one" />
                  <div className="mountain mountain-two" />
                  <div className="field field-one" />
                  <div className="field field-two" />
                  <div className="farm-house">
                    <div className="roof" />
                    <div className="house" />
                  </div>
                  <div className="tree tree-one" />
                  <div className="tree tree-two" />
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

                <section className="panel statistics-panel premium-statistics">
                  <div className="panel-header premium-panel-header">
                    <div>
                      <span className="panel-kicker">ANALYTICS</span>
                      <h3>Product Statistics</h3>
                    </div>

                    <button className="period-button">
                      This Month <ChevronDown size={15} />
                    </button>
                  </div>

                  <div className="product-metrics premium-metrics">
                    <div className="product-metric assigned premium-metric">
                      <div className="product-metric-icon">
                        <Package size={17} />
                      </div>
                      <div>
                        <span>Assigned Products</span>
                        <strong>1,683</strong>
                      </div>
                    </div>

                    <div className="product-metric total premium-metric">
                      <div className="product-metric-icon">
                        <Package size={17} />
                      </div>
                      <div>
                        <span>Total Products</span>
                        <strong>3,687</strong>
                      </div>
                    </div>

                    <div className="product-metric passed premium-metric">
                      <div className="product-metric-icon">
                        <CheckCircle2 size={17} />
                      </div>
                      <div>
                        <span>Test Passed</span>
                        <strong>3,573</strong>
                      </div>
                    </div>

                    <div className="product-metric failed premium-metric">
                      <div className="product-metric-icon">
                        <XCircle size={17} />
                      </div>
                      <div>
                        <span>Test Failed</span>
                        <strong>6</strong>
                      </div>
                    </div>
                  </div>

                  <div className="premium-donut-stage">
                    <div className="premium-donut">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius="61%"
                            outerRadius="82%"
                            paddingAngle={2}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {chartData.map((_, index) => (
                              <Cell
                                key={index}
                                fill={chartColors[index]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="premium-donut-center">
                        <strong>3,687</strong>
                        <span>Total Products</span>
                      </div>
                    </div>

                    <div className="donut-callout passed">
                      <i />
                      <div>
                        <span>Test Passed</span>
                        <strong>3,573 <small>96.9%</small></strong>
                      </div>
                    </div>

                    <div className="donut-callout total">
                      <i />
                      <div>
                        <span>Total Products</span>
                        <strong>3,687 <small>100%</small></strong>
                      </div>
                    </div>

                    <div className="donut-callout assigned">
                      <i />
                      <div>
                        <span>Assigned Products</span>
                        <strong>1,683 <small>45.6%</small></strong>
                      </div>
                    </div>

                    <div className="donut-callout failed">
                      <i />
                      <div>
                        <span>Test Failed</span>
                        <strong>6 <small>0.2%</small></strong>
                      </div>
                    </div>
                  </div>

                  <div className="premium-legend clean-legend">

                    <div className="legend-item assigned">
                      <span className="legend-dot" />
                      <div className="legend-content">
                        <span className="legend-name">Assigned Products</span>
                        <strong>1,683</strong>
                        <small>45.6%</small>
                      </div>
                    </div>

                    <div className="legend-item failed">
                      <span className="legend-dot" />
                      <div className="legend-content">
                        <span className="legend-name">Test Failed</span>
                        <strong>6</strong>
                        <small>0.2%</small>
                      </div>
                    </div>

                    <div className="legend-item passed">
                      <span className="legend-dot" />
                      <div className="legend-content">
                        <span className="legend-name">Test Passed</span>
                        <strong>3,573</strong>
                        <small>96.9%</small>
                      </div>
                    </div>

                    <div className="legend-item total">
                      <span className="legend-dot" />
                      <div className="legend-content">
                        <span className="legend-name">Total Products</span>
                        <strong>3,687</strong>
                        <small>100%</small>
                      </div>
                    </div>

                  </div>
                  <div className="product-overview premium-overview">
                    <div className="overview-heading premium-overview-heading">
                      <div>
                        <span>PRODUCT OVERVIEW</span>
                        <strong>Testing & Assignment Status</strong>
                      </div>

                      <div className="overall-status">
                        <Activity size={14} />
                        <span>Overall Testing Progress</span>
                        <strong>96.9%</strong>
                      </div>
                    </div>

                    <div className="overview-item premium-overview-item">
                      <div>
                        <span>Assigned Products</span>
                        <strong>1,683</strong>
                      </div>
                      <div className="overview-bar warning">
                        <i style={{width:"45.6%"}} />
                      </div>
                      <small>45.6%</small>
                    </div>

                    <div className="overview-item premium-overview-item">
                      <div>
                        <span>Total Products</span>
                        <strong>3,687</strong>
                      </div>
                      <div className="overview-bar">
                        <i style={{width:"100%"}} />
                      </div>
                      <small>100%</small>
                    </div>

                    <div className="overview-item premium-overview-item">
                      <div>
                        <span>Test Passed</span>
                        <strong>3,573</strong>
                      </div>
                      <div className="overview-bar success">
                        <i style={{width:"96.9%"}} />
                      </div>
                      <small>96.9%</small>
                    </div>

                    <div className="overview-item premium-overview-item">
                      <div>
                        <span>Test Failed</span>
                        <strong>6</strong>
                      </div>
                      <div className="overview-bar danger">
                        <i style={{width:"8%"}} />
                      </div>
                      <small>0.2%</small>
                    </div>
                  </div>

                  <div className="product-insights premium-insights">
                    <div className="premium-insight category">
                      <div className="insight-visual">
                        <BarChart3 size={21} />
                      </div>
                      <div className="insight-copy">
                        <span>TOP CATEGORY</span>
                        <strong>Water Pumps</strong>
                        <small>1,245 products</small>
                      </div>
                      <ChevronRight size={17} className="insight-arrow" />
                    </div>

                    <div className="premium-insight location">
                      <div className="insight-visual">
                        <MapPin size={21} />
                      </div>
                      <div className="insight-copy">
                        <span>ACTIVE LOCATION</span>
                        <strong className="location-name">Rammurthy Nagar</strong>
                        <small>892 products</small>
                      </div>
                      <ChevronRight size={17} className="insight-arrow" />
                    </div>
                  </div>
                </section>
                <section className="panel activities-panel premium-activities">

  <div className="panel-header activities-header">
    <div>
      <span className="panel-kicker">LIVE MONITORING</span>
      <h3>Recent Activities</h3>
    </div>

    <button className="view-all-button">
      View All
    </button>
  </div>

  <div className="activity-list">

    <article className="activity-card power-event">

      <div className="activity-icon">
        <Activity size={20} />
      </div>

      <div className="activity-body">

        <div className="activity-title-row">
          <div className="activity-title-group">
            <strong>Power Notification</strong>
            <span className="event-status danger-status">POWER FAILED</span>
            <span className="activity-location">Farm: Ward 26</span>
            <span className="activity-device">Rammurthy Nagara Motor</span>
          </div>

          <ChevronRight size={18} className="activity-arrow" />
        </div>

        <p className="activity-description">
          Vivekananda Street 1st main Rammurthy nagara Power failed.
        </p>

        <div className="activity-readings">
          <span>R: <b>279 V</b></span>
          <span>Y: <b>222 V</b></span>
          <span>B: <b>284 V</b></span>
        </div>

        <div className="activity-meta">
          <span>UID: <b>865357060805437</b></span>
          <span>Sep 13, 2026</span>
          <strong>09:37 PM</strong>
        </div>

      </div>
    </article>


    <article className="activity-card manual-event">

      <div className="activity-icon">
        <Activity size={20} />
      </div>

      <div className="activity-body">

        <div className="activity-title-row">
          <div className="activity-title-group">
            <strong>Motor stopped in MANUAL mode</strong>
            <span className="event-status manual-status">MANUAL</span>
            <span className="activity-mode">STOP PB</span>
          </div>

          <ChevronRight size={18} className="activity-arrow" />
        </div>

        <div className="activity-readings">
          <span>R: <b>419 V</b></span>
          <span>Y: <b>338 V</b></span>
          <span>B: <b>313 V</b></span>
          <span>R: <b>0 A</b></span>
          <span>Y: <b>0 A</b></span>
          <span>B: <b>0 A</b></span>
        </div>

        <div className="activity-details">
          <span>Current Run Time: <strong>590 min</strong></span>
          <span>Total Run Time: <strong>590 min</strong></span>
          <span>Water Yield: <strong>103,250 L</strong></span>
        </div>

        <div className="activity-meta">
          <span>UID: <b>865357062788797</b></span>
          <span>Sep 13, 2026</span>
          <strong>09:36 PM</strong>
        </div>

      </div>
    </article>


    <article className="activity-card remote-event">

      <div className="activity-icon">
        <Activity size={20} />
      </div>

      <div className="activity-body">

        <div className="activity-title-row">
          <div className="activity-title-group">
            <strong>Motor stopped in REMOTE COMMAND mode</strong>
            <span className="event-status remote-status">REMOTE COMMAND</span>
          </div>

          <ChevronRight size={18} className="activity-arrow" />
        </div>

        <div className="activity-readings">
          <span>R: <b>397 V</b></span>
          <span>Y: <b>392 V</b></span>
          <span>B: <b>426 V</b></span>
          <span>R: <b>0 A</b></span>
          <span>Y: <b>0 A</b></span>
          <span>B: <b>0 A</b></span>
        </div>

        <div className="activity-details">
          <span>Current Run Time: <strong>29 min</strong></span>
          <span>Total Run Time: <strong>73 min</strong></span>
          <span>Water Yield: <strong>12,775 L</strong></span>
        </div>

        <div className="activity-meta">
          <span>UID: <b>8656310987417142</b></span>
          <span>Sep 13, 2026</span>
          <strong>09:31 PM</strong>
        </div>

      </div>
    </article>

  </div>


  <div className="activity-summary">

    <div className="summary-heading">
      <div>
        <span>ACTIVITY SUMMARY</span>
        <strong>Live Monitoring Snapshot</strong>
      </div>

      <div className="summary-live">
        <i></i>
        Live
      </div>
    </div>


    <div className="summary-grid">

      <div className="summary-card total-events">
        <div className="summary-icon">
          <Activity size={17} />
        </div>

        <div>
          <span>Total Events</span>
          <strong>3</strong>
          <small>Recent activities</small>
        </div>
      </div>


      <div className="summary-card power-events">
        <div className="summary-icon">
          <Zap size={17} />
        </div>

        <div>
          <span>Power Events</span>
          <strong>1</strong>
          <small>Power failure detected</small>
        </div>
      </div>


      <div className="summary-card motor-events">
        <div className="summary-icon">
          <Gauge size={17} />
        </div>

        <div>
          <span>Motor Stops</span>
          <strong>2</strong>
          <small>Manual + Remote</small>
        </div>
      </div>


      <div className="summary-card latest-event">
        <div className="summary-icon">
          <Clock3 size={17} />
        </div>

        <div>
          <span>Latest Event</span>
          <strong>09:37 PM</strong>
          <small>Sep 13, 2026</small>
        </div>
      </div>

    </div>


    <div className="monitoring-strip">

      <div className="monitoring-item">
        <span className="monitoring-dot danger"></span>
        <div>
          <small>Latest Alert</small>
          <strong>Power Failed</strong>
        </div>
      </div>

      <div className="monitoring-divider"></div>

      <div className="monitoring-item">
        <span className="monitoring-dot success"></span>
        <div>
          <small>Manual Stop</small>
          <strong>590 min Runtime</strong>
        </div>
      </div>

      <div className="monitoring-divider"></div>

      <div className="monitoring-item">
        <span className="monitoring-dot warning"></span>
        <div>
          <small>Remote Stop</small>
          <strong>29 min Runtime</strong>
        </div>
      </div>

    </div>

  </div>

</section>
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
                    <span>Water, energy and crops ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“ optimized.</span>
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
        >
          {assistantOpen ? <XCircle size={23} /> : <MessageSquare size={23} />}
          <span>
            {assistantOpen ? "Close Assistant" : "Ask Krishi Assistant"}
            {!assistantOpen && <small>How can I help you today?</small>}
          </span>
        </button>

        {assistantOpen && (
          <div className="assistant-panel">
            <div className="assistant-header">
              <div className="assistant-logo"><img src="/KH.png" alt="KH" style={{width:"30px",height:"30px",objectFit:"contain"}} /></div>
              <div>
                <strong>Krishi Assistant</strong>
                <span>Smart dashboard assistant</span>
              </div>
              <button onClick={() => setAssistantOpen(false)}>
                <XCircle size={19} />
              </button>
            </div>

            <div className="assistant-body">
              <p>What would you like to know?</p>
              <button>Show failed tests</button>
              <button>Show today's power failures</button>
              <button>How many active devices?</button>
              <button>Show recent motor events</button>
            </div>

            <div className="assistant-input">
              <input placeholder="Ask something..." />
              <button><Search size={18} /></button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;





















