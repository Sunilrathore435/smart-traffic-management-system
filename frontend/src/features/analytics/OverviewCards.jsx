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
            subtitle: "Today",
            icon: <FaCar />
        },

        {
            title: "Congestion",
            value: `${analytics.congestion ?? 0}%`,
            subtitle: "Live Queue",
            icon: <FaTrafficLight />
        },

        {
            title: "AI Efficiency",
            value: `${analytics.fuelSaving ?? 0}%`,
            subtitle: "Optimization",
            icon: <FaBrain />
        },

        {
            title: "Emergencies",
            value: analytics.emergencyVehiclesHandled ?? 0,
            subtitle: "Handled",
            icon: <FaAmbulance />
        }

    ];

    return (

        <section className={styles.grid}>

            {

                cards.map(card => (

                    <article
                        key={card.title}
                        className={styles.card}
                    >

                        <div className={styles.icon}>

                            {card.icon}

                        </div>

                        <div className={styles.info}>

                            <h2>

                                {card.value}

                            </h2>

                            <span className={styles.title}>

                                {card.title}

                            </span>

                            <small className={styles.subtitle}>

                                {card.subtitle}

                            </small>

                        </div>

                    </article>

                ))

            }

        </section>

    );

}

export default OverviewCards;