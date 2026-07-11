import {
    FaClock,
    FaWifi,
    FaSyncAlt
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./MapFooter.module.css";

function MapFooter() {

    return (

        <footer className={styles.footer}>

            <div className={styles.left}>

                <StatusPill
                    label="CONNECTED"
                    status="online"
                />

            </div>

            <div className={styles.info}>

                <div className={styles.item}>

                    <div className={styles.icon}>
                        <FaWifi />
                    </div>

                    <div>

                        <p>Connection</p>

                        <span>WebSocket</span>

                    </div>

                </div>

                <div className={styles.item}>

                    <div className={styles.icon}>
                        <FaClock />
                    </div>

                    <div>

                        <p>Last Sync</p>

                        <span>Just Now</span>

                    </div>

                </div>

                <div className={styles.item}>

                    <div className={styles.icon}>
                        <FaSyncAlt className={styles.rotate}/>
                    </div>

                    <div>

                        <p>Refresh</p>

                        <span>1 sec</span>

                    </div>

                </div>

            </div>

        </footer>

    );

}

export default MapFooter;