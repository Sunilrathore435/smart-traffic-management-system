import {
    FaClockRotateLeft,
    FaDatabase,
    FaWifi,
    FaCircle
} from "react-icons/fa6";

import styles from "./LogsHeader.module.css";

function LogsHeader() {

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <h1>

                    📜 Operation Logs

                </h1>

                <p>

                    Audit trail of AI decisions, emergency actions,
                    analytics alerts and system events.

                </p>

            </div>

            <div className={styles.status}>

                <div className={styles.badge}>

                    <FaDatabase />

                    <div>

                        <strong>Local Cache</strong>

                        <small>Frontend Storage</small>

                    </div>

                </div>

                <div className={styles.badge}>

                    <FaWifi />

                    <div>

                        <strong>Offline Mode</strong>

                        <small>Backend Pending</small>

                    </div>

                </div>

                <div className={styles.live}>

                    <FaCircle />

                    <span>

                        LIVE

                    </span>

                </div>

            </div>

        </header>

    );

}

export default LogsHeader;