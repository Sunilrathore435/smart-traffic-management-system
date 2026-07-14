import {
    FaList,
    FaAmbulance,
    FaTrafficLight,
    FaCar
} from "react-icons/fa";

import styles from "./StatisticsBar.module.css";

function StatisticsBar({ events = [] }) {

    const stats = {

        total: events.length,

        emergencies: events.filter(
            event => event.emergencyTriggered
        ).length,

        simulations: events.filter(
            event => !event.emergencyTriggered
        ).length,

        vehiclesPassed: events.reduce(
            (total, event) =>
                total + (event.vehiclesPassed || 0),
            0
        )

    };

    const cards = [

        {

            title: "Total Simulations",

            value: stats.total,

            icon: <FaList />

        },

        {

            title: "Emergency Events",

            value: stats.emergencies,

            icon: <FaAmbulance />

        },

        {

            title: "Normal Simulations",

            value: stats.simulations,

            icon: <FaTrafficLight />

        },

        {

            title: "Vehicles Passed",

            value: stats.vehiclesPassed,

            icon: <FaCar />

        }

    ];

    return (

        <section className={styles.grid}>

            {

                cards.map(card => (

                    <div
                        key={card.title}
                        className={styles.card}
                    >

                        <div className={styles.icon}>

                            {card.icon}

                        </div>

                        <h2>

                            {card.value}

                        </h2>

                        <span>

                            {card.title}

                        </span>

                    </div>

                ))

            }

        </section>

    );

}

export default StatisticsBar;