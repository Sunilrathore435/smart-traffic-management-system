import {
    FaChartBar,
    FaBolt,
    FaClock
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AnalyticsHeader.module.css";

function AnalyticsHeader() {

    return (

        <div className={styles.header}>

            <div>

                <div className={styles.title}>

                    <FaChartBar />

                    <h2>Traffic Analytics</h2>

                </div>

                <p className={styles.subtitle}>

                    Real-Time City Intelligence

                </p>

            </div>

            <div className={styles.actions}>

                <StatusPill
                    label="LIVE"
                    status="online"
                />

                <div className={styles.meta}>

                    <FaBolt />

                    <span>12 ms</span>

                </div>

                <div className={styles.meta}>

                    <FaClock />

                    <span>Just Now</span>

                </div>

            </div>

        </div>

    );

}

export default AnalyticsHeader;