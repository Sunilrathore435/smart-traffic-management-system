import {
    FaTag,
    FaRobot,
    FaClock,
    FaTrafficLight
} from "react-icons/fa";

import styles from "./AIRecommendation.module.css";

function AIRecommendation({

                              analytics,
                              ai,
                              emergency,
                              signal,
                              simulation

                          }) {

    // ==================================================
    // Signal Phase
    // ==================================================
    const simulationStatus =
        simulation?.status ??
        (simulation?.simulationRunning ? "RUNNING" : "STOPPED");
    const signalPhase =

        emergency?.active

            ? emergency?.lane

            : signal?.currentSignalPhase ??

            ai?.signalPhase ??

            "NORTH_SOUTH";

    const phaseLabel =

        signalPhase === "NORTH_SOUTH"

            ? "North ↕ South"

            : signalPhase === "EAST_WEST"

                ? "East ↔ West"

                : "All Red";

    // ==================================================
    // Green Time
    // ==================================================

    const greenTime =

        ai?.greenTime ??

        signal?.greenTime ??

        10;

    // ==================================================
    // Traffic Score
    // ==================================================

    const trafficScore =

        Number(

            ai?.trafficScore ??

            analytics?.trafficScore ??

            0

        ).toFixed(1);

    // ==================================================
    // Recommendation
    // ==================================================
    const currentPhase = signal?.currentSignalPhase ?? "NONE";

    const nextPhase = ai?.signalPhase ?? "NONE";
    const formatPhase = (phase) => {
        switch (phase) {
            case "NORTH_SOUTH":
                return "North ↕ South";
            case "EAST_WEST":
                return "East ↔ West";
            case "ALL_RED":
                return "All Red";
            default:
                return "Unknown";
        }
    };

    const currentPhaseLabel = formatPhase(currentPhase);
    const nextPhaseLabel = formatPhase(nextPhase);
    const recommendation =

        emergency?.active

            ? "Emergency vehicle detected. AI has overridden the normal traffic cycle."

            : ai?.reason ??

            "Traffic conditions are stable. AI recommends maintaining the current signal phase.";

    // ==================================================
    // Confidence
    // ==================================================

    const confidence =

        ai?.confidence ??

        100;

    return (

        <section className={styles.wrapper}>

            <div className={styles.header}>

                <div>

                    <h2 className={styles.title}>

                        AI Traffic Decision

                    </h2>

                    <p className={styles.subtitle}>

                        Real-time adaptive signal optimization

                    </p>

                </div>

                <div className={styles.confidence}>

                    <FaRobot />

                    {confidence}% AI

                </div>

            </div>

            <div className={styles.metrics}>

                <div className={styles.metric}>

                    <FaTrafficLight />

                    <div>

                        <small>

                            Current Signal

                        </small>

                        <strong>

                            {currentPhaseLabel}

                        </strong>

                    </div>

                </div>

                <div className={styles.metric}>

                    <FaClock />

                    <div>

                        <small>

                            Planned Green Time

                        </small>

                        <strong>

                            {greenTime}s

                        </strong>

                    </div>

                </div>

            </div>

            <div className={styles.card}>

                <div className={styles.reasonTag}>

                    <FaTag />

                    Next AI Decision

                </div>

                <p className={styles.description}>

                    {nextPhaseLabel}

                </p>

            </div>

            <div className={styles.footer}>

                <div>

                    <small>

                        Traffic Score

                    </small>

                    <strong>

                        {trafficScore}

                    </strong>

                </div>

                <div>

                    <small>

                        Simulation

                    </small>

                    <strong>
                        {simulationStatus === "RUNNING" ? "Running" : "Stopped"}
                    </strong>

                </div>

            </div>

        </section>

    );

}

export default AIRecommendation;