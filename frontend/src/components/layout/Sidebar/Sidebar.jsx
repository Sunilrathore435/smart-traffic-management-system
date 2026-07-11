import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaChartBar,
    FaHistory,
    FaCog,
    FaRobot,
    FaCircle
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

            {/* Logo */}

            <div className={styles.logo}>

                <div className={styles.logoIcon}>
                    🚦
                </div>

                <div>

                    <h2>SCTCC</h2>

                    <p>
                        Smart City Traffic Command Center
                    </p>

                </div>

            </div>

            {/* Navigation */}

            <nav className={styles.navigation}>

                {menu.map((item) => (

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

                        <span>{item.title}</span>

                    </NavLink>

                ))}

            </nav>

            {/* Footer */}

            <div className={styles.footer}>

                <div className={styles.footerHeader}>

                    <FaRobot />

                    <div>

                        <strong>TRAFIQ AI</strong>

                        <p>Version 2.4.0</p>

                    </div>

                </div>

                <div className={styles.status}>

                    <FaCircle />

                    <span>System Online</span>

                </div>

                <div className={styles.techStack}>

                    <span>Backend</span>

                    <span>MongoDB</span>

                    <span>Socket</span>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;