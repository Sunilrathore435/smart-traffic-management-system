import AIInsightHeader from "./Header";
import AIContent from "./Content";
import AIFooter from "./Footer";

import styles from "./AIInsightCard.module.css";

function AIInsightCard({

                           analytics,

                           ai,

                           emergency,

                           signals

                       }) {

    return (

        <div className={styles.wrapper}>

            <AIInsightHeader
                analytics={analytics}
                ai={ai}
                emergency={emergency}
            />

            <AIContent
                analytics={analytics}
                ai={ai}
                emergency={emergency}
                signals={signals}
            />

            <AIFooter
                analytics={analytics}
                ai={ai}
                emergency={emergency}
            />

        </div>

    );

}

export default AIInsightCard;