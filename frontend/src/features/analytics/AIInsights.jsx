import {
    FaBrain,
    FaLightbulb,
    FaCheckCircle
} from "react-icons/fa";

import styles from "./AIInsights.module.css";

function AIInsights({

                        analytics = {},

                        ai = {},

                        emergency = {}

                    }) {

    const insights = [

        {

            title: "Congestion",

            value: `${analytics.congestion ?? 0}%`,

            message:
                analytics.congestion > 70
                    ? "High traffic detected"
                    : analytics.congestion > 40
                        ? "Moderate traffic"
                        : "Traffic flowing smoothly"

        },

        {

            title: "Throughput",

            value: `${analytics.throughput ?? 0}/min`,

            message:
                "Vehicles cleared every minute"

        },

        {

            title: "Fuel Saving",

            value: `${analytics.fuelSaving ?? 0}%`,

            message:
                "Estimated optimization"

        },

        {

            title: "AI Decision",

            value: ai.selectedLane || "-",

            message:
                ai.reason || "Adaptive optimization"

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

                {

                    emergency.active

                        ? "Emergency Override Active"

                        : "AI Optimizer Running Normally"

                }

            </footer>

        </section>

    );

}

export default AIInsights;