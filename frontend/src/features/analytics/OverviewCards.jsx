import {
    FaCar,
    FaTrafficLight,
    FaBrain,
    FaAmbulance
} from "react-icons/fa";

import styles from "./OverviewCards.module.css";

function OverviewCards({

                           analytics = {}

                       }) {

    const cards = [

        {
            title: "Vehicles Passed",
            value: analytics.totalVehiclesProcessed ?? 0,
            subtitle: "Processed Today",
            badge: "LIVE",
            icon: <FaCar />,
            color: styles.blue
        },

        {
            title: "Congestion",
            value: `${analytics.congestion ?? 0}%`,
            subtitle: "Current Traffic",
            badge: "REAL-TIME",
            icon: <FaTrafficLight />,
            color: styles.orange
        },

        {
            title: "AI Efficiency",
            value: `${analytics.fuelSaving ?? 0}%`,
            subtitle: "Traffic Optimization",
            badge: "AI",
            icon: <FaBrain />,
            color: styles.green
        },

        {
            title: "Emergencies",
            value: analytics.emergencyVehiclesHandled ?? 0,
            subtitle: "Priority Vehicles",
            badge: "SAFE",
            icon: <FaAmbulance />,
            color: styles.red
        }

    ];
    

    return (

        <section className={styles.grid}>

            {

                cards.map(card => (

                    <article
                        key={card.title}
                        className={`${styles.card} ${card.color}`}
                    >

                        <div className={styles.top}>

                            <div className={styles.icon}>

                                {card.icon}

                            </div>

                            <span className={styles.badge}>

                                {card.badge}

                            </span>

                        </div>

                        <h2 className={styles.value}>

                            {card.value}

                        </h2>

                        <h3 className={styles.title}>

                            {card.title}

                        </h3>

                        <p className={styles.subtitle}>

                            {card.subtitle}

                        </p>

                    </article>

                ))

            }

        </section>

    );

}

export default OverviewCards;