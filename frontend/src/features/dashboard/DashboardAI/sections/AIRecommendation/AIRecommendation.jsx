import {
    FaLightbulb,
    FaClock,
    FaGasPump,
    FaChartLine,
    FaTrafficLight
} from "react-icons/fa";

import styles from "./AIRecommendation.module.css";

function AIRecommendation({

                              queues = {

                                  north: 0,
                                  south: 0,
                                  east: 0,
                                  west: 0

                              },

                              currentLane = "north",

                              greenTime = 8,

                              fuelSaving = 0,

                              congestion = 0,

                              emergency = false

                          }) {

    // =====================================
    // AI Recommended Lane
    // =====================================

    const recommendedLane =

        currentLane ||

        Object.keys(queues).reduce(

            (a, b) =>

                queues[a] >= queues[b]

                    ? a

                    : b

        );

    // =====================================
    // Dynamic Metrics
    // =====================================

    const reduction = emergency

        ? 100

        : Math.max(

            15,

            Math.round(100 - congestion)

        );

    const nextReview = emergency

        ? "Immediate"

        : `${greenTime}s`;

    const title = emergency

        ? `Emergency Priority → ${recommendedLane.toUpperCase()}`

        : `Extend ${recommendedLane.toUpperCase()} Green Signal`;

    const description = emergency

        ? "Emergency vehicle detected. AI has overridden normal traffic optimization to provide immediate right-of-way."

        : "AI recommendation generated from live traffic density, queue length and adaptive signal optimization.";

    return (

        <section className={styles.container}>

            <div className={styles.header}>

                <h3 className={styles.heading}>

                    AI RECOMMENDATION

                </h3>

                <div className={styles.badge}>

                    <FaTrafficLight />

                    <span>

                        {

                            emergency

                                ? "Emergency Override"

                                : "Adaptive AI"

                        }

                    </span>

                </div>

            </div>

            <div className={styles.card}>

                <div className={styles.titleRow}>

                    <FaLightbulb className={styles.icon} />

                    <div>

                        <strong>

                            {title}

                        </strong>

                        <span>

                            {description}

                        </span>

                    </div>

                </div>

                <div className={styles.metrics}>

                    <div className={styles.metric}>

                        <FaChartLine />

                        <span>

                            Traffic Reduction

                        </span>

                        <strong>

                            {reduction}%

                        </strong>

                    </div>

                    <div className={styles.metric}>

                        <FaGasPump />

                        <span>

                            Fuel Saving

                        </span>

                        <strong>

                            {fuelSaving}%

                        </strong>

                    </div>

                    <div className={styles.metric}>

                        <FaClock />

                        <span>

                            Next Review

                        </span>

                        <strong>

                            {nextReview}

                        </strong>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AIRecommendation;