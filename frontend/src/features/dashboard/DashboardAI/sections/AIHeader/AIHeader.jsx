import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AIHeader.module.css";

function AIHeader({

                      status = "online",

                      version = "v2.4.0",

                      mode = "Adaptive AI"

                  }) {

    return (

        <header className={styles.header}>

            <div>

                <h2 className={styles.title}>

                    🤖 TRAFIQ AI

                </h2>

                <p className={styles.subtitle}>

                    Real-Time Traffic Intelligence Engine

                </p>

                <small className={styles.mode}>

                    {mode}

                </small>

            </div>

            <div className={styles.statusGroup}>

                <StatusPill
                    label={status.toUpperCase()}
                    status={status}
                />

                <span className={styles.version}>

                    {version}

                </span>

            </div>

        </header>

    );

}

export default AIHeader;