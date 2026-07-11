import {
    FaMapMarkedAlt,
    FaEllipsisV
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./MapHeader.module.css";

function MapHeader() {

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.icon}>

                    <FaMapMarkedAlt />

                </div>

                <div>

                    <h2 className={styles.title}>

                        Live Traffic Map

                    </h2>

                    <p className={styles.subtitle}>

                        Real-Time City Monitoring

                    </p>

                </div>

            </div>

            <div className={styles.actions}>

                <StatusPill
                    label="LIVE"
                    status="online"
                />

                <button className={styles.menu}>

                    <FaEllipsisV />

                </button>

            </div>

        </header>

    );

}

export default MapHeader;