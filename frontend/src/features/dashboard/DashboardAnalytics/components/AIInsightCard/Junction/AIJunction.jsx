import styles from "./AIJunction.module.css";

function AIJunction({

                        analytics,
                        ai,
                        emergency,
                        signal

                    }) {

    // ==========================================
    // Signal Phase
    // ==========================================

    const signalPhase =

        emergency?.active

            ? emergency?.lane

            : signal?.currentSignalPhase ??

            ai?.signalPhase ??

            "NORTH_SOUTH";

    const northSouth =
        signalPhase === "NORTH_SOUTH";

    const eastWest =
        signalPhase === "EAST_WEST";

    const allRed =
        signalPhase === "ALL_RED";

    // ==========================================
    // Congestion
    // ==========================================

    const congestion =

        analytics?.trafficScore ??

        ai?.trafficScore ??

        0;

    // ==========================================
    // Priority
    // ==========================================

    let priority = "LOW PRIORITY";

    let status = "NORMAL";

    if (emergency?.active) {

        priority = "EMERGENCY PRIORITY";

        status = "EMERGENCY";

    }

    else if (congestion >= 80) {

        priority = "HIGH PRIORITY";

        status = "HIGH";

    }

    else if (congestion >= 50) {

        priority = "MEDIUM PRIORITY";

        status = "MEDIUM";

    }

    const badgeClass =

        emergency?.active

            ? styles.priorityEmergency

            : congestion >= 80

                ? styles.priorityHigh

                : congestion >= 50

                    ? styles.priorityMedium

                    : styles.priorityLow;

    // ==========================================
    // Label
    // ==========================================

    const phaseLabel =

        northSouth

            ? "North ↕ South"

            : eastWest

                ? "East ↔ West"

                : "All Red";

    return (

        <div className={styles.wrapper}>

            {/* ================================= */}

            <div className={styles.header}>

                <div className={`${styles.priority} ${badgeClass}`}>

                    <span className={styles.dot}></span>

                    {priority}

                </div>

                <div className={styles.aiStatus}>

                    AI • {status}

                </div>

            </div>

            {/* ================================= */}

            <div className={styles.map}>

                <div className={styles.vertical}></div>

                <div className={styles.horizontal}></div>

                <div className={styles.verticalLine}></div>

                <div className={styles.horizontalLine}></div>

                <div className={`${styles.crosswalk} ${styles.crossTop}`}></div>

                <div className={`${styles.crosswalk} ${styles.crossBottom}`}></div>

                <div className={`${styles.crosswalk} ${styles.crossLeft}`}></div>

                <div className={`${styles.crosswalk} ${styles.crossRight}`}></div>

                <div className={styles.center}>

                    <div className={styles.centerRing}></div>

                    <div className={styles.aiContent}>

        <span className={styles.aiText}>
            AI
        </span>

                        <span className={styles.phaseText}>
    {northSouth
        ? "N ↕ S"
        : eastWest
            ? "E ↔ W"
            : "STOP"}
</span>

                    </div>



                </div>

                {/* ================================= */}
                {/* Active Vehicles */}
                {/* ================================= */}

                {northSouth && (

                    <>

                        <span
                            className={`${styles.car} ${styles.top}
                            ${emergency?.active ? styles.carEmergency : ""}`}
                        />

                        <span
                            className={`${styles.car} ${styles.bottom}
                            ${emergency?.active ? styles.carEmergency : ""}`}
                        />

                    </>

                )}

                {eastWest && (

                    <>

                        <span
                            className={`${styles.car} ${styles.left}
                            ${emergency?.active ? styles.carEmergency : ""}`}
                        />

                        <span
                            className={`${styles.car} ${styles.right}
                            ${emergency?.active ? styles.carEmergency : ""}`}
                        />

                    </>

                )}

                {/* ================================= */}
                {/* Active Glow */}
                {/* ================================= */}

                {

                    northSouth && (

                        <div

                            className={`${styles.activeLane}
                            ${styles.glowNorthSouth}`}

                        />

                    )

                }

                {

                    eastWest && (

                        <div

                            className={`${styles.activeLane}
                            ${styles.glowEastWest}`}

                        />

                    )

                }

                {

                    allRed && (

                        <div

                            className={`${styles.activeLane}
                            ${styles.glowAllRed}`}

                        />

                    )

                }

            </div>

            {/* ================================= */}

        </div>

    );

}

export default AIJunction;