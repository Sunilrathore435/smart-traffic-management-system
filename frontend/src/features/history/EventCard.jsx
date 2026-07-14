import {
    FaBrain,
    FaTrafficLight,
    FaAmbulance,
    FaServer
} from "react-icons/fa";

import styles from "./EventCard.module.css";

function EventCard({ event }) {

    const emergency =
        event.emergencyTriggered;

    const icon =
        emergency
            ? <FaAmbulance />
            : <FaTrafficLight />;

    const iconClass =
        emergency
            ? styles.emergency
            : styles.signal;

    const title =
        emergency
            ? `Emergency Priority • ${event.selectedLane}`
            : `${event.selectedLane} Signal Activated`;

    const description =

        `${event.vehiclesPassed} vehicle(s) passed • Green ${event.greenTime}s • ${event.reason}`;

    const time = new Date(
        event.simulationTime
    ).toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit",

        second: "2-digit"

    });

    return (

        <article className={styles.card}>

            <div
                className={`${styles.icon} ${iconClass}`}
            >

                {icon}

            </div>

            <div className={styles.content}>

                <h3>

                    {title}

                </h3>

                <p>

                    {description}

                </p>

            </div>

            <div className={styles.time}>

                {time}

            </div>

        </article>

    );

}

export default EventCard;