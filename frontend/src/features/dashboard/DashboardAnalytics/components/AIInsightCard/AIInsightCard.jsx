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
                           traffic,
                           timestamp

                       }) {

    return (

        <div className={styles.wrapper}>

            <AIInsightHeader
                analytics={analytics}
                simulation={simulation}
                traffic={traffic}
                emergency={emergency}
            />

            <AIContent

                analytics={analytics}

                ai={ai}

                emergency={emergency}

                signal={signal}

                simulation={simulation}

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