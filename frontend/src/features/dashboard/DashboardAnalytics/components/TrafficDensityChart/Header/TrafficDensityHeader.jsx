import {
    FaTrafficLight,
    FaEllipsisVertical
} from "react-icons/fa6";

import TrendBadge from "../../../../../../components/ui/TrendBadge";

import styles from "./TrafficDensityHeader.module.css";

function TrafficDensityHeader({

                                  analytics

                              }) {

    const congestion =

        analytics?.laneCongestion ||

        {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

    const values = Object.values(congestion);

    const averageDensity = values.length

        ? Math.round(

            values.reduce(

                (sum, value) => sum + value,

                0

            ) / values.length

        )

        : 0;

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

                    value={`${averageDensity}%`}

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