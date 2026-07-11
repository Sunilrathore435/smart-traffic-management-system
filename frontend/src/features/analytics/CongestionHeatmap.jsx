import { useEffect, useState } from "react";

import AnalyticsEngine from "../traffic/AnalyticsEngine";

import styles from "./CongestionHeatmap.module.css";

function CongestionHeatmap() {

    const [lanes, setLanes] = useState([]);

    useEffect(() => {

        const update = () => {

            const congestion =
                AnalyticsEngine.getLaneCongestion();

            const data = [

                {
                    name: "North",
                    value: congestion.north
                },

                {
                    name: "East",
                    value: congestion.east
                },

                {
                    name: "South",
                    value: congestion.south
                },

                {
                    name: "West",
                    value: congestion.west
                }

            ];

            setLanes(data);

        };

        AnalyticsEngine.subscribe(update);

        update();

        return () => {

            AnalyticsEngine.unsubscribe(update);

        };

    }, []);

    return (

        <section className={styles.card}>

            <header className={styles.header}>

                <h2>

                    🚦 Junction Congestion

                </h2>

                <span>

                    Live

                </span>

            </header>

            {

                lanes.map(lane => (

                    <div
                        key={lane.name}
                        className={styles.row}
                    >

                        <span className={styles.name}>

                            {lane.name}

                        </span>

                        <div className={styles.bar}>

                            <div

                                className={styles.fill}

                                style={{

                                    width: `${lane.value}%`

                                }}

                            />

                        </div>

                        <strong>

                            {lane.value}%

                        </strong>

                    </div>

                ))

            }

        </section>

    );

}

export default CongestionHeatmap;