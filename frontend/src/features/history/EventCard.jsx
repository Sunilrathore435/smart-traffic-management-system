import {
    FaTrafficLight,
    FaAmbulance,
    FaClock,
    FaRoad
} from "react-icons/fa";

import styles from "./EventCard.module.css";

function EventCard({ event }) {

    const emergency = event.emergencyTriggered;

    const phase =
        event.signalPhase ??
        event.currentSignalPhase ??
        event.selectedLane ??
        "UNKNOWN";

    const phaseLabel = {

        NORTH_SOUTH: "North ↕ South",

        EAST_WEST: "East ↔ West",

        ALL_RED: "All Red"

    }[phase] ?? phase;

    const icon = emergency
        ? <FaAmbulance />
        : <FaTrafficLight />;

    const iconClass = emergency
        ? styles.emergency
        : styles.signal;

    const title = emergency
        ? "Emergency Priority Activated"
        : `${phaseLabel} Phase Activated`;

    const description = `${event.vehiclesPassed ?? 0} vehicle(s) passed • Green ${event.greenTime ?? 0}s`;

    const reason =
        event.reason ??
        "Adaptive traffic optimization";

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

                    <h3>

                        {title}

                    </h3>

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

                <p>

                    <FaRoad />

                    {description}

                </p>

                <small className={styles.reason}>

                    {reason}

                </small>

            </div>

            <div className={styles.meta}>

                <span className={styles.time}>

                    <FaClock />

                    {time}

                </span>

            </div>

        </article>

    );

}

export default EventCard;