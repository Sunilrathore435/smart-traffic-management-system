import {
    FaBrain,
    FaCircle
} from "react-icons/fa";

import styles from "./Junction.module.css";

function Junction({

                      currentLane,

                      emergency,

                      ai

                  }) {

    const lane =
        currentLane?.toUpperCase() || "NORTH";

    const active =
        emergency?.active
            ? "EMERGENCY"
            : "AI ACTIVE";

    const status =
        emergency?.active
            ? "PRIORITY"
            : "LIVE";

    return (

        <div className={styles.junction}>

            <div className={styles.outerRing}></div>

            <div className={styles.innerRing}></div>

            <div className={styles.content}>

                <FaBrain className={styles.icon} />

                <h3>

                    {lane}

                </h3>

                <span>

                    {active}

                </span>

                <div className={styles.status}>

                    <FaCircle />

                    <small>

                        {status}

                    </small>

                </div>

            </div>

        </div>

    );

}

export default Junction;