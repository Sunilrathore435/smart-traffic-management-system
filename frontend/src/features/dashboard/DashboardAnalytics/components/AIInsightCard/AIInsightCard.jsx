import AIInsightHeader from "./Header";


import styles from "./AIInsightCard.module.css";

import AIFooter from "./Footer";
import AIContent from "./Content";

function AIInsightCard() {
    return (

        <div className={styles.wrapper}>

            <AIInsightHeader />

            <AIContent />

            <AIFooter />

        </div>

    );

}


export default AIInsightCard;