import {
    FaLightbulb,
    FaClock,
    FaGasPump,
    FaChartLine,
    FaTrafficLight
} from "react-icons/fa";

import styles from "./AIRecommendation.module.css";

function AIRecommendation({
                              ai = {},
                              fuelSaving = 0,
                              congestion = 0,
                              emergency = false
                          }) {

    // =====================================
    // AI Decision
    // =====================================

    const phaseLabel = {
        NORTH_SOUTH: "North ↕ South",
        EAST_WEST: "East ↔ West",
        ALL_RED: "All Red"
    };

    const nextPhase =
        phaseLabel[ai?.signalPhase] ??
        "Unknown";

    const greenTime =
        ai?.greenTime ?? 10;

    const reason =
        ai?.reason ??
        "AI is analyzing live traffic conditions.";

    // =====================================
    // Dynamic Metrics
    // =====================================

    const reduction = emergency
        ? 100
        : Math.max(15, Math.round(100 - congestion));

    const nextReview = emergency
        ? "Immediate"
        : `${greenTime}s`;

    const title = emergency
        ? "Emergency Priority Override"
        : `Next Phase → ${nextPhase}`;

    const description = emergency
        ? "Emergency vehicle detected. AI has overridden the normal traffic optimization to provide immediate right-of-way."
        : reason;

    return (

        <section className={styles.container}>

            <div className={styles.header}>

                <h3 className={styles.heading}>
                    AI DECISION RECOMMENDATION
                </h3>

                <div className={styles.badge}>
                    <FaTrafficLight />
                    <span>
                        {emergency
                            ? "Emergency Override"
                            : "Adaptive AI"}
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
                            Planned Green Time
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