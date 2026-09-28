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
  ResponsiveContainer,
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
                      <button className="active">Satellite</button>
                      <button>Street</button>
                      <button>Terrain</button>
                    </div>
                  </div>

                  <div className="division-map">
                    <div className="map-grid-lines" />

                    <div className="map-region region-one">
                      <span>Division: North</span>
                      <strong>Population: 123,843</strong>
                      <small>Officials: 5</small>
                    </div>

                    <div className="map-region region-two">
                      <span>Division: North</span>
                      <strong>Population: 2,496</strong>
                    </div>

                    <div className="map-heat heat-one">200</div>
                    <div className="map-heat heat-two">26</div>
                    <div className="map-heat heat-three">26</div>

                    <span className="map-marker m1" />
                    <span className="map-marker m2" />
                    <span className="map-marker m3" />
                    <span className="map-marker m4" />
                    <span className="map-marker m5" />
                    <span className="map-marker m6" />
                    <span className="map-marker m7" />
                    <span className="map-marker m8" />
                    <span className="map-marker m9" />
                    <span className="map-marker m10" />

                    <div className="map-legend">
                      <strong>Map Legend</strong>
                      <span><i className="legend-blue" /> DIVISIONS</span>
                      <span><i className="legend-cyan" /> SUB-DIVISIONS</span>
                      <span><i className="legend-purple" /> CONSTITUENCIES</span>
                      <span><i className="legend-orange" /> WARDS</span>
                      <em>???????? Administrative Boundary</em>
                      <em>???????? Boundary</em>
                    </div>

                    <div className="map-controls">
                      <button>+</button>
                      <button>?</button>
                    </div>
                  </div>
                </div>

                <div className="division-report-stats">
                  <div className="division-stat-card blue">
                    <div className="division-stat-icon">
                      <Grid2X2 size={34} />
                    </div>
                    <strong>2</strong>
                    <span>Divisions</span>
                  </div>

                  <div className="division-stat-card green">
                    <div className="division-stat-icon">
                      <Users size={34} />
                    </div>
                    <strong>6</strong>
                    <span>Sub Divisions</span>
                  </div>

                  <div className="division-stat-card orange">
                    <div className="division-stat-icon">
                      <ClipboardList size={34} />
                    </div>
                    <strong>34</strong>
                    <span>Total Constituencies</span>
                  </div>

                  <div className="division-stat-card purple">
                    <div className="division-stat-icon">
                      <Users size={34} />
                    </div>
                    <strong>213</strong>
                    <span>Total Wards</span>
                  </div>

                  <div className="division-stat-card cyan">
                    <div className="division-stat-icon">
                      <CircleUserRound size={34} />
                    </div>
                    <strong>26</strong>
                    <span>Total Officials</span>
                  </div>

                  <div className="division-stat-card red">
                    <div className="division-stat-icon">
                      <Users size={34} />
                    </div>
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
                      <span>Total Installations</span>
                      <strong>1,680</strong>
                    </div>
                  </div>

                  <div className="hierarchy-line" />

                  <div className="division-installations">
                    <div className="division-install-card division-one">
                      <div className="division-install-header">
                        <div className="division-install-icon">
                          <Grid2X2 size={28} />
                        </div>
                        <div>
                          <span>Division 1</span>
                          <strong>569</strong>
                          <small>Installations</small>
                        </div>
                      </div>

                      <div className="installation-status-box">
                        <h4>Installation Status</h4>

                        <div className="status-content">
                          <div className="status-donut">
                            <div className="donut-green" />
                            <div className="donut-label">
                              <strong>450</strong>
                              <span>79.1%</span>
                            </div>
                          </div>

                          <div className="status-legend">
                            <div>
                              <i className="active-dot" />
                              <span>
                                <strong>Active</strong>
                                450 (79.1%)
                              </span>
                            </div>
                            <div>
                              <i className="inactive-dot" />
                              <span>
                                <strong>Inactive</strong>
                                119 (20.9%)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="division-install-card division-two">
                      <div className="division-install-header">
                        <div className="division-install-icon">
                          <Grid2X2 size={28} />
                        </div>
                        <div>
                          <span>Division 2</span>
                          <strong>1,108</strong>
                          <small>Installations</small>
                        </div>
                      </div>

                      <div className="installation-status-box">
                        <h4>Installation Status</h4>

                        <div className="status-content">
                          <div className="status-donut second">
                            <div className="donut-green" />
                            <div className="donut-label">
                              <strong>791</strong>
                              <span>71.4%</span>
                            </div>
                          </div>

                          <div className="status-legend">
                            <div>
                              <i className="active-dot" />
                              <span>
                                <strong>Active</strong>
                                791 (71.4%)
                              </span>
                            </div>
                            <div>
                              <i className="inactive-dot" />
                              <span>
                                <strong>Inactive</strong>
                                317 (28.6%)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="water-yield-panel">
                  <div className="division-report-section-title">
                    <div>
                      <Activity size={28} />
                      <div>
                        <h2>Water Yield vs ON/OFF Cycle and Trips</h2>
                      </div>
                    </div>
                  </div>

                  <div className="water-chart">
                    <div className="water-axis-left">
                      <span>25,000</span>
                      <span>20,000</span>
                      <span>15,000</span>
                      <span>10,000</span>
                      <span>5,000</span>
                      <span>0</span>
                    </div>

                    <div className="water-plot">
                      <div className="water-grid-line line1" />
                      <div className="water-grid-line line2" />
                      <div className="water-grid-line line3" />
                      <div className="water-grid-line line4" />
                      <div className="water-grid-line line5" />

                      <div className="water-bars">
                        <div className="water-column">
                          <strong>540</strong>
                          <div className="water-bar" style={{ height: "8%" }} />
                          <span>ON Cycle</span>
                        </div>

                        <div className="water-column">
                          <strong>728</strong>
                          <div className="water-bar" style={{ height: "10%" }} />
                          <span>OFF Cycle</span>
                        </div>

                        <div className="water-column">
                          <strong>4,547</strong>
                          <div className="water-bar" style={{ height: "25%" }} />
                          <span>Overload Trip</span>
                        </div>

                        <div className="water-column">
                          <strong>22,007</strong>
                          <div className="water-bar tall" style={{ height: "82%" }} />
                          <span>Unload Trip</span>
                        </div>
                      </div>

                      <div className="cycle-line">
                        <span className="cycle-point point-one">70</span>
                        <span className="cycle-point point-two">166</span>
                        <span className="cycle-point point-three">340.78</span>
                        <span className="cycle-point point-four">220</span>
                      </div>
                    </div>

                    <div className="water-axis-right">
                      <span>250</span>
                      <span>200</span>
                      <span>150</span>
                      <span>100</span>
                      <span>50</span>
                      <span>0</span>
                    </div>
                  </div>

                  <div className="water-chart-legend">
                    <span><i className="water-blue-dot" /> Water Yield (L)</span>
                    <span><i className="cycle-green-dot" /> Cycles / Trips (Count)</span>
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
                    <strong>1,241 <small>(73.9%)</small></strong>
                  </div>
                </div>

                <div className="summary-divider" />

                <div className="summary-metric inactive">
                  <i />
                  <div>
                    <span>Total Inactive Installations</span>
                    <strong>436 <small>(26.1%)</small></strong>
                  </div>
                </div>

                <button className="download-report-button">
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






















