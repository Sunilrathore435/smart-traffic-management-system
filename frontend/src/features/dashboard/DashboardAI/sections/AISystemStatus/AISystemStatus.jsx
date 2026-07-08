import {
    FaDatabase,
    FaChartLine,
    FaTrafficLight,
    FaAmbulance
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AISystemStatus.module.css";

function AISystemStatus() {

    const systems = [

        {
            icon: <FaDatabase />,
            title: "Queue Analysis",
            status: "COMPLETE"
        },

        {
            icon: <FaChartLine />,
            title: "Density Prediction",
            status: "COMPLETE"
        },

        {
            icon: <FaTrafficLight />,
            title: "Signal Optimizer",
            status: "ACTIVE"
        },

        {
            icon: <FaAmbulance />,
            title: "Emergency Monitor",
            status: "READY"
        }

    ];

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>
                SYSTEM STATUS
            </h3>

            <div className={styles.list}>

                {systems.map((item) => (

                    <div
                        key={item.title}
                        className={styles.row}
                    >

                        <div className={styles.left}>

                            <span className={styles.icon}>
                                {item.icon}
                            </span>

                            <span>
                                {item.title}
                            </span>

                        </div>

                        <StatusPill
                            label={item.status}
                            status="online"
                        />

                    </div>

                ))}

            </div>

        </section>

    );

}

export default AISystemStatus;