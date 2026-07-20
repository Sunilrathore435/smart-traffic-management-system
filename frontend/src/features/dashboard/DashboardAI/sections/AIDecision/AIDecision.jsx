import {
    FaTrafficLight,
    FaClock,
    FaChartLine,
    FaCheckCircle
} from "react-icons/fa";

import styles from "./AIDecision.module.css";

function AIDecision({

                        signalPhase = "Unknown",

                        greenDuration = 0,

                        trafficScore = 0,

                        priority = "NORMAL"

                    }) {

    const decision = [

        {
            icon: <FaTrafficLight />,
            label: "Signal Phase",
            value: signalPhase
        },

        {
            icon: <FaClock />,
            label: "Green Time",
            value: `${greenDuration}s`
        },

        {
            icon: <FaChartLine />,
            label: "Traffic Score",
            value: Number(trafficScore).toFixed(1)
        },

        {
            icon: <FaCheckCircle />,
            label: "Priority",
            value: priority
        }

    ];

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>

                AI DECISION

            </h3>

            <div className={styles.grid}>

                {

                    decision.map(item => (

                        <div
                            key={item.label}
                            className={styles.card}
                        >

                            <div className={styles.icon}>

                                {item.icon}

                            </div>

                            <span className={styles.label}>

                                {item.label}

                            </span>

                            <strong className={styles.value}>

                                {item.value}

                            </strong>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default AIDecision;