import { FaClock, FaWifi } from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./MapFooter.module.css";

function MapFooter() {

    return (

        <footer className={styles.footer}>

            <StatusPill
                label="CONNECTED"
                status="online"
            />

            <div className={styles.info}>

                <div className={styles.item}>

                    <FaWifi />

                    <span>WebSocket</span>

                </div>

                <div className={styles.item}>

                    <FaClock />

                    <span>Updated Just Now</span>

                </div>

            </div>

        </footer>

    );

}

export default MapFooter;