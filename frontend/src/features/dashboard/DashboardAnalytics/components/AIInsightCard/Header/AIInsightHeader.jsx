import {
    FaBrain,
    FaEllipsisV,
    FaCircle,
    FaMicrochip,
    FaClock
} from "react-icons/fa";

import styles from "./AIInsightHeader.module.css";

function AIInsightHeader({

                             analytics,
                             simulation,
                             traffic,
                             emergency

                         }) {

    const prediction =
        analytics?.prediction ?? {};

    const health =
        analytics?.systemHealth ?? {};

    const confidence =
        prediction.confidence ?? 0;

    const uptime =
        health.uptime?.toFixed(2) ?? "--";

    const systemStatus =
        health.status ?? "OFFLINE";

    const stage =
        simulation?.currentStage ?? "--";
    const remainingTime =
        simulation?.remainingTime ?? 0;
    const intersection =
        simulation?.intersectionName ??

        "Main Intersection";

    let status = "ANALYZING";

    let statusClass = styles.medium;

    if (emergency?.active){

        status = "EMERGENCY";

        statusClass = styles.emergency;

    }

    else if(confidence>=95){

        status="OPTIMAL";

        statusClass=styles.high;

    }

    else if(confidence<60){

        status="LEARNING";

        statusClass=styles.low;

    }

    return(

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.icon}>

                    <FaBrain/>

                </div>

                <div className={styles.info}>

                    <h2 className={styles.title}>

                        AI Traffic Optimizer

                    </h2>

                    <p className={styles.subtitle}>

                        Adaptive Traffic Intelligence Engine

                    </p>

                    <div className={`${styles.statusBar} ${statusClass}`}>

                        <FaCircle/>

                        <span>{status}</span>

                        <span>•</span>

                        <span>{confidence}% Confidence</span>

                        <span>•</span>

                        <span>{intersection}</span>

                    </div>

                </div>

            </div>

            <div className={styles.right}>

                <div className={styles.metric}>

                    <FaMicrochip/>

                    <div>

                        <small>Stage</small>

                        <strong>{stage}</strong>

                    </div>

                </div>

                <div className={styles.metric}>

                    <FaClock/>

                    <div>

                        <small>Countdown</small>

                        <strong>{remainingTime}s</strong>

                    </div>

                </div>

                <div className={styles.metric}>

                    <small>Uptime</small>

                    <strong>{uptime}h</strong>

                </div>

                <button className={styles.menu}>

                    <FaEllipsisV/>

                </button>

            </div>

        </header>

    );

}

export default AIInsightHeader;