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
    // Recommendation Lane
    // =====================================

    const busiestLane = emergency

        ? currentLane.toLowerCase()

        : Object.keys(queues).reduce(

            (a, b) =>

                queues[a] >= queues[b]

                    ? a

                    : b

        );

    // =====================================
    // AI Metrics
    // =====================================

    const reduction = Math.max(

        0,

        Math.min(

            100,

            100 - congestion

        )

    );

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

                            {

                                emergency

                                    ? `Emergency Priority → ${busiestLane.toUpperCase()}`

                                    : `Extend ${busiestLane.toUpperCase()} Green Signal`

                            }

                        </strong>

                        <span>

                            {

                                emergency

                                    ? "Emergency vehicle detected. AI has overridden normal optimization."

                                    : "AI optimized based on live traffic density."

                            }

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

                            {greenTime}s

                        </strong>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AIRecommendation;