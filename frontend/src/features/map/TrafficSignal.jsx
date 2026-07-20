import { FaCircle } from "react-icons/fa";

import styles from "./TrafficSignal.module.css";

function TrafficSignal({

                           position,

                           color = "red",

                           emergency = false

                       }) {

    const redClass =
        color === "red"
            ? styles.activeRed
            : "";

    const yellowClass =
        color === "yellow"
            ? styles.activeYellow
            : "";

    const greenClass =
        color === "green"
            ? styles.activeGreen
            : "";

    return (

        <div
            className={`${styles.signal} ${styles[position]}`}
            aria-label={`${position} traffic signal`}
        >

            {/* Pole */}

            <div className={styles.pole}></div>

            {/* Signal Housing */}

            <div
                className={`
                    ${styles.body}
                    ${emergency ? styles.emergency : ""}
                `}
            >

                <FaCircle
                    className={`${styles.light} ${redClass}`}
                />

                <FaCircle
                    className={`${styles.light} ${yellowClass}`}
                />

                <FaCircle
                    className={`${styles.light} ${greenClass}`}
                />

            </div>

        </div>

    );

}

export default TrafficSignal;