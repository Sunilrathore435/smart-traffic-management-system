import {
    FaRobot,
    FaMicrochip,
    FaServer,
    FaClock
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AIHeader.module.css";

function AIHeader({

                      status = "offline",

                      version = "--",

                      mode = "Adaptive AI",

                      scheduler = "UNKNOWN",

                      uptime = 0,

                      lastUpdated = "--:--:--"

                  }) {

    const uptimeMinutes = Math.floor(uptime * 60);

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.logo}>

                    <FaRobot />

                </div>

                <div>

                    <h2 className={styles.title}>

                        TRAFIQ AI

                    </h2>

                    <p className={styles.subtitle}>

                        Real-Time Traffic Intelligence Engine

                    </p>

                    <div className={styles.modeRow}>

                        <FaMicrochip />

                        <span>{mode}</span>

                    </div>

                </div>

            </div>

            <div className={styles.right}>

                <StatusPill
                    label={
                        status === "online"
                            ? "ONLINE"
                            : "OFFLINE"
                    }
                    status={status}
                />

                <div className={styles.meta}>

                    <div>

                        <FaServer />

                        <span>{scheduler}</span>

                    </div>

                    <div>

                        <FaClock />

                        <span>{lastUpdated}</span>

                    </div>

                </div>

                <div className={styles.footer}>

                    <span>Version {version}</span>

                    <span>

                        Uptime {uptimeMinutes} min

                    </span>

                </div>

            </div>

        </header>

    );

}

export default AIHeader;