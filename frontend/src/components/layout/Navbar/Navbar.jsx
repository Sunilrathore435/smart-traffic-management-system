import { FaServer, FaRobot, FaWifi } from "react-icons/fa";

import styles from "./Navbar.module.css";

function Navbar() {

    const currentTime = new Date().toLocaleTimeString();

    return (

        <header className={styles.navbar}>

            <div>

                <h1 className={styles.title}>
                    Smart City Traffic Command Center
                </h1>

                <p className={styles.subtitle}>
                    AI Powered Adaptive Traffic Management
                </p>

            </div>

            <div className={styles.statusContainer}>

                <div className={styles.status}>

                    <FaServer />

                    <span>Backend</span>

                </div>

                <div className={styles.status}>

                    <FaWifi />

                    <span>WebSocket</span>

                </div>

                <div className={styles.status}>

                    <FaRobot />

                    <span>AI Ready</span>

                </div>

                <div className={styles.clock}>

                    {currentTime}

                </div>

            </div>

        </header>

    );

}

export default Navbar;