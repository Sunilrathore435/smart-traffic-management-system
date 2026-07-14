import PeakHourHeader from "./Header";
import PeakHourHero from "./Hero";
import PeakHourStats from "./Stats";

import styles from "./PeakHourCard.module.css";

function PeakHourCard({

                          analytics,

                          timestamp,

                          emergency

                      }) {

    return (

        <div className={styles.wrapper}>

            <PeakHourHeader

                analytics={analytics}

            />

            <PeakHourHero

                analytics={analytics}

                timestamp={timestamp}

            />

            <PeakHourStats

                analytics={analytics}

            />

        </div>

    );

}

export default PeakHourCard;