import {
    FaBrain,
    FaCircle,
    FaClock,
    FaWalking,
    FaAmbulance,
    FaTrafficLight
} from "react-icons/fa";

import styles from "./Junction.module.css";

function Junction({

                      simulation,
                      emergency

                  }) {

    // ==========================================
    // Backend State
    // ==========================================

    const phase =
        simulation?.currentSignalPhase ?? "UNKNOWN";

    const stage =
        simulation?.currentStage ?? "UNKNOWN";

    const countdown =
        simulation?.remainingTime ?? 0;

    const pedestrian =
        simulation?.pedestrianSignal ?? "DONT_WALK";

    const scheduler =
        simulation?.schedulerStatus ?? "UNKNOWN";

    const running =
        simulation?.simulationRunning ?? false;

    const emergencyActive =
        emergency?.active ?? false;

    const emergencyLane =
        emergency?.lane ?? "NONE";

    // ==========================================
    // Labels
    // ==========================================

    const phaseLabel = {

        NORTH_SOUTH: "North ↕ South",

        EAST_WEST: "East ↔ West",

        ALL_RED: "All Red"

    }[phase] ?? phase;

    const stageLabel = {

        VEHICLE_GREEN: "Vehicle Green",

        VEHICLE_YELLOW: "Vehicle Yellow",

        ALL_RED: "All Red",

        PEDESTRIAN_WALK: "Pedestrian Walk",

        PEDESTRIAN_FLASH: "Pedestrian Flash",

        PEDESTRIAN_DONT_WALK: "Don't Walk"

    }[stage] ?? stage;

    const pedestrianLabel = {

        WALK: "Walk",

        DONT_WALK: "Don't Walk",

        FLASHING_DONT_WALK: "Flashing"

    }[pedestrian] ?? pedestrian.replaceAll("_", " ");

    // ==========================================
    // AI Mode
    // ==========================================

    const aiMode =
        emergencyActive
            ? "Emergency Override"
            : running
                ? "Adaptive AI"
                : "Simulation Paused";

    return (

        <>

            {/* ==========================================
                AI HUD
            ========================================== */}

            <div className={styles.hud}>

                <div className={styles.hudTop}>

                    <div className={styles.ai}>

                        <FaBrain />

                        <span>

                            {aiMode}

                        </span>

                    </div>

                    <div
                        className={`
                            ${
                            emergencyActive
                                ? styles.emergencyStatus
                                : running
                                    ? styles.online
                                    : styles.offline
                        }
                        `}
                    >

                        <FaCircle />

                        <span>

                            {scheduler}

                        </span>

                    </div>

                </div>

                <h2>

                    {phaseLabel}

                </h2>

                <div className={styles.hudInfo}>

                    <div className={styles.infoItem}>

                        <FaTrafficLight />

                        <span>

                            {stageLabel}

                        </span>

                    </div>

                    <div className={styles.infoItem}>

                        <FaClock />

                        <span>

                            {running
                                ? `${countdown}s`
                                : "--"}

                        </span>

                    </div>

                    <div className={styles.infoItem}>

                        <FaWalking />

                        <span>

                            {pedestrianLabel}

                        </span>

                    </div>

                    {

                        emergencyActive && (

                            <div
                                className={`${styles.infoItem} ${styles.priority}`}
                            >

                                <FaAmbulance />

                                <span>

                                    {emergencyLane}

                                </span>

                            </div>

                        )

                    }

                </div>

            </div>

            {/* ==========================================
                Connection Line
            ========================================== */}

            <div className={styles.hudConnector}></div>

            {/* ==========================================
                Junction Core
            ========================================== */}

            <div
                className={`
                    ${styles.junction}
                    ${
                    emergencyActive
                        ? styles.emergency
                        : ""
                }
                `}
            >

                <div
                    className={`
                        ${styles.aiCore}
                        ${
                        emergencyActive
                            ? styles.emergencyCore
                            : running
                                ? styles.activeCore
                                : styles.pausedCore
                    }
                    `}
                >

                    <FaBrain />

                </div>

            </div>

        </>

    );

}

export default Junction;