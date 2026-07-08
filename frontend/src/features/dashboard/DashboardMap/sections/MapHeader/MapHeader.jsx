import { FaMapMarkedAlt } from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./MapHeader.module.css";

function MapHeader() {

    return (

        <header className={styles.header}>

            <div>

                <h2 className={styles.title}>

                    <FaMapMarkedAlt />

                    Live Traffic Map

                </h2>

                <p className={styles.subtitle}>

                    Real-Time City Monitoring

                </p>

            </div>

            <StatusPill
                label="LIVE"
                status="online"
            />

        </header>

    );

}

export default MapHeader;