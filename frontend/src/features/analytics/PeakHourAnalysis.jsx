import { useEffect, useState } from "react";

import {
    FaClock,
    FaArrowTrendUp,
    FaBrain
} from "react-icons/fa6";

import AnalyticsEngine from "../traffic/AnalyticsEngine";

import styles from "./PeakHourAnalysis.module.css";

function PeakHourAnalysis() {

    const [stats, setStats] = useState(
        AnalyticsEngine.getStats()
    );

    useEffect(() => {

        const update = () => {

            setStats(
                AnalyticsEngine.getStats()
            );

        };

        AnalyticsEngine.subscribe(update);

        update();

        return () => {

            AnalyticsEngine.unsubscribe(update);

        };

    }, []);

    const congestion = stats.congestion;

    const recommendation =
        congestion > 70
            ? "Increase green time immediately."
            : congestion > 40
                ? "Traffic is stable. Monitor closely."
                : "Traffic flow is healthy.";

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

                        {stats.currentQueue}

                    </h3>

                </div>

                <div className={styles.metric}>

                    <span>

                        Avg Green Time

                    </span>

                    <h3>

                        {stats.averageGreenTime}s

                    </h3>

                </div>

                <div className={styles.metric}>

                    <span>

                        Throughput

                    </span>

                    <h3>

                        {stats.throughput}/min

                    </h3>

                </div>

                <div className={styles.metric}>

                    <span>

                        Congestion

                    </span>

                    <h3>

                        {stats.congestion}%

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

                    98%

                </strong>

            </footer>

        </section>

    );

}

export default PeakHourAnalysis;