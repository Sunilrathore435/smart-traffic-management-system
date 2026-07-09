import {
    FaCarSide,
    FaChartLine
} from "react-icons/fa";

import styles from "./VehicleFlowFooter.module.css";

function VehicleFlowFooter() {

    return (

        <div className={styles.footer}>

            {/* Left */}

            <div className={styles.left}>

                <div className={styles.icon}>

                    <FaCarSide />

                </div>

                <div className={styles.content}>

                    <p className={styles.label}>

                        Today's Total

                    </p>

                    <h2 className={styles.value}>

                        481

                    </h2>

                    <span className={styles.unit}>

                        Vehicles

                    </span>

                </div>

            </div>

            {/* Divider */}

            <div className={styles.divider}></div>

            {/* Right */}

            <div className={styles.right}>

                <div className={styles.icon}>

                    <FaChartLine />

                </div>

                <div className={styles.content}>

                    <p className={styles.label}>

                        Daily Average

                    </p>

                    <h2 className={styles.value}>

                        80

                    </h2>

                    <span className={styles.unit}>

                        Vehicles

                    </span>

                </div>

            </div>

        </div>

    );

}

export default VehicleFlowFooter;