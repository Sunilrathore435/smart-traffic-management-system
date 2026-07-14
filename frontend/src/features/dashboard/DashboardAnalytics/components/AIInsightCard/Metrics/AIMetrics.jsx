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

    const performance =
        analytics?.performance || {};

    const congestion =
        analytics?.congestion ?? 0;

    const greenTime =
        ai?.greenTime ??

        Math.round(
            analytics?.averageGreenTime ?? 10
        );

    // =====================================
    // Backend Metrics
    // =====================================

    const queueReduction =

        emergency?.active

            ? 100

            : performance.efficiency ??

            Math.max(
                10,
                Math.min(
                    90,
                    Math.round(100 - congestion)
                )
            );

    const waitReduction =

        emergency?.active

            ? 100

            : Math.max(
                5,
                Math.round(greenTime * 2.2)
            );

    const fuelSaving =

        emergency?.active

            ? 100

            : performance.fuelSaving ??

            analytics?.fuelSaving ??

            0;

    const metrics = [

        {
            icon: <FaArrowTrendUp />,
            label: "Expected Queue Reduction",
            value: `${queueReduction}%`,
            color: "#22C55E"
        },

        {
            icon: <FaClock />,
            label: "Estimated Wait Time Reduction",
            value: `${waitReduction}%`,
            color: "#25D7FF"
        },

        {
            icon: <FaLeaf />,
            label: "Fuel Savings (Est.)",
            value: `${fuelSaving}%`,
            color: "#9B5CF6"
        }

    ];

    return (

        <section className={styles.wrapper}>

            <h3 className={styles.heading}>

                Expected Improvement

            </h3>

            {

                metrics.map(item => (

                    <div
                        key={item.label}
                        className={styles.row}
                    >

                        <div className={styles.left}>

                            <div
                                className={styles.icon}
                                style={{
                                    color: item.color
                                }}
                            >

                                {item.icon}

                            </div>

                            <span className={styles.label}>

                                {item.label}

                            </span>

                        </div>

                        <span
                            className={styles.value}
                            style={{
                                color: item.color
                            }}
                        >

                            {item.value}

                        </span>

                    </div>

                ))

            }

        </section>

    );

}

export default AIMetrics;