import {
    FaList,
    FaAmbulance,
    FaServer,
    FaChartLine
} from "react-icons/fa";

import styles from "./StatisticsBar.module.css";

function StatisticsBar({ events }) {

    const stats = {

        total: events.length,

        emergency: events.filter(

            event =>
                (event.category || event.type) === "EMERGENCY"

        ).length,

        system: events.filter(

            event =>
                (event.category || event.type) === "SYSTEM"

        ).length,

        analytics: events.filter(

            event =>
                (event.category || event.type) === "ANALYTICS"

        ).length

    };

    const cards = [

        {

            title: "Total Events",

            value: stats.total,

            icon: <FaList />

        },

        {

            title: "Emergencies",

            value: stats.emergency,

            icon: <FaAmbulance />

        },

        {

            title: "System Events",

            value: stats.system,

            icon: <FaServer />

        },

        {

            title: "Analytics",

            value: stats.analytics,

            icon: <FaChartLine />

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