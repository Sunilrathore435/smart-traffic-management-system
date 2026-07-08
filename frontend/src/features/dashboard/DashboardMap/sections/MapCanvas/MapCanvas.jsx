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

            <div className={styles.icon}>
                <FaSatelliteDish />
            </div>

            <h3>{title}</h3>

            <p>{description}</p>

            <ProgressBar
                value={loading}
                label={progressLabel}
                animated
                glow
            />

        </section>

    );

}

export default MapCanvas;