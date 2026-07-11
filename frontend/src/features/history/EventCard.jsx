import {
    FaBrain,
    FaTrafficLight,
    FaAmbulance,
    FaChartLine,
    FaServer,
    FaExclamationTriangle
} from "react-icons/fa";

import styles from "./EventCard.module.css";

function EventCard({ event }) {

    // Support both old and new event formats
    const type = event.category || event.type;

    const icons = {

        AI: <FaBrain />,

        SIGNAL: <FaTrafficLight />,

        EMERGENCY: <FaAmbulance />,

        ANALYTICS: <FaChartLine />,

        SYSTEM: <FaServer />

    };
    const iconClass =
        styles[type?.toLowerCase()] || styles.system;
    const icon = icons[type] || <FaServer />;

    return (

        <article className={styles.card}>
            <div className={`${styles.icon} ${iconClass}`}>

                {icon}

            </div>


            <div className={styles.content}>

                <h3>

                    {event.title}

                </h3>

                <p>

                    {event.description}

                </p>

            </div>

            <div className={styles.time}>

                {event.time}

            </div>

        </article>

    );

}

export default EventCard;