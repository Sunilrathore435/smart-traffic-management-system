import {
    FaClock,
    FaEllipsisV
} from "react-icons/fa";

import styles from "./PeakHourHeader.module.css";

function PeakHourHeader({

                            analytics

                        }) {

    const laneCongestion = analytics?.laneCongestion ?? {};

    const values = Object.values(laneCongestion);

    const avgQueue = values.length

        ? Math.round(

            values.reduce(

                (sum, value) => sum + value,

                0

            ) / values.length

        )

        : 0;

    let status = "Low Traffic";

    let statusClass = styles.low;

    if (avgQueue >= 6) {

        status = "Peak Traffic";

        statusClass = styles.high;

    }

    else if (avgQueue >= 3) {

        status = "Moderate Traffic";

        statusClass = styles.medium;

    }

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.icon}>

                    <FaClock />

                </div>

                <div>

                    <h2 className={styles.title}>

                        Peak Hour

                    </h2>

                    <div className={`${styles.subtitle} ${statusClass}`}>

                        <span>

                            {status}

                        </span>

                        <span className={styles.dot}></span>

                        <span>

                            Live

                        </span>

                    </div>

                </div>

            </div>

            <button
                className={styles.menu}
                aria-label="More"
            >

                <FaEllipsisV />

            </button>

        </header>

    );

}

export default PeakHourHeader;