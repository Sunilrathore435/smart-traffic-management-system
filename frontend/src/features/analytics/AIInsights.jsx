import { useEffect, useState } from "react";

import {
    FaBrain,
    FaLightbulb,
    FaCheckCircle
} from "react-icons/fa";

import AnalyticsEngine from "../traffic/AnalyticsEngine";

import styles from "./AIInsights.module.css";

function AIInsights() {

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

    const insights = [

        {

            title: "Congestion",

            value: `${stats.congestion}%`,

            message:
                stats.congestion > 70
                    ? "High traffic detected"
                    : stats.congestion > 40
                        ? "Moderate traffic"
                        : "Traffic flowing smoothly"

        },

        {

            title: "Average Wait",

            value: `${stats.averageWait}s`,

            message:
                "Average vehicle waiting time"

        },

        {

            title: "Fuel Saving",

            value: `${stats.fuelSaving}%`,

            message:
                "Estimated optimization"

        },

        {

            title: "Throughput",

            value: `${stats.throughput}/min`,

            message:
                "Vehicles cleared every minute"

        }

    ];

    return (

        <section className={styles.card}>

            <header className={styles.header}>

                <FaBrain />

                <div>

                    <h2>

                        AI Insights

                    </h2>

                    <span>

                        Live Optimization Report

                    </span>

                </div>

            </header>

            <div className={styles.list}>

                {

                    insights.map(item => (

                        <div
                            key={item.title}
                            className={styles.item}
                        >

                            <div className={styles.left}>

                                <FaLightbulb />

                                <div>

                                    <h4>

                                        {item.title}

                                    </h4>

                                    <p>

                                        {item.message}

                                    </p>

                                </div>

                            </div>

                            <strong>

                                {item.value}

                            </strong>

                        </div>

                    ))

                }

            </div>

            <footer className={styles.footer}>

                <FaCheckCircle />

                AI Optimizer Running Normally

            </footer>

        </section>

    );

}

export default AIInsights;