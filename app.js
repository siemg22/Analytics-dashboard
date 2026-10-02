const { useState, useEffect } = React;

const statCards = [
    {
        title: "Total Users",
        value: "12,540",
        change: "+12.5%",
        icon: "fa-users",
        positive: true
    },
    {
        title: "Revenue",
        value: "$8,420",
        change: "+8.2%",
        icon: "fa-dollar-sign",
        positive: true
    },
    {
        title: "Orders",
        value: "1,284",
        change: "+5.7%",
        icon: "fa-shopping-cart",
        positive: true
    },
    {
        title: "Conversion Rate",
        value: "7.8%",
        change: "-1.2%",
        icon: "fa-chart-line",
        positive: false
    }
];

const analyticsData = [
    { date: "Aug 1", users: 520, revenue: 410, orders: 85 },
    { date: "Aug 2", users: 610, revenue: 470, orders: 92 },
    { date: "Aug 3", users: 580, revenue: 450, orders: 88 },
    { date: "Aug 4", users: 720, revenue: 590, orders: 105 },
    { date: "Aug 5", users: 680, revenue: 540, orders: 99 },
    { date: "Aug 6", users: 790, revenue: 630, orders: 115 },
    { date: "Aug 7", users: 840, revenue: 690, orders: 122 },
    { date: "Aug 8", users: 760, revenue: 620, orders: 110 },
    { date: "Aug 9", users: 900, revenue: 730, orders: 130 },
    { date: "Aug 10", users: 960, revenue: 780, orders: 138 },
    { date: "Aug 11", users: 910, revenue: 750, orders: 133 },
    { date: "Aug 12", users: 1020, revenue: 820, orders: 145 },
    { date: "Aug 13", users: 1080, revenue: 870, orders: 152 },
    { date: "Aug 14", users: 1140, revenue: 920, orders: 160 }
];

const activities = [
    {
        id: 1,
        name: "John Doe",
        action: "Registered a new account",
        date: "Today, 10:42 AM",
        type: "User"
    },
    {
        id: 2,
        name: "Sarah Smith",
        action: "Placed order #1024",
        date: "Today, 09:18 AM",
        type: "Order"
    },
    {
        id: 3,
        name: "Michael Brown",
        action: "Completed payment of $250",
        date: "Yesterday, 05:31 PM",
        type: "Payment"
    }
];

const defaultNotifications = [
    {
        id: 1,
        title: "New user registered",
        message: "John Doe created a new account.",
        time: "10 minutes ago",
        icon: "fa-user-plus",
        read: false
    },
    {
        id: 2,
        title: "New order received",
        message: "Order #1024 has been placed.",
        time: "35 minutes ago",
        icon: "fa-shopping-cart",
        read: false
    },
    {
        id: 3,
        title: "Payment completed",
        message: "A payment of $250 was completed.",
        time: "1 hour ago",
        icon: "fa-credit-card",
        read: true
    }
];

function StatCard({ card }) {
    return (
        <div className="stat-card">
            <div className="stat-top">
                <div className="stat-icon">
                    <i className={`fas ${card.icon}`}></i>
                </div>

                <span className="stat-label">
                    {card.title}
                </span>
            </div>

            <div className="stat-value">
                {card.value}
            </div>

            <div className="stat-footer">
                <span
                    className={`stat-change ${
                        card.positive ? "positive" : "negative"
                    }`}
                >
                    <i
                        className={`fas ${
                            card.positive
                                ? "fa-arrow-up"
                                : "fa-arrow-down"
                        }`}
                    ></i>
                    {card.change}
                </span>

                <span>from last month</span>
            </div>
        </div>
    );
}

function AnalyticsChart() {
    const [metric, setMetric] = useState("users");
    const [period, setPeriod] = useState("14");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const data =
        period === "7"
            ? analyticsData.slice(-7)
            : analyticsData;

    const values = data.map(item => item[metric]);

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    const average =
        values.reduce((sum, value) => sum + value, 0) /
        values.length;

    const first = values[0];
    const last = values[values.length - 1];

    const width = 1000;
    const height = 320;
    const paddingX = 45;
    const paddingY = 35;

    const points = data.map((item, index) => {
        const x =
            paddingX +
            (index / Math.max(data.length - 1, 1)) *
                (width - paddingX * 2);

        const y =
            height -
            paddingY -
            (item[metric] / maxValue) *
                (height - paddingY * 2);

        return {
            x,
            y,
            value: item[metric],
            date: item.date
        };
    });

    const linePoints = points
        .map(point => `${point.x},${point.y}`)
        .join(" ");

    return (
        <div className="analytics-card">
            <div className="section-header">
                <div>
                    <h2>Analytics</h2>
                    <p>Performance overview</p>
                </div>

                <div className="chart-controls">
                    <select
                        className="chart-control"
                        value={metric}
                        onChange={event =>
                            setMetric(event.target.value)
                        }
                    >
                        <option value="users">Users</option>
                        <option value="revenue">Revenue</option>
                        <option value="orders">Orders</option>
                    </select>

                    <select
                        className="chart-control"
                        value={period}
                        onChange={event =>
                            setPeriod(event.target.value)
                        }
                    >
                        <option value="7">7 Days</option>
                        <option value="14">14 Days</option>
                    </select>
                </div>
            </div>

            <div className="chart-container">
                <div className="y-axis">
                    <span>{Math.round(maxValue)}</span>
                    <span>{Math.round(maxValue * 0.75)}</span>
                    <span>{Math.round(maxValue * 0.5)}</span>
                    <span>{Math.round(maxValue * 0.25)}</span>
                    <span>0</span>
                </div>

                <div className="real-chart">
                    <svg
                        className="chart-svg"
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio="none"
                    >
                        {[35, 97, 160, 222, 285].map(
                            (y, index) => (
                                <line
                                    key={index}
                                    className={
                                        index === 4
                                            ? "axis-line"
                                            : "grid-line"
                                    }
                                    x1="45"
                                    y1={y}
                                    x2="955"
                                    y2={y}
                                />
                            )
                        )}

                        {points.map((point, index) => {
                            const barWidth =
                                ((width - paddingX * 2) /
                                    data.length) *
                                0.5;

                            return (
                                <rect
                                    key={index}
                                    className="chart-bar-svg"
                                    x={point.x - barWidth / 2}
                                    y={point.y}
                                    width={barWidth}
                                    height={
                                        height -
                                        paddingY -
                                        point.y
                                    }
                                    rx="5"
                                />
                            );
                        })}

                        <polyline
                            className="chart-polyline"
                            points={linePoints}
                        />

                        {points.map((point, index) => (
                            <circle
                                key={index}
                                className="chart-circle"
                                cx={point.x}
                                cy={point.y}
                                r={
                                    hoveredIndex === index
                                        ? 7
                                        : 5
                                }
                                onMouseEnter={() =>
                                    setHoveredIndex(index)
                                }
                                onMouseLeave={() =>
                                    setHoveredIndex(null)
                                }
                            />
                        ))}
                    </svg>

                    {hoveredIndex !== null && (
                        <div
                            className="chart-tooltip-real"
                            style={{
                                left: `${
                                    (points[hoveredIndex].x /
                                        width) *
                                    100
                                }%`,
                                top: `${
                                    (points[hoveredIndex].y /
                                        height) *
                                    100
                                }%`
                            }}
                        >
                            <strong>
                                {points[hoveredIndex].date}
                            </strong>

                            <span>
                                {points[hoveredIndex].value}
                            </span>
                        </div>
                    )}

                    <div className="chart-dates">
                        {data.map((item, index) => (
                            <span
                                key={item.date}
                                style={{
                                    left: `${
                                        (index /
                                            Math.max(
                                                data.length - 1,
                                                1
                                            )) *
                                        100
                                    }%`
                                }}
                            >
                                {item.date}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="analytics-summary">
                <div className="summary-item">
                    <span className="summary-label">
                        Maximum
                    </span>
                    <strong className="summary-value">
                        {Math.round(maxValue)}
                    </strong>
                </div>

                <div className="summary-item">
                    <span className="summary-label">
                        Minimum
                    </span>
                    <strong className="summary-value">
                        {Math.round(minValue)}
                    </strong>
                </div>

                <div className="summary-item">
                    <span className="summary-label">
                        Average
                    </span>
                    <strong className="summary-value">
                        {Math.round(average)}
                    </strong>
                </div>

                <div className="summary-item">
                    <span className="summary-label">
                        Trend
                    </span>
                    <strong className="summary-value">
                        {last >= first
                            ? "Increasing"
                            : "Decreasing"}
                    </strong>
                </div>
            </div>
        </div>
    );
}

function ActivityTable() {
    return (
        <div className="activity-card">
            <div className="section-header">
                <div>
                    <h2>Recent Activity</h2>
                    <p>Latest account activity</p>
                </div>
            </div>

            <div className="activity-table-wrapper">
                <table className="activity-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Activity</th>
                            <th>Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {activities.map(activity => (
                            <tr key={activity.id}>
                                <td>
                                    <div className="activity-user">
                                        <div className="activity-avatar">
                                            {activity.name.charAt(
                                                0
                                            )}
                                        </div>

                                        <span>
                                            {activity.name}
                                        </span>
                                    </div>
                                </td>

                                <td>{activity.action}</td>
                                <td>{activity.date}</td>

                                <td>
                                    <span className="status-badge">
                                        {activity.type}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function NotificationPanel({
    notifications,
    setNotifications
}) {
    const unreadCount = notifications.filter(
        notification => !notification.read
    ).length;

    const markAllRead = () => {
        setNotifications(
            notifications.map(notification => ({
                ...notification,
                read: true
            }))
        );
    };

    return (
        <div className="notification-panel">
            <div className="notification-header">
                <div>
                    <h3>Notifications</h3>
                    <span>{unreadCount} unread</span>
                </div>

                {unreadCount > 0 && (
                    <button onClick={markAllRead}>
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="notification-list">
                {notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`notification-item ${
                            notification.read ? "read" : ""
                        }`}
                    >
                        <div className="notification-icon">
                            <i
                                className={`fas ${notification.icon}`}
                            ></i>
                        </div>

                        <div className="notification-content">
                            <strong>
                                {notification.title}
                            </strong>

                            <p>
                                {notification.message}
                            </p>

                            <span className="notification-time">
                                {notification.time}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Sidebar({
    currentPage,
    setCurrentPage,
    showSidebar,
    setShowSidebar
}) {
    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "fa-home"
        },
        {
            id: "settings",
            label: "Settings",
            icon: "fa-cog"
        }
    ];

    const navigate = page => {
        setCurrentPage(page);
        setShowSidebar(false);
    };

    return (
        <aside
            className={`sidebar ${
                showSidebar ? "open" : ""
            }`}
        >
            <div className="sidebar-header">
                <div className="logo">
                    <div className="logo-icon">
                        <i className="fas fa-chart-line"></i>
                    </div>

                    <span>Analytics</span>
                </div>

                <button
                    className="close-sidebar"
                    onClick={() => setShowSidebar(false)}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>

            <div className="menu-title">
                MAIN MENU
            </div>

            <nav className="sidebar-nav">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`sidebar-button ${
                            currentPage === item.id
                                ? "active"
                                : ""
                        }`}
                        onClick={() => navigate(item.id)}
                    >
                        <i
                            className={`fas ${item.icon}`}
                        ></i>

                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-bottom">
                <div className="sidebar-user">
                    <div className="sidebar-user-avatar">
                        S
                    </div>

                    <div className="sidebar-user-info">
                        <strong>Siem</strong>
                        <span>Administrator</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function Settings({
    settingName,
    setSettingName,
    darkMode,
    setDarkMode
}) {
    const [name, setName] = useState(settingName);
    const [email, setEmail] = useState(
        localStorage.getItem("email") ||
            "siem@example.com"
    );

    const [emailNotifications, setEmailNotifications] =
        useState(
            localStorage.getItem("emailNotifications") !==
                "false"
        );

    const [browserNotifications, setBrowserNotifications] =
        useState(
            localStorage.getItem(
                "browserNotifications"
            ) !== "false"
        );

    const [saved, setSaved] = useState(false);

    const saveSettings = () => {
        const finalName = name.trim() || "Siem";

        setName(finalName);
        setSettingName(finalName);

        localStorage.setItem("name", finalName);
        localStorage.setItem("email", email);
        localStorage.setItem(
            "emailNotifications",
            String(emailNotifications)
        );
        localStorage.setItem(
            "browserNotifications",
            String(browserNotifications)
        );

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2000);
    };

    const resetSettings = () => {
        setName("Siem");
        setEmail("siem@example.com");
        setEmailNotifications(true);
        setBrowserNotifications(true);
        setDarkMode(true);
        setSettingName("Siem");

        localStorage.setItem("name", "Siem");
        localStorage.setItem(
            "email",
            "siem@example.com"
        );
        localStorage.setItem(
            "emailNotifications",
            "true"
        );
        localStorage.setItem(
            "browserNotifications",
            "true"
        );
        localStorage.setItem("darkMode", "true");
    };

    return (
        <div className="content">
            <div className="page-title">
                <div>
                    <span className="eyebrow">
                        ACCOUNT
                    </span>

                    <h1>Settings</h1>

                    <p>
                        Manage your profile and dashboard
                        preferences.
                    </p>
                </div>
            </div>

            <div className="settings-container">
                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-card-icon">
                            <i className="fas fa-user"></i>
                        </div>

                        <div>
                            <h3>Profile</h3>
                            <p>
                                Update your personal
                                information.
                            </p>
                        </div>
                    </div>

                    <div className="settings-form">
                        <div className="form-group">
                            <label>Name</label>

                            <input
                                type="text"
                                value={name}
                                onChange={event =>
                                    setName(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>

                            <input
                                type="email"
                                value={email}
                                onChange={event =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                </div>

                <div className="settings-card">
                    <div className="settings-card-header">
                        <div className="settings-card-icon">
                            <i className="fas fa-sliders-h"></i>
                        </div>

                        <div>
                            <h3>Preferences</h3>
                            <p>
                                Customize your dashboard
                                experience.
                            </p>
                        </div>
                    </div>

                    <div className="settings-form">
                        <div className="toggle-row">
                            <div className="toggle-info">
                                <strong>Dark Mode</strong>
                                <span>
                                    Use the dark dashboard
                                    appearance.
                                </span>
                            </div>

                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={event =>
                                        setDarkMode(
                                            event.target.checked
                                        )
                                    }
                                />

                                <span></span>
                            </label>
                        </div>

                        <div className="toggle-row">
                            <div className="toggle-info">
                                <strong>
                                    Email Notifications
                                </strong>

                                <span>
                                    Receive important
                                    account updates.
                                </span>
                            </div>

                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={
                                        emailNotifications
                                    }
                                    onChange={event =>
                                        setEmailNotifications(
                                            event.target.checked
                                        )
                                    }
                                />

                                <span></span>
                            </label>
                        </div>

                        <div className="toggle-row">
                            <div className="toggle-info">
                                <strong>
                                    Dashboard Notifications
                                </strong>

                                <span>
                                    Show notifications in
                                    the dashboard.
                                </span>
                            </div>

                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={
                                        browserNotifications
                                    }
                                    onChange={event =>
                                        setBrowserNotifications(
                                            event.target.checked
                                        )
                                    }
                                />

                                <span></span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="settings-actions">
                    <button
                        className="secondary-button"
                        onClick={resetSettings}
                    >
                        Reset
                    </button>

                    <button
                        className="primary-button"
                        onClick={saveSettings}
                    >
                        {saved ? "Saved!" : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function DashboardHome() {
    return (
        <div className="content">
            <div className="page-title">
                <div>
                    <span className="eyebrow">
                        OVERVIEW
                    </span>

                    <h1>Dashboard</h1>

                    <p>
                        Monitor your business performance
                        and recent activity.
                    </p>
                </div>
            </div>

            <div className="stats">
                {statCards.map(card => (
                    <StatCard
                        key={card.title}
                        card={card}
                    />
                ))}
            </div>

            <div className="dashboard-grid">
                <AnalyticsChart />
                <ActivityTable />
            </div>
        </div>
    );
}

function AnalyticsDashboard() {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") !== "false"
    );

    const [settingName, setSettingName] = useState(
        localStorage.getItem("name") || "Siem"
    );

    const [currentPage, setCurrentPage] =
        useState("dashboard");

    const [showSidebar, setShowSidebar] =
        useState(false);

    const [showNotifications, setShowNotifications] =
        useState(false);

    const [notifications, setNotifications] = useState(
        defaultNotifications
    );

    useEffect(() => {
        localStorage.setItem(
            "darkMode",
            String(darkMode)
        );
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("name", settingName);
    }, [settingName]);

    const unreadCount = notifications.filter(
        notification => !notification.read
    ).length;

    return (
        <div
            className={`dashboard ${
                darkMode ? "dark-mode" : ""
            }`}
        >
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />

            {showSidebar && (
                <div
                    className="sidebar-overlay show"
                    onClick={() =>
                        setShowSidebar(false)
                    }
                ></div>
            )}

            <main className="main-content">
                <header className="topbar">
                    <button
                        className="menu-button"
                        onClick={() =>
                            setShowSidebar(true)
                        }
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="topbar-right">
                        <button
                            className="theme-button"
                            onClick={() =>
                                setDarkMode(!darkMode)
                            }
                            title="Toggle theme"
                        >
                            <i
                                className={`fas ${
                                    darkMode
                                        ? "fa-sun"
                                        : "fa-moon"
                                }`}
                            ></i>
                        </button>

                        <div className="notification-wrapper">
                            <button
                                className="notification-button"
                                onClick={() =>
                                    setShowNotifications(
                                        !showNotifications
                                    )
                                }
                                title="Notifications"
                            >
                                <i className="fas fa-bell"></i>

                                {unreadCount > 0 && (
                                    <span className="notification-count">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <NotificationPanel
                                    notifications={
                                        notifications
                                    }
                                    setNotifications={
                                        setNotifications
                                    }
                                />
                            )}
                        </div>

                        <div className="user-profile">
                            <div className="user-avatar">
                                {settingName
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div className="user-info">
                                <span className="user-name">
                                    {settingName}
                                </span>

                                <span className="user-role">
                                    Administrator
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {currentPage === "settings" ? (
                    <Settings
                        settingName={settingName}
                        setSettingName={
                            setSettingName
                        }
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                ) : (
                    <DashboardHome />
                )}
            </main>
        </div>
    );
}

function App() {
    return <AnalyticsDashboard />;
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);