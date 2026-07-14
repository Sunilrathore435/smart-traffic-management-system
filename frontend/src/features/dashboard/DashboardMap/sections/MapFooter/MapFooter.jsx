import {
    FaClock,
    FaWifi,
    FaSyncAlt
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./MapFooter.module.css";

function MapFooter({

                       simulation

                   }) {

    const connected =
        simulation != null;

    const schedulerRunning =
        simulation?.simulationRunning ?? false;

    const refresh =
        Math.round(
            (simulation?.schedulerIntervalMs ?? 3000) / 1000
        );

    const lastSync =
        schedulerRunning
            ? "Live"
            : "Stopped";

    return (

        <footer className={styles.footer}>

            <div className={styles.left}>

                <StatusPill

                    label={
                        connected
                            ? "CONNECTED"
                            : "DISCONNECTED"
                    }

                    status={
                        connected
                            ? "online"
                            : "offline"
                    }

                />

            </div>

            <div className={styles.info}>

                <div className={styles.item}>

                    <div className={styles.icon}>

                        <FaWifi />

                    </div>

                    <div>

                        <p>Connection</p>

                        <span>

                            {connected
                                ? "Backend API"
                                : "Offline"}

                        </span>

                    </div>

                </div>

                <div className={styles.item}>

                    <div className={styles.icon}>

                        <FaClock />

                    </div>

                    <div>

                        <p>Scheduler</p>

                        <span>

                            {lastSync}

                        </span>

                    </div>

                </div>

                <div className={styles.item}>

                    <div className={styles.icon}>

                        <FaSyncAlt
                            className={
                                schedulerRunning
                                    ? styles.rotate
                                    : ""
                            }
                        />

                    </div>

                    <div>

                        <p>Refresh</p>

                        <span>

                            {refresh} sec

                        </span>

                    </div>

                </div>

            </div>

        </footer>

    );

}

export default MapFooter;