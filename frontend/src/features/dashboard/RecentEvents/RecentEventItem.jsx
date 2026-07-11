import {

    FaBrain,
    FaAmbulance,
    FaChartLine,
    FaServer,
    FaDatabase

} from "react-icons/fa";

import styles from "./RecentEventItem.module.css";

function RecentEventItem({ event }) {

    const icons = {

        AI: <FaBrain />,

        EMERGENCY: <FaAmbulance />,

        ANALYTICS: <FaChartLine />,

        SYSTEM: <FaServer />,

        BACKEND: <FaDatabase />

    };

    const type = event.category || event.type;

    const icon = icons[type] || <FaServer />;

    const iconClass =
        styles[type?.toLowerCase()] || styles.system;

    return (

        <article className={styles.card}>

            <div className={`${styles.icon} ${iconClass}`}>

                {icon}

            </div>

            <div className={styles.content}>

                <h4>

                    {event.title}

                </h4>

                <p>

                    {event.description}

                </p>

            </div>

            <span className={styles.time}>

                {event.time}

            </span>

        </article>

    );

}

export default RecentEventItem;