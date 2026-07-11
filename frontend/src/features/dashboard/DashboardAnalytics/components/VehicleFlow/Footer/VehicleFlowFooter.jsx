import {
    FaCarSide,
    FaChartLine
} from "react-icons/fa";

import styles from "./VehicleFlowFooter.module.css";

function VehicleFlowFooter({ analytics }) {

    const total =
        analytics?.vehiclesPassed ?? 0;

    const throughput =
        analytics?.throughput ?? 0;

    return (

        <div className={styles.footer}>

            <div className={styles.left}>

                <div className={styles.icon}>
                    <FaCarSide />
                </div>

                <div className={styles.content}>

                    <p className={styles.label}>
                        Vehicles Passed
                    </p>

                    <h2 className={styles.value}>
                        {total}
                    </h2>

                    <span className={styles.unit}>
                        Vehicles
                    </span>

                </div>

            </div>

            <div className={styles.divider}></div>

            <div className={styles.right}>

                <div className={styles.icon}>
                    <FaChartLine />
                </div>

                <div className={styles.content}>

                    <p className={styles.label}>
                        Throughput
                    </p>

                    <h2 className={styles.value}>
                        {throughput}
                    </h2>

                    <span className={styles.unit}>
                        veh/min
                    </span>

                </div>

            </div>

        </div>

    );

}

export default VehicleFlowFooter;