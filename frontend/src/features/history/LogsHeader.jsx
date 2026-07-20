import {
    FaDatabase,
    FaWifi,
    FaCircle,
    FaServer
} from "react-icons/fa6";

import styles from "./LogsHeader.module.css";

function LogsHeader({

                        connected = true,

                        database = "MongoDB",

                        api = "Spring Boot",

                        live = true,

                        uptime = "--"

                    }) {

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <h1>

                    📜 Operation Logs

                </h1>

                <p>

                    Complete audit trail of AI traffic decisions,
                    emergency overrides, pedestrian requests,
                    analytics and system activity.

                </p>

            </div>

            <div className={styles.status}>

                <div className={styles.badge}>

                    <FaDatabase />

                    <div>

                        <strong>

                            {database}

                        </strong>

                        <small>

                            Simulation History

                        </small>

                    </div>

                </div>

                <div className={styles.badge}>

                    <FaServer />

                    <div>

                        <strong>

                            {api}

                        </strong>

                        <small>

                            {connected
                                ? "Connected"
                                : "Disconnected"}

                        </small>

                    </div>

                </div>

                <div className={styles.badge}>

                    <FaWifi />

                    <div>

                        <strong>

                            Uptime

                        </strong>

                        <small>

                            {uptime}

                        </small>

                    </div>

                </div>

                <div
                    className={`${styles.live}
                    ${
                        live
                            ? styles.online
                            : styles.offline
                    }`}
                >

                    <FaCircle />

                    <span>

                        {live
                            ? "LIVE"
                            : "OFFLINE"}

                    </span>

                </div>

            </div>

        </header>

    );

}

export default LogsHeader;