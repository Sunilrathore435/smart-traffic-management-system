import {
    FaCircle
} from "react-icons/fa";

import styles from "./TrafficSignal.module.css";

function TrafficSignal({

                           position,
                           color = "red"

                       }) {

    return (

        <div
            className={`${styles.signal} ${styles[position]}`}
        >

            {/* Pole */}

            <div className={styles.pole}></div>

            {/* Signal Box */}

            <div className={styles.body}>

                <FaCircle
                    className={`${styles.light}
                    ${color === "red"
                        ? styles.activeRed
                        : ""}`}
                />

                <FaCircle
                    className={`${styles.light}
                    ${color === "yellow"
                        ? styles.activeYellow
                        : ""}`}
                />

                <FaCircle
                    className={`${styles.light}
                    ${color === "green"
                        ? styles.activeGreen
                        : ""}`}
                />

            </div>

        </div>

    );

}

export default TrafficSignal;