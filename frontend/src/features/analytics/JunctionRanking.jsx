import styles from "./JunctionRanking.module.css";

function JunctionRanking({

                             analytics = {}

                         }) {

    const junctions = analytics.ranking || [];

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

                                        width: `${item.congestion}%`

                                    }}

                                />

                            </div>

                        </div>

                        <strong>

                            {item.congestion}%

                        </strong>

                    </div>

                ))

            }

        </section>

    );

}

export default JunctionRanking;