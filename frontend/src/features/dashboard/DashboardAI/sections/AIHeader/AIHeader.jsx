import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AIHeader.module.css";

function AIHeader() {

    return (

        <header className={styles.header}>

            <div>

                <h2 className={styles.title}>

                    🤖 TRAFIQ AI

                </h2>

                <p className={styles.subtitle}>

                    Real-Time Traffic Intelligence Engine

                </p>

            </div>

            <div className={styles.statusGroup}>

                <StatusPill
                    label="ONLINE"
                    status="online"
                />

                <span className={styles.version}>
                    v2.4.0
                </span>

            </div>

        </header>

    );

}

export default AIHeader;