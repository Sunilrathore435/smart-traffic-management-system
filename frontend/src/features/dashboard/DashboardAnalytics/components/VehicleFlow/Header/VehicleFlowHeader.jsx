import {
    FaChartLine,
    FaEllipsisVertical,
} from "react-icons/fa6";

import TrendBadge from "../../../../../../components/ui/TrendBadge";

import styles from "./VehicleFlowHeader.module.css";

function VehicleFlowHeader() {

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

                        <span>Last 6 Days</span>

                        <span className={styles.dot}></span>

                        <span>Live</span>

                    </div>

                </div>

            </div>

            <div className={styles.actions}>

                <TrendBadge
                    value="18%"
                    label="vs Yesterday"
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