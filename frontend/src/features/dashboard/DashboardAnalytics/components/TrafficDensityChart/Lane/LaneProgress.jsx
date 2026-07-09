import { FaCarSide } from "react-icons/fa";

import styles from "./LaneProgress.module.css";

function LaneProgress({

                          lane,
                          percentage,
                          vehicles,
                          color,

                      }) {

    return (

        <div className={styles.row}>

            <div className={styles.left}>

                <FaCarSide className={styles.icon} />

                <span className={styles.lane}>

                    {lane}

                </span>

            </div>

            <div className={styles.center}>

                <div className={styles.track}>

                    <div
                        className={styles.fill}
                        style={{
                            width: `${percentage}%`,
                            background: color,
                        }}
                    />

                </div>

            </div>

            <div className={styles.right}>

                <span
                    className={styles.percent}
                    style={{ color }}
                >
                    {percentage}%
                </span>

                <span className={styles.vehicles}>

                    {vehicles} Vehicles

                </span>

            </div>

        </div>

    );

}

export default LaneProgress;