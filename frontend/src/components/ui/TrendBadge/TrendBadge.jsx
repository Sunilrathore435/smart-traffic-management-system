import { FaArrowTrendUp } from "react-icons/fa6";

import styles from "./TrendBadge.module.css";

function TrendBadge({

                        value = "18%",

                        label = "vs Yesterday",

                        positive = true

                    }) {

    return (

        <div
            className={`${styles.badge} ${positive ? styles.positive : styles.negative}`}
        >

            <div className={styles.top}>

                <FaArrowTrendUp />

                <span>{value}</span>

            </div>

            <span className={styles.label}>

                {label}

            </span>

        </div>

    );

}

export default TrendBadge;