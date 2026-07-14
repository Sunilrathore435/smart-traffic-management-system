import {
    FaBrain,
    FaClock,
    FaCircle
} from "react-icons/fa";

import styles from "./AIFooter.module.css";

function AIFooter({

                      simulation,

                      emergency,

                      timestamp

                  }) {

    // =====================================
    // Last Updated
    // =====================================

    const lastUpdated = timestamp

        ? new Date(timestamp).toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        })

        : "--:--:--";

    // =====================================
    // AI Model
    // =====================================

    const model =

        emergency?.active

            ? "Emergency Response AI"

            : "Adaptive Traffic AI v2.4";

    // =====================================
    // Status
    // =====================================

    let status = "OFFLINE";

    if (emergency?.active) {

        status = "EMERGENCY";

    }

    else if (simulation?.schedulerStatus === "RUNNING") {

        status = "LIVE";

    }

    else if (simulation?.schedulerStatus === "STOPPED") {

        status = "IDLE";

    }

    const statusClass =

        emergency?.active

            ? styles.emergency

            : styles.status;

    return (

        <footer className={styles.footer}>

            <div className={styles.item}>

                <div className={styles.icon}>

                    <FaBrain />

                </div>

                <div>

                    <p className={styles.label}>

                        AI Model

                    </p>

                    <h4 className={styles.value}>

                        {model}

                    </h4>

                </div>

            </div>

            <div className={styles.divider}></div>

            <div className={styles.item}>

                <div className={styles.icon}>

                    <FaClock />

                </div>

                <div>

                    <p className={styles.label}>

                        Last Updated

                    </p>

                    <h4 className={styles.value}>

                        {lastUpdated}

                    </h4>

                </div>

            </div>

            <div className={styles.divider}></div>

            <div className={styles.item}>

                <div className={styles.icon}>

                    <FaCircle className={styles.live} />

                </div>

                <div>

                    <p className={styles.label}>

                        Status

                    </p>

                    <h4 className={statusClass}>

                        {status}

                    </h4>

                </div>

            </div>

        </footer>

    );

}

export default AIFooter;