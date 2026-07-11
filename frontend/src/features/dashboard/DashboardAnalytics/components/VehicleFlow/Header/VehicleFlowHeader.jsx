import {
    FaChartLine,
    FaEllipsisVertical,
} from "react-icons/fa6";

import TrendBadge from "../../../../../../components/ui/TrendBadge";

import styles from "./VehicleFlowHeader.module.css";

function VehicleFlowHeader({ analytics }) {

    const throughput =
        analytics?.throughput ?? 0;

    const flowPercentage =
        analytics?.flowPercentage ?? 0;

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.icon}>
                    <FaChartLine />
                </div>

                <div className={styles.info}>

                    <h2 className={styles.title}>
                        Vehicle Flow
                    </h2>

                    <div className={styles.subtitle}>

                        <span>Real-Time</span>

                        <span className={styles.dot}></span>

                        <span>Live Analytics</span>

                    </div>

                </div>

            </div>

            <div className={styles.actions}>

                <TrendBadge
                    value={`↗ ${flowPercentage}%`}
                    label={`${throughput} veh/min`}
                />

                <button
                    className={styles.menu}
                    aria-label="More"
                >
                    <FaEllipsisVertical />
                </button>

            </div>

        </header>

    );

}

export default VehicleFlowHeader;