import {
    FaArrowTrendUp,
    FaClock,
    FaLeaf
} from "react-icons/fa6";

import styles from "./AIMetrics.module.css";

function AIMetrics({

                       analytics,
                       ai,
                       emergency

                   }) {

    const performance = analytics?.performance || {};

    const congestion = analytics?.congestion ?? 0;

    const greenTime =
        ai?.greenTime ??
        Math.round(analytics?.averageGreenTime ?? 10);

    const queueReduction =
        emergency?.active
            ? 100
            : performance.efficiency ??
            Math.max(10, Math.min(90, Math.round(100 - congestion)));

    const waitReduction =
        emergency?.active
            ? 100
            : Math.max(5, Math.round(greenTime * 2.2));

    const fuelSaving =
        emergency?.active
            ? 100
            : performance.fuelSaving ??
            analytics?.fuelSaving ??
            0;

    const metrics = [

        {
            icon: <FaArrowTrendUp />,
            title: "Queue Reduction",
            subtitle: "Traffic Flow",
            value: queueReduction,
            color: "#22C55E"
        },

        {
            icon: <FaClock />,
            title: "Wait Time",
            subtitle: "Signal Delay",
            value: waitReduction,
            color: "#00E5FF"
        },

        {
            icon: <FaLeaf />,
            title: "Fuel Saving",
            subtitle: "CO₂ Reduction",
            value: fuelSaving,
            color: "#A855F7"
        }

    ];

    return (

        <section className={styles.wrapper}>

            <div className={styles.header}>

                <h3>AI Improvements</h3>

                <span>Live Prediction</span>

            </div>

            {

                metrics.map(metric => (

                    <div
                        key={metric.title}
                        className={styles.card}
                    >

                        <div className={styles.top}>

                            <div className={styles.left}>

                                <div
                                    className={styles.icon}
                                    style={{ color: metric.color }}
                                >
                                    {metric.icon}
                                </div>

                                <div>

                                    <h4>{metric.title}</h4>

                                    <small>{metric.subtitle}</small>

                                </div>

                            </div>

                            <div
                                className={styles.value}
                                style={{ color: metric.color }}
                            >
                                {metric.value}%
                            </div>

                        </div>

                        <div className={styles.progress}>

                            <div
                                className={styles.fill}
                                style={{
                                    width: `${metric.value}%`,
                                    background: metric.color
                                }}
                            />

                        </div>

                    </div>

                ))

            }

        </section>

    );

}

export default AIMetrics;