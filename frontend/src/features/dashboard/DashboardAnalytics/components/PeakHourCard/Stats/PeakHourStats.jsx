import {
    FaArrowUp,
    FaCarSide,
    FaClock
} from "react-icons/fa";

import styles from "./PeakHourStats.module.css";

function PeakHourStats({ analytics }) {

    const throughput =
        analytics?.performance?.throughput ??
        analytics?.throughput ??
        0;

    const totalVehicles =
        analytics?.totalVehiclesProcessed ??
        0;

    const averageVehicles =
        Math.round(
            analytics?.averageVehiclesPassed ?? 0
        );

    const congestion =
        analytics?.congestion ?? 0;

    // =====================================
    // Dashboard Statistics
    // =====================================

    const vsAverage =
        Math.round(
            analytics?.performance?.efficiency ??
            throughput / 2
        );

    const vsOffPeak =
        throughput
            ? (throughput / 20).toFixed(1)
            : "0.0";

    return (

        <div className={styles.wrapper}>

            {/* Top */}

            <div className={styles.top}>

                <div className={styles.card}>

                    <h3 className={styles.green}>

                        <FaArrowUp />

                        {vsAverage}%

                    </h3>

                    <span>

                        Efficiency

                    </span>

                </div>

                <div className={styles.card}>

                    <h3 className={styles.blue}>

                        {vsOffPeak}x

                    </h3>

                    <span>

                        Throughput

                    </span>

                </div>

            </div>

            {/* Bottom */}

            <div className={styles.bottom}>

                <div className={styles.item}>

                    <FaClock className={styles.icon} />

                    <div>

                        <p>

                            Avg Vehicles / Cycle

                        </p>

                        <h4>

                            {averageVehicles}

                        </h4>

                    </div>

                </div>

                <div className={styles.divider}></div>

                <div className={styles.item}>

                    <FaCarSide className={styles.icon} />

                    <div>

                        <p>

                            Total Processed

                        </p>

                        <h4>

                            {totalVehicles}

                        </h4>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PeakHourStats;