import styles from "./AIJunction.module.css";

function AIJunction({

                        analytics,
                        ai,
                        emergency

                    }) {

    const prediction = analytics?.prediction || {};
    const congestion = prediction.congestion || 0;
    const ranking = analytics?.ranking || [];

    // =====================================
    // Active Lane
    // =====================================

    const activeLane =

        emergency?.active
            ? emergency.lane
            : ai?.lane ||
            ranking[0]?.name ||
            "north";

    // =====================================
    // Priority
    // =====================================

    let priority = "LOW PRIORITY";
    let status = "NORMAL";

    if (emergency?.active) {

        priority = "EMERGENCY PRIORITY";
        status = "EMERGENCY";

    }

    else if (congestion >= 70) {

        priority = "HIGH PRIORITY";
        status = "HIGH";

    }

    else if (congestion >= 40) {

        priority = "MEDIUM PRIORITY";
        status = "MEDIUM";

    }

    const badgeClass = emergency?.active
        ? styles.priorityEmergency
        : congestion >= 70
            ? styles.priorityHigh
            : congestion >= 40
                ? styles.priorityMedium
                : styles.priorityLow;

    return (

        <div className={styles.wrapper}>

            {/* ==========================
                Status Header
            =========================== */}

            <div className={styles.header}>

                <div className={`${styles.priority} ${badgeClass}`}>

                    <span className={styles.dot}></span>

                    {priority}

                </div>

                <div className={styles.aiStatus}>

                    AI • {status}

                </div>

            </div>

            {/* ==========================
                Smart Junction
            =========================== */}

            <div className={styles.map}>

                {/* Roads */}

                <div className={styles.vertical}></div>

                <div className={styles.horizontal}></div>

                {/* Lane Divider */}

                <div className={styles.verticalLine}></div>

                <div className={styles.horizontalLine}></div>

                {/* Crosswalks */}

                <div className={`${styles.crosswalk} ${styles.crossTop}`}></div>
                <div className={`${styles.crosswalk} ${styles.crossBottom}`}></div>
                <div className={`${styles.crosswalk} ${styles.crossLeft}`}></div>
                <div className={`${styles.crosswalk} ${styles.crossRight}`}></div>

                {/* Junction */}

                <div className={styles.center}>

                    <div className={styles.centerRing}></div>

                    <span>AI</span>

                </div>

                {/* =====================
                    Vehicles
                ====================== */}

                {activeLane === "north" && (

                    <span
                        className={`
                            ${styles.car}
                            ${styles.top}
                            ${emergency?.active ? styles.carEmergency : ""}
                        `}
                    />

                )}

                {activeLane === "south" && (

                    <span
                        className={`
                            ${styles.car}
                            ${styles.bottom}
                            ${emergency?.active ? styles.carEmergency : ""}
                        `}
                    />

                )}

                {activeLane === "east" && (

                    <span
                        className={`
                            ${styles.car}
                            ${styles.right}
                            ${emergency?.active ? styles.carEmergency : ""}
                        `}
                    />

                )}

                {activeLane === "west" && (

                    <span
                        className={`
                            ${styles.car}
                            ${styles.left}
                            ${emergency?.active ? styles.carEmergency : ""}
                        `}
                    />

                )}

                {/* Active Lane Glow */}

                <div
                    className={`
                        ${styles.activeLane}
                        ${
                        activeLane === "north"
                            ? styles.glowNorth
                            : activeLane === "south"
                                ? styles.glowSouth
                                : activeLane === "east"
                                    ? styles.glowEast
                                    : styles.glowWest
                    }
                    `}
                />

            </div>

            {/* ==========================
                Footer
            =========================== */}

            <div className={styles.footer}>

                <div>

                    <small>Active Lane</small>

                    <strong>

                        {activeLane.toUpperCase()}

                    </strong>

                </div>

                <div>

                    <small>Congestion</small>

                    <strong>

                        {congestion}%

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default AIJunction;