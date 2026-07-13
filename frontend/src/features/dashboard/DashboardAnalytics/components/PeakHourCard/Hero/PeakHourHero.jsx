import styles from "./PeakHourHero.module.css";

function PeakHourHero({

                          analytics,

                          vehicles = []

                      }) {



    const totalVehicles =
        vehicles.length;

    const currentTime =
        new Date().toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        });


    let trafficLevel = "LOW";

    if (totalVehicles >= 30) {

        trafficLevel = "BUSY";

    }
    else if (totalVehicles >= 15) {

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