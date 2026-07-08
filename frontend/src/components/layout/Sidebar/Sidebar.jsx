import { NavLink } from "react-router-dom";
import {
    FaChartBar,
    FaCog,
    FaHistory,
    FaHome,
    FaRobot
} from "react-icons/fa";

import styles from "./Sidebar.module.css";

function Sidebar() {

    return (

        <aside className={styles.sidebar}>

            <div className={styles.logo}>

                <h2>🚦 SCTCC</h2>

                <span>Smart Traffic Control</span>

            </div>

            <nav className={styles.navigation}>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.link} ${styles.active}`
                            : styles.link
                    }
                >
                    <FaHome />
                    <span>Mission Control</span>
                </NavLink>

                <NavLink
                    to="/analytics"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.link} ${styles.active}`
                            : styles.link
                    }
                >
                    <FaChartBar />
                    <span>Traffic Intelligence</span>
                </NavLink>

                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.link} ${styles.active}`
                            : styles.link
                    }
                >
                    <FaHistory />
                    <span>Operation Logs</span>
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.link} ${styles.active}`
                            : styles.link
                    }
                >
                    <FaCog />
                    <span>System Configuration</span>
                </NavLink>

            </nav>

            <div className={styles.footer}>

                <FaRobot />

                <div>

                    <strong>TRAFIQ AI</strong>

                    <p>System Online</p>

                </div>

            </div>

        </aside>

    );
}

export default Sidebar;