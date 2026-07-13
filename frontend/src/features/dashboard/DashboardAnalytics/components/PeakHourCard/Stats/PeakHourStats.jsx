import {
    FaArrowUp,
    FaCarSide,
    FaClock
} from "react-icons/fa";

import styles from "./PeakHourStats.module.css";

function PeakHourStats({ analytics }) {

    const throughput =
        analytics?.throughput || 0;

    const vehiclesPassed =
        analytics?.vehiclesPassed || 0;

    const congestion =
        analytics?.congestion || 0;

    const averagePeak = Math.round(
        vehiclesPassed * 0.75
    );

    const todayTotal =
        vehiclesPassed;

    const vsAverage = Math.round(
        throughput / 2
    );

    const vsOffPeak = (
        throughput / 20
    ).toFixed(1);

    return (

        <div className={styles.wrapper}>

            {/* Top Stats */}

            <div className={styles.top}>

                <div className={styles.card}>

                    <h3 className={styles.green}>

                        <FaArrowUp />

                        {vsAverage}%

                    </h3>

                    <span>

                        vs Average

                    </span>

                </div>

                <div className={styles.card}>

                    <h3 className={styles.blue}>

                        {vsOffPeak}x

                    </h3>

                    <span>

                        vs Off-Peak

                    </span>

                </div>

            </div>

            {/* Bottom Stats */}

            <div className={styles.bottom}>

                <div className={styles.item}>

                    <FaClock className={styles.icon} />

                    <div>

                        <p>

                            Average Peak

                        </p>

                        <h4>

                            {averagePeak} Vehicles

                        </h4>

                    </div>

                </div>

                <div className={styles.divider}></div>

                <div className={styles.item}>

                    <FaCarSide className={styles.icon} />

                    <div>

                        <p>

                            Today's Total

                        </p>

                        <h4>

                            {todayTotal} Vehicles

                        </h4>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PeakHourStats;