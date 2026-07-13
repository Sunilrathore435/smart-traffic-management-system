import {
    FaBrain,
    FaEllipsisV
} from "react-icons/fa";

import styles from "./AIInsightHeader.module.css";

function AIInsightHeader({ analytics }) {

    const prediction =
        analytics?.prediction || {};

    const confidence =
        prediction.confidence || 0;

    let status = "Learning";
    let statusClass = styles.low;

    if (confidence >= 95) {

        status = "OPTIMAL";
        statusClass = styles.high;

    }
    else if (confidence >= 80) {

        status = "ANALYZING";
        statusClass = styles.medium;

    }

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.icon}>
                    <FaBrain />
                </div>

                <div className={styles.info}>

                    <h2 className={styles.title}>
                        AI Traffic Optimizer
                    </h2>

                    <div className={`${styles.subtitle} ${statusClass}`}>

                        <span>{status}</span>

                        <span className={styles.dot}></span>

                        <span>{confidence}% Confidence</span>

                    </div>

                </div>

            </div>

            <button
                className={styles.menu}
                aria-label="More"
            >
                <FaEllipsisV />
            </button>

        </header>

    );

}

export default AIInsightHeader;