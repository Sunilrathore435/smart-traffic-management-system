import { FaCircle } from "react-icons/fa";

import styles from "./CongestionHeatmap.module.css";

function CongestionHeatmap({

                               analytics = {}

                           }) {

    const congestion = analytics.laneCongestion ?? {

        north: 0,
        east: 0,
        south: 0,
        west: 0

    };

    const getStatus = (value) => {

        if (value >= 80) {

            return {
                text: "Critical",
                badge: styles.criticalBadge,
                fill: styles.criticalFill
            };

        }

        if (value >= 60) {

            return {
                text: "Heavy",
                badge: styles.highBadge,
                fill: styles.highFill
            };

        }

        if (value >= 35) {

            return {
                text: "Moderate",
                badge: styles.mediumBadge,
                fill: styles.mediumFill
            };

        }

        return {

            text: "Low",
            badge: styles.lowBadge,
            fill: styles.lowFill

        };

    };

    const lanes = [

        { name: "North", value: congestion.north },
        { name: "East", value: congestion.east },
        { name: "South", value: congestion.south },
        { name: "West", value: congestion.west }

    ];

    return (

        <section className={styles.card}>

            <header className={styles.header}>

                <div>

                    <h2>🚦 Junction Congestion</h2>

                    <p>Live lane utilization</p>

                </div>

                <span className={styles.live}>

                    <FaCircle />

                    LIVE

                </span>

            </header>

            {

                lanes.map(lane => {

                    const status = getStatus(lane.value);

                    return (

                        <div
                            key={lane.name}
                            className={styles.row}
                        >

                            <div className={styles.top}>

                                <span className={styles.name}>

                                    {lane.name}

                                </span>

                                <span className={`${styles.status} ${status.badge}`}>

                                    {status.text}

                                </span>

                            </div>

                            <div className={styles.progress}>

                                <div
                                    className={`${styles.fill} ${status.fill}`}
                                    style={{
                                        width: `${lane.value}%`
                                    }}
                                />

                            </div>

                            <div className={styles.bottom}>

                                <small>

                                    Congestion

                                </small>

                                <strong>

                                    {lane.value}%

                                </strong>

                            </div>

                        </div>

                    );

                })

            }

        </section>

    );

}

export default CongestionHeatmap;