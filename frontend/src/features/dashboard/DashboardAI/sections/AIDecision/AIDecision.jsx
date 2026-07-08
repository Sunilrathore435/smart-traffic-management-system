import {
    FaTrafficLight,
    FaClock,
    FaChartLine,
    FaCheckCircle
} from "react-icons/fa";

import styles from "./AIDecision.module.css";

function AIDecision() {

    const decision = [

        {
            icon: <FaTrafficLight />,
            label: "Target Signal",
            value: "North Intersection"
        },

        {
            icon: <FaClock />,
            label: "Green Duration",
            value: "18 Seconds"
        },

        {
            icon: <FaChartLine />,
            label: "Expected Reduction",
            value: "32%"
        },

        {
            icon: <FaCheckCircle />,
            label: "Priority",
            value: "NORMAL"
        }

    ];

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>

                CURRENT DECISION

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