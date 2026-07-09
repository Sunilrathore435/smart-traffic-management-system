import {
    FaTrafficLight,
    FaEllipsisVertical
} from "react-icons/fa6";

import TrendBadge from "../../../../../../components/ui/TrendBadge";

import styles from "./TrafficDensityHeader.module.css";

function TrafficDensityHeader() {

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.icon}>

                    <FaTrafficLight />

                </div>

                <div className={styles.info}>

                    <h2 className={styles.title}>

                        Traffic Density

                    </h2>

                    <div className={styles.subtitle}>

                        <span>Live Lane Status</span>

                        <span className={styles.dot}></span>

                        <span>Updated Now</span>

                    </div>

                </div>

            </div>

            <div className={styles.actions}>

                <TrendBadge
                    value="64%"
                    label="Avg Density"
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

export default TrafficDensityHeader;