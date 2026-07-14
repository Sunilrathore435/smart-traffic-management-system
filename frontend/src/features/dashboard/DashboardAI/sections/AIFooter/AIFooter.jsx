import {
    FaBolt,
    FaClock,
    FaServer,
    FaWifi
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AIFooter.module.css";

function AIFooter({

                      status = "online",

                      responseTime = "--",

                      lastSync = "--",

                      backend = "CONNECTED",

                      websocket = "ONLINE"

                  }) {

    return (

        <footer className={styles.footer}>

            <StatusPill
                label={
                    status === "online"
                        ? "AI ACTIVE"
                        : "AI OFFLINE"
                }
                status={status}
            />

            <div className={styles.info}>

                <div className={styles.item}>

                    <FaBolt />

                    <span>

                        {responseTime}

                    </span>

                </div>

                <div className={styles.item}>

                    <FaClock />

                    <span>

                        {lastSync}

                    </span>

                </div>

                <div className={styles.item}>

                    <FaServer />

                    <span>

                        {backend}

                    </span>

                </div>

                <div className={styles.item}>

                    <FaWifi />

                    <span>

                        {websocket}

                    </span>

                </div>

            </div>

        </footer>

    );

}

export default AIFooter;