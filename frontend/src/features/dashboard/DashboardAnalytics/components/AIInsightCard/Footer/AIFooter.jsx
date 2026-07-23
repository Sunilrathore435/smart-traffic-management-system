import {
    FaBrain,
    FaClock,
    FaCircle,
    FaRoad,
    FaCar,
    FaSyncAlt
} from "react-icons/fa";

import styles from "./AIFooter.module.css";

function AIFooter({

                      simulation,
                      emergency,
                      timestamp

                  }) {

    const lastUpdated = timestamp

        ? new Date(timestamp).toLocaleTimeString([], {

            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"

        })

        : "--:--:--";

    const model = emergency?.active

        ? "Emergency Response AI"

        : "Adaptive Traffic AI v2.4";

    let status = "OFFLINE";

    if (emergency?.active)

        status = "EMERGENCY";

    else if (simulation?.schedulerStatus === "RUNNING")

        status = "LIVE";

    else

        status = "IDLE";

    return (

        <footer className={styles.footer}>

            <div className={styles.card}>

                <FaBrain className={styles.icon}/>

                <small>AI Model</small>

                <strong>{model}</strong>

            </div>

            <div className={styles.card}>

                <FaCircle className={styles.icon}/>

                <small>Status</small>

                <strong className={

                    emergency?.active

                        ? styles.emergency

                        : styles.live

                }>

                    {status}

                </strong>

            </div>

            <div className={styles.card}>

                <FaClock className={styles.icon}/>

                <small>Last Updated</small>

                <strong>{lastUpdated}</strong>

            </div>

            <div className={styles.card}>

                <FaSyncAlt className={styles.icon}/>

                <small>Cycles</small>

                <strong>

                    {simulation?.totalSimulationCycles ?? 0}

                </strong>

            </div>

            <div className={styles.card}>

                <FaCar className={styles.icon}/>

                <small>Vehicles</small>

                <strong>

                    {simulation?.processedVehicles ?? 0}

                </strong>

            </div>

            <div className={styles.card}>

                <FaRoad className={styles.icon}/>

                <small>Intersection</small>

                <strong>

                    {simulation?.intersectionName}

                </strong>

            </div>

        </footer>

    );

}

export default AIFooter;