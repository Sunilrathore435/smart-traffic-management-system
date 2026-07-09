import styles from "./TrafficDensityFooter.module.css";

function TrafficDensityFooter() {

    return (

        <footer className={styles.footer}>

            <div className={styles.left}>

                <p className={styles.label}>
                    Total Vehicles
                </p>

                <h3 className={styles.value}>
                    166
                </h3>

            </div>

            <div className={styles.divider}></div>

            <div className={styles.right}>

                <p className={styles.label}>
                    Average Density
                </p>

                <h3 className={styles.value}>
                    64%
                </h3>

            </div>

        </footer>

    );

}

export default TrafficDensityFooter;