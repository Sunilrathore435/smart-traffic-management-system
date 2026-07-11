import { useEffect, useState } from "react";

import {

    FaBrain,
    FaAmbulance,
    FaChartLine
} from "react-icons/fa";


import SettingsEngine from "./SettingsEngine";

import styles from "./SettingsOverviewCards.module.css";
import {FaGear} from "react-icons/fa6";

function SettingsOverviewCards() {

    const [settings, setSettings] = useState(

        SettingsEngine.getSettings()

    );

    useEffect(() => {

        const listener = (config) => {

            setSettings(config);

        };

        SettingsEngine.subscribe(listener);

        return () => {

            SettingsEngine.unsubscribe(listener);

        };

    }, []);

    const cards = [

        {

            title: "Simulation",

            value: settings.autoSimulation
                ? "Running"
                : "Stopped",

            subtitle: `${settings.vehicleSpawnRate} Vehicles/sec`,

            icon: <FaGear />

        },

        {

            title: "AI Engine",

            value: settings.adaptiveAI
                ? "Enabled"
                : "Disabled",

            subtitle: `${settings.minGreenTime}-${settings.maxGreenTime}s`,

            icon: <FaBrain />

        },

        {

            title: "Emergency",

            value: settings.emergencyPriority
                ? "Enabled"
                : "Disabled",

            subtitle: `${settings.emergencyDuration}s Priority`,

            icon: <FaAmbulance />

        },

        {

            title: "Analytics",

            value: `${settings.refreshRate} ms`,

            subtitle: `${settings.historyLimit} Events`,

            icon: <FaChartLine />

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

                        <div>

                            <h2>

                                {card.value}

                            </h2>

                            <h4>

                                {card.title}

                            </h4>

                            <p>

                                {card.subtitle}

                            </p>

                        </div>

                    </article>

                ))

            }

        </section>

    );

}

export default SettingsOverviewCards;