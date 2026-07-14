import {
    FaDatabase,
    FaBrain,
    FaTrafficLight,
    FaAmbulance
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AISystemStatus.module.css";

function AISystemStatus({

                            vehicles = 0,

                            currentLane = "-",

                            emergency = false,

                            aiStatus = "ACTIVE",

                            recommendation = "Traffic Flow Normal"

                        }) {

    const systems = [

        {
            icon: <FaDatabase />,
            title: "Queue Analysis",
            value: `${vehicles} Vehicles`,
            status: "online",
            label: "LIVE"
        },

        {
            icon: <FaBrain />,
            title: "AI Recommendation",
            value: recommendation,
            status: "online",
            label: "AI"
        },

        {
            icon: <FaTrafficLight />,
            title: "Green Signal",
            value: currentLane.toUpperCase(),
            status: emergency ? "warning" : "online",
            label: aiStatus
        },

        {
            icon: <FaAmbulance />,
            title: "Emergency Monitor",
            value: emergency
                ? "Priority Enabled"
                : "No Emergency",
            status: emergency
                ? "warning"
                : "online",
            label: emergency
                ? "ACTIVE"
                : "READY"
        }

    ];

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>

                SYSTEM STATUS

            </h3>

            <div className={styles.list}>

                {systems.map(item => (

                    <div
                        key={item.title}
                        className={styles.row}
                    >

                        <div className={styles.left}>

                            <span className={styles.icon}>

                                {item.icon}

                            </span>

                            <div>

                                <strong>

                                    {item.title}

                                </strong>

                                <p className={styles.value}>

                                    {item.value}

                                </p>

                            </div>

                        </div>

                        <StatusPill
                            label={item.label}
                            status={item.status}
                        />

                    </div>

                ))}

            </div>

        </section>

    );

}

export default AISystemStatus;