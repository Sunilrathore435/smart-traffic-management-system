import { useEffect, useState } from "react";

import {
    FaCar,
    FaTrafficLight,
    FaBrain,
    FaAmbulance
} from "react-icons/fa";

import AnalyticsEngine from "../traffic/AnalyticsEngine";

import styles from "./OverviewCards.module.css";

function OverviewCards() {

    const [stats, setStats] = useState(
        AnalyticsEngine.getStats()
    );

    useEffect(() => {

        const timer = setInterval(() => {

            setStats(
                AnalyticsEngine.getStats()
            );

        }, 500);

        return () => clearInterval(timer);

    }, []);

    const cards = [

        {

            title: "Vehicles Passed",

            value: stats.vehiclesPassed,

            subtitle: "Today",

            icon: <FaCar />

        },

        {

            title: "Congestion",

            value: `${stats.congestion}%`,

            subtitle: "Live Queue",

            icon: <FaTrafficLight />

        },

        {

            title: "AI Efficiency",

            value: `${stats.fuelSaving}%`,

            subtitle: "Optimization",

            icon: <FaBrain />

        },

        {

            title: "Emergencies",

            value: stats.emergencyCount,

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