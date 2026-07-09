import styles from "./PeakHourHero.module.css";

function PeakHourHero() {

    return (

        <section className={styles.hero}>

            <h1 className={styles.time}>
                08:30 AM
            </h1>

            <div className={styles.vehicleRow}>

                <span className={styles.count}>
                    356
                </span>

                <span className={styles.unit}>
                    Vehicles
                </span>

            </div>

            <div className={styles.badge}>
                ● BUSY
            </div>

        </section>

    );

}

export default PeakHourHero;