import {
    FaClock,
    FaArrowTrendUp,
    FaBrain
} from "react-icons/fa6";

import styles from "./PeakHourAnalysis.module.css";

function PeakHourAnalysis({

                              analytics = {},

                              ai = {}

                          }) {

    const congestion = analytics.congestion ?? 0;

    const recommendation =

        ai.reason ||

        (

            congestion > 70

                ? "Increase green time immediately."

                : congestion > 40

                    ? "Traffic is stable. Monitor closely."

                    : "Traffic flow is healthy."

        );

    return (

        <section className={styles.card}>

            <header className={styles.header}>

                <div>

                    <FaClock />

                </div>

                <div>

                    <h2>

                        Peak Hour Analysis

                    </h2>

                    <span>

                        AI Traffic Prediction

                    </span>

                </div>

            </header>

            <div className={styles.grid}>

                <div className={styles.metric}>

                    <span>

                        Current Queue

                    </span>

                    <h3>

                        {analytics.liveFlow ?? 0}

                    </h3>

                </div>

                <div className={styles.metric}>

                    <span>

                        Avg Green Time

                    </span>

                    <h3>

                        {Math.round(analytics.averageGreenTime ?? 0)}s

                    </h3>

                </div>

                <div className={styles.metric}>

                    <span>

                        Throughput

                    </span>

                    <h3>

                        {analytics.throughput ?? 0}/min

                    </h3>

                </div>

                <div className={styles.metric}>

                    <span>

                        Congestion

                    </span>

                    <h3>

                        {congestion}%

                    </h3>

                </div>

            </div>

            <div className={styles.recommendation}>

                <FaBrain />

                <div>

                    <h4>

                        AI Recommendation

                    </h4>

                    <p>

                        {recommendation}

                    </p>

                </div>

            </div>

            <footer>

                <FaArrowTrendUp />

                AI Confidence

                <strong>

                    {analytics.prediction?.confidence ?? 99}%

                </strong>

            </footer>

        </section>

    );

}

export default PeakHourAnalysis;