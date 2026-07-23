import AIJunction from "../Junction";
import AIRecommendation from "../Recommendation";
import AIMetrics from "../Metrics";
import AIConfidence from "../Confidence";

import styles from "./AIContent.module.css";

function AIContent({

                       analytics,
                       ai,
                       emergency,
                       signal,
                       simulation

                   }) {

    return (

        <section className={styles.content}>

            <AIJunction
                analytics={analytics}
                ai={ai}
                emergency={emergency}
                signal={signal}
            />

            <AIRecommendation
                analytics={analytics}
                ai={ai}
                emergency={emergency}
                signal={signal}
                simulation={simulation}
            />

            <AIMetrics
                analytics={analytics}
                ai={ai}
                emergency={emergency}
                signal={signal}
            />

            <AIConfidence
                analytics={analytics}
                ai={ai}
                emergency={emergency}
            />

        </section>

    );

}

export default AIContent;