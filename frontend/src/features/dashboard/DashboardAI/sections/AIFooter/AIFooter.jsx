import {
    FaBolt,
    FaClock,
    FaServer,
    FaWifi
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AIFooter.module.css";

function AIFooter({

                      status = "offline",

                      responseTime = "--",

                      lastSync = "--:--:--",

                      backend = "UNKNOWN",

                      websocket = "UNKNOWN"

                  }) {

    const items = [

        {
            icon: <FaBolt />,
            title: "Response",
            value: responseTime
        },

        {
            icon: <FaClock />,
            title: "Last Sync",
            value: lastSync
        },

        {
            icon: <FaServer />,
            title: "Backend",
            value: backend
        },

        {
            icon: <FaWifi />,
            title: "WebSocket",
            value: websocket
        }

    ];

    return (

        <footer className={styles.footer}>

            <div className={styles.header}>

                <span className={styles.title}>
                    AI SYSTEM
                </span>

                <StatusPill
                    label={
                        status === "online"
                            ? "AI ACTIVE"
                            : "AI OFFLINE"
                    }
                    status={status}
                />

            </div>

            <div className={styles.grid}>

                {items.map(item => (

                    <div
                        key={item.title}
                        className={styles.card}
                    >

                        <div className={styles.icon}>

                            {item.icon}

                        </div>

                        <div>

                            <p className={styles.label}>

                                {item.title}

                            </p>

                            <strong className={styles.value}>

                                {item.value}

                            </strong>

                        </div>

                    </div>

                ))}

            </div>

        </footer>

    );

}

export default AIFooter;