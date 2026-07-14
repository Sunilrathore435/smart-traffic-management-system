import {
    FaTrafficLight,
    FaClock,
    FaGaugeHigh
} from "react-icons/fa6";

import styles from "./RecentEventItem.module.css";
import {FaAmbulance} from "react-icons/fa";

function RecentEventItem({ event }) {

    const emergency = event.emergencyTriggered;

    const icon = emergency
        ? <FaAmbulance />
        : <FaTrafficLight />;

    const iconClass = emergency
        ? styles.emergency
        : styles.signal;

    const title = emergency
        ? `Emergency Priority • ${event.selectedLane}`
        : `${event.selectedLane} Signal Activated`;

    const description =
        `${event.vehiclesPassed} vehicle(s) passed • Green ${event.greenTime}s`;

    const time = new Date(
        event.simulationTime
    ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    return (

        <article className={styles.card}>

            <div className={`${styles.icon} ${iconClass}`}>

                {icon}

            </div>

            <div className={styles.content}>

                <h4>
                    {title}
                </h4>

                <p>
                    {description}
                </p>

                <small className={styles.reason}>
                    {event.reason}
                </small>

            </div>

            <div className={styles.meta}>

                <span className={styles.time}>
                    {time}
                </span>

                <span className={styles.execution}>
                    <FaClock />
                    {event.executionTimeMs ?? 0} ms
                </span>

                <span className={styles.score}>
                    <FaGaugeHigh />
                    {event.trafficScore.toFixed(1)}
                </span>

            </div>

        </article>

    );

}

export default RecentEventItem;