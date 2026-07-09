import {
    FaArrowUp,
    FaCarSide,
    FaClock
} from "react-icons/fa";

import styles from "./PeakHourStats.module.css";

function PeakHourStats() {

    return (

        <div className={styles.wrapper}>

            {/* Top Stats */}

            <div className={styles.top}>

                <div className={styles.card}>

                    <h3 className={styles.green}>
                        <FaArrowUp />
                        18%
                    </h3>

                    <span>vs Average</span>

                </div>

                <div className={styles.card}>

                    <h3 className={styles.blue}>
                        1.8x
                    </h3>

                    <span>vs Off-Peak</span>

                </div>

            </div>

            {/* Bottom Stats */}

            <div className={styles.bottom}>

                <div className={styles.item}>

                    <FaClock className={styles.icon} />

                    <div>

                        <p>Average Peak</p>

                        <h4>301 Vehicles</h4>

                    </div>

                </div>

                <div className={styles.divider}></div>

                <div className={styles.item}>

                    <FaCarSide className={styles.icon} />

                    <div>

                        <p>Today's Total</p>

                        <h4>481 Vehicles</h4>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PeakHourStats;