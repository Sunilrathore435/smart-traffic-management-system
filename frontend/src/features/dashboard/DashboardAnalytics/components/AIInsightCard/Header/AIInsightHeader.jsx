import {
    FaBrain,
    FaEllipsisV
} from "react-icons/fa";

import styles from "./AIInsightHeader.module.css";

function AIInsightHeader() {

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

                    <div className={styles.subtitle}>

                        <span>Real-Time AI Recommendation</span>

                        <span className={styles.dot}></span>

                        <span>LIVE</span>

                    </div>

                </div>

            </div>

            <button className={styles.menu}>
                <FaEllipsisV />
            </button>

        </header>

    );

}

export default AIInsightHeader;