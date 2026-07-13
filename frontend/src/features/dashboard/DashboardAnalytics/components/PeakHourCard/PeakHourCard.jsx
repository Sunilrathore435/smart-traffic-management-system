import PeakHourHeader from "./Header";
import PeakHourHero from "./Hero";
import PeakHourStats from "./Stats";

import styles from "./PeakHourCard.module.css";

function PeakHourCard({

                          analytics,

                          ai,

                          emergency,

                          vehicles

                      }) {

    return (

        <div className={styles.wrapper}>

            <PeakHourHeader

                analytics={analytics}

            />

            <PeakHourHero

                analytics={analytics}

                ai={ai}

                emergency={emergency}

                vehicles={vehicles}


            />

            <PeakHourStats

                analytics={analytics}

            />

        </div>

    );

}

export default PeakHourCard;