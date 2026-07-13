import styles from "./TrafficDensityFooter.module.css";

function TrafficDensityFooter({

                                  analytics,

                                  vehicles = []

                              }) {

    const congestion =

        analytics?.laneCongestion ||

        {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

    const averageDensity = Math.round(

        Object.values(congestion)

            .reduce(

                (sum, value) => sum + value,

                0

            ) /

        Object.keys(congestion).length

    );

    return (

        <footer className={styles.footer}>

            <div className={styles.left}>

                <p className={styles.label}>

                    Total Vehicles

                </p>

                <h3 className={styles.value}>

                    {vehicles.length}

                </h3>

            </div>

            <div className={styles.divider}></div>

            <div className={styles.right}>

                <p className={styles.label}>

                    Average Density

                </p>

                <h3 className={styles.value}>

                    {averageDensity}%

                </h3>

            </div>

        </footer>

    );

}

export default TrafficDensityFooter;