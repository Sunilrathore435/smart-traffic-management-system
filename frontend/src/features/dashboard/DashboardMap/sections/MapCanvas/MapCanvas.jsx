import { FaSatelliteDish } from "react-icons/fa";
import ProgressBar from "../../../../../components/ui/ProgressBar";

import styles from "./MapCanvas.module.css";

function MapCanvas({

                       loading = 82,

                       title = "Waiting for Live Traffic Feed",

                       description = "Synchronizing with Smart Traffic Network...",

                       progressLabel = "Initializing City Sensors"

                   }) {

    return (

        <section className={styles.canvas}>

            <div className={styles.radar}>

                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>

                <div className={styles.icon}>
                    <FaSatelliteDish />
                </div>

            </div>

            <h3 className={styles.title}>
                {title}
            </h3>

            <p className={styles.description}>
                {description}
            </p>

            <div className={styles.progress}>

                <ProgressBar
                    value={loading}
                    label={progressLabel}
                    animated
                    glow
                />

                <span className={styles.percent}>
                    {loading}%
                </span>

            </div>

        </section>

    );

}

export default MapCanvas;