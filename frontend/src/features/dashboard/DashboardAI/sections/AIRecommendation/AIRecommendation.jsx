import {
    FaLightbulb,
    FaClock,
    FaGasPump,
    FaChartLine
} from "react-icons/fa";

import styles from "./AIRecommendation.module.css";

function AIRecommendation() {

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>

                AI RECOMMENDATION

            </h3>

            <div className={styles.card}>

                <div className={styles.titleRow}>

                    <FaLightbulb className={styles.icon} />

                    <strong>

                        Extend North Green Signal

                    </strong>

                </div>

                <div className={styles.metrics}>

                    <div className={styles.metric}>

                        <FaChartLine />

                        <span>Delay Reduction</span>

                        <strong>32%</strong>

                    </div>

                    <div className={styles.metric}>

                        <FaGasPump />

                        <span>Fuel Saving</span>

                        <strong>14%</strong>

                    </div>

                    <div className={styles.metric}>

                        <FaClock />

                        <span>Next Review</span>

                        <strong>18 sec</strong>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AIRecommendation;