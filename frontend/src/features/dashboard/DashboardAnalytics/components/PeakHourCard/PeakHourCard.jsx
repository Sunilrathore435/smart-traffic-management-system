import PeakHourHeader from "./Header";


import styles from "./PeakHourCard.module.css";
import PeakHourHero from "./Hero/index.js";
import PeakHourStats from "./Stats/index.js";

function PeakHourCard() {

    return (

        <div className={styles.wrapper}>

            <PeakHourHeader />
           <PeakHourHero />
            <PeakHourStats />
        </div>

    );

}

export default PeakHourCard;