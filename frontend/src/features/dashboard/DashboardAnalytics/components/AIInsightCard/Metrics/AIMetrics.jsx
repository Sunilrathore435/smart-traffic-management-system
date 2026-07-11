import {
    FaArrowTrendUp,
    FaClock,
    FaLeaf
} from "react-icons/fa6";

import styles from "./AIMetrics.module.css";

const metrics = [
    {
        icon: <FaArrowTrendUp />,
        label: "Expected Queue Reduction",
        value: "32%",
        color: "#22C55E"
    },
    {
        icon: <FaClock />,
        label: "Estimated Wait Time Reduction",
        value: "18%",
        color: "#25D7FF"
    },
    {
        icon: <FaLeaf />,
        label: "Fuel Savings (Est.)",
        value: "9%",
        color: "#9B5CF6"
    }
];

function AIMetrics() {

    return (

        <section className={styles.wrapper}>

            <h3 className={styles.heading}>
                Expected Improvement
            </h3>

            {metrics.map((item) => (

                <div
                    key={item.label}
                    className={styles.row}
                >

                    <div className={styles.left}>

                        <div
                            className={styles.icon}
                            style={{ color: item.color }}
                        >
                            {item.icon}
                        </div>

                        <span className={styles.label}>
                            {item.label}
                        </span>

                    </div>

                    <span
                        className={styles.value}
                        style={{ color: item.color }}
                    >
                        {item.value}
                    </span>

                </div>

            ))}

        </section>

    );

}

export default AIMetrics;