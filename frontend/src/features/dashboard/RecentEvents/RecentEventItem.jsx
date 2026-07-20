import {
    FaTrafficLight,
    FaClock,
    FaGaugeHigh
} from "react-icons/fa6";

import {
    FaAmbulance,
    FaCheckCircle
} from "react-icons/fa";

import styles from "./RecentEventItem.module.css";

function RecentEventItem({ event }) {

    const emergency = event.emergencyTriggered;

    const icon = emergency
        ? <FaAmbulance />
        : <FaTrafficLight />;

    const iconClass = emergency
        ? styles.emergency
        : styles.signal;
    const phase =
        event.signalPhase ??
        event.currentSignalPhase ??
        "Unknown";
    const phaseLabel = {
        NORTH_SOUTH: "North ↕ South",
        EAST_WEST: "East ↔ West",
        ALL_RED: "All Red"
    }[phase] ?? phase;
    const title = emergency
        ? "Emergency Priority Activated"
        : `${phaseLabel} Phase Activated`;

    const description = `${event.vehiclesPassed} vehicle(s) passed • Green for ${event.greenTime}s`;

    const time = event.simulationTime
        ? new Date(event.simulationTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
        : "--:--:--";

    return (

        <article className={styles.card}>

            <div className={`${styles.icon} ${iconClass}`}>

                {icon}

            </div>

            <div className={styles.content}>

                <div className={styles.header}>

                    <h4>{title}</h4>

                    <span
                        className={
                            emergency
                                ? styles.badgeEmergency
                                : styles.badgeNormal
                        }
                    >

                        {emergency
                            ? "EMERGENCY"
                            : "NORMAL"}

                    </span>

                </div>

                <p>{description}</p>

                <small className={styles.reason}>

                    <FaCheckCircle />

                    {event.reason || "Adaptive traffic optimization"}

                </small>

            </div>

            <div className={styles.meta}>

                <span className={styles.time}>

                    {time}

                </span>

                <span className={styles.execution}>

                    <FaClock />

                    {((event.executionTimeMs ?? 0) / 1000).toFixed(2)} s

                </span>

                <span className={styles.score}>

                    <FaGaugeHigh />

                    {(event.trafficScore ?? 0).toFixed(1)}

                </span>

            </div>

        </article>

    );

}

export default RecentEventItem;