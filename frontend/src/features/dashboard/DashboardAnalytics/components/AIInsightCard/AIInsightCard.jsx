import AIInsightHeader from "./Header";
import AIContent from "./Content";
import AIFooter from "./Footer";

import styles from "./AIInsightCard.module.css";

function AIInsightCard({

                           analytics,

                           ai,

                           emergency,

                           signal,

                           simulation,

                           timestamp

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

                signal={signal}

            />

            <AIFooter

                simulation={simulation}

                emergency={emergency}

                timestamp={timestamp}

            />

        </div>

    );

}

export default AIInsightCard;