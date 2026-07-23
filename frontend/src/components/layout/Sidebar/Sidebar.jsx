import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaChartBar,
    FaHistory,
    FaCog,
    FaRobot,
    FaCircle,
    FaServer,
    FaDatabase,
    FaBolt
} from "react-icons/fa";

import styles from "./Sidebar.module.css";

function Sidebar() {

    const menu = [

        {
            title: "Mission Control",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            title: "Traffic Intelligence",
            path: "/analytics",
            icon: <FaChartBar />
        },

        {
            title: "Operation Logs",
            path: "/history",
            icon: <FaHistory />
        },

        {
            title: "System Configuration",
            path: "/settings",
            icon: <FaCog />
        }

    ];

    return (

        <aside className={styles.sidebar}>

            {/* ======================================
                Logo
            ======================================= */}

            <div className={styles.logo}>

                <div className={styles.logoIcon}>

                    🚦

                </div>

                <div>

                    <h2>SCTCC</h2>

                    <p>

                        Smart City Traffic
                        <br />
                        Command Center

                    </p>

                </div>

            </div>

            {/* ======================================
                Navigation
            ======================================= */}

            <nav className={styles.navigation}>

                {

                    menu.map(item => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                isActive

                                    ? `${styles.link} ${styles.active}`

                                    : styles.link

                            }

                        >

                            <div className={styles.icon}>

                                {item.icon}

                            </div>

                            <span>

                                {item.title}

                            </span>

                        </NavLink>

                    ))

                }

            </nav>

            {/* ======================================
                AI Assistant
            ======================================= */}

            <div className={styles.footer}>

                <div className={styles.aiCard}>

                    <div className={styles.aiAvatar}>

                        <FaRobot />

                        <span className={styles.scanRing}></span>

                        <span className={styles.scanRing2}></span>

                    </div>

                    <div className={styles.aiInfo}>

                        <h3>

                            TRAFIQ AI

                        </h3>

                        <p>

                            Neural Traffic Assistant

                        </p>

                    </div>

                </div>

                {/* Status */}

                <div className={styles.status}>

                    <FaCircle />

                    <span>

                        Monitoring 4 Intersections

                    </span>

                </div>

                {/* Live Message */}

                <div className={styles.aiMessage}>

                    "Analyzing live traffic density
                    and optimizing signal phases..."

                </div>

                {/* Metrics */}

                <div className={styles.metrics}>

                    <div>

                        <FaServer />

                        <span>

                            Backend

                        </span>

                        <strong>

                            Online

                        </strong>

                    </div>

                    <div>

                        <FaDatabase />

                        <span>

                            MongoDB

                        </span>

                        <strong>

                            Connected

                        </strong>

                    </div>

                    <div>

                        <FaBolt />

                        <span>

                            Latency

                        </span>

                        <strong>

                            12 ms

                        </strong>

                    </div>

                </div>

                {/* AI Statistics */}

                <div className={styles.stats}>

                    <div>

                        <span>

                            AI Accuracy

                        </span>

                        <strong>

                            98.7%

                        </strong>

                    </div>

                    <div>

                        <span>

                            Neural Model

                        </span>

                        <strong>

                            v2.4.0

                        </strong>

                    </div>

                </div>

                {/* Technology */}

                <div className={styles.techStack}>

                    <span>

                        Spring Boot

                    </span>

                    <span>

                        MongoDB

                    </span>

                    <span>

                        WebSocket

                    </span>

                    <span>

                        React

                    </span>

                    <span>

                        AI Engine

                    </span>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;