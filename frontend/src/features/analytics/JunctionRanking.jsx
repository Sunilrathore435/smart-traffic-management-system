import { useEffect, useState } from "react";

import AnalyticsEngine from "../traffic/AnalyticsEngine";

import styles from "./JunctionRanking.module.css";

function JunctionRanking() {

    const [junctions, setJunctions] = useState([]);

    useEffect(() => {

        const update = () => {

            setJunctions(
                AnalyticsEngine.getRanking()
            );

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

                    🏆 Junction Performance

                </h2>

                <span>

                    Live Ranking

                </span>

            </header>

            {

                junctions.map((item, index) => (

                    <div
                        key={item.name}
                        className={styles.row}
                    >

                        <div className={styles.rank}>

                            #{index + 1}

                        </div>

                        <div className={styles.info}>

                            <p>

                                {item.name.toUpperCase()}

                            </p>

                            <div className={styles.bar}>

                                <div

                                    className={styles.fill}

                                    style={{

                                        width: `${item.score}%`

                                    }}

                                />

                            </div>

                        </div>

                        <strong>

                            {item.score}%

                        </strong>

                    </div>

                ))

            }

        </section>

    );

}

export default JunctionRanking;