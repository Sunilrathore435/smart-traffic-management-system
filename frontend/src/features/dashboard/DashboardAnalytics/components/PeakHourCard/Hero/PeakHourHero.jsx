import styles from "./PeakHourHero.module.css";

function PeakHourHero({

                          analytics,

                          timestamp

                      }) {

    // =====================================
    // Backend Values
    // =====================================

    const totalVehicles =

        analytics?.totalVehiclesProcessed ?? 0;

    const currentTime = timestamp

        ? new Date(timestamp).toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        })

        : "--:--";

    const congestion =

        analytics?.congestion ?? 0;

    // =====================================
    // Traffic Level
    // =====================================

    let trafficLevel = "LOW";

    if (congestion >= 70) {

        trafficLevel = "BUSY";

    }

    else if (congestion >= 40) {

        trafficLevel = "MODERATE";

    }

    return (

        <section className={styles.hero}>

            <h1 className={styles.time}>

                {currentTime}

            </h1>

            <div className={styles.vehicleRow}>

                <span className={styles.count}>

                    {totalVehicles}

                </span>

                <span className={styles.unit}>

                    Vehicles

                </span>

            </div>

            <div className={styles.badge}>

                ● {trafficLevel}

            </div>

        </section>

    );

}

export default PeakHourHero;