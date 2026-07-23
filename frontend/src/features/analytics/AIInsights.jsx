import {
    FaBrain,
    FaRoute,
    FaTrafficLight,
    FaClock,
    FaCar,
    FaChartLine,
    FaBolt,
    FaRobot,
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";

import styles from "./AIInsights.module.css";

function AIInsights({

                        analytics = {},
                        ai = {},
                        emergency = {}

                    }) {

    const prediction = analytics.prediction || {};
    const performance = analytics.performance || {};

    const rows = [

        {
            icon: <FaTrafficLight />,
            label: "Signal Phase",
            value: ai.signalPhase || "-"
        },

        {
            icon: <FaRoute />,
            label: "Dominant Lane",
            value: ai.dominantLane || "-"
        },

        {
            icon: <FaClock />,
            label: "Green Time",
            value: `${ai.greenTime ?? 0} sec`
        },

        {
            icon: <FaCar />,
            label: "Vehicles Allowed",
            value: ai.vehiclesAllowed ?? 0
        },

        {
            icon: <FaChartLine />,
            label: "Traffic Score",
            value: `${Math.round(ai.trafficScore ?? 0)}%`
        },

        {
            icon: <FaRobot />,
            label: "AI Efficiency",
            value: `${performance.efficiency ?? 0}%`
        },

        {
            icon: <FaBolt />,
            label: "Prediction",
            value: prediction.recommendation || "-"
        },

        {
            icon: <FaBrain />,
            label: "Confidence",
            value: `${prediction.confidence ?? 0}%`
        }

    ];

    return (

        <section className={styles.card}>

            <header className={styles.header}>

                <div className={styles.icon}>
                    <FaBrain />
                </div>

                <div>

                    <h2>AI Decision Center</h2>

                    <p>
                        Adaptive Traffic Intelligence
                    </p>

                </div>

            </header>

            <div className={styles.grid}>

                {

                    rows.map(row => (

                        <div
                            key={row.label}
                            className={styles.row}
                        >

                            <div className={styles.label}>

                                {row.icon}

                                <span>

                                    {row.label}

                                </span>

                            </div>

                            <strong>

                                {row.value}

                            </strong>

                        </div>

                    ))

                }

            </div>

            <footer
                className={
                    emergency.active
                        ? styles.warning
                        : styles.success
                }
            >

                {

                    emergency.active

                        ?

                        <>

                            <FaExclamationTriangle />

                            Emergency Override Active

                        </>

                        :

                        <>

                            <FaCheckCircle />

                            AI Optimizer Running Normally

                        </>

                }

            </footer>

        </section>

    );

}

export default AIInsights;