import AIJunction from "../Junction";
import AIRecommendation from "../Recommendation";
import AIMetrics from "../Metrics";
import AIConfidence from "../Confidence";

import styles from "./AIContent.module.css";

function AIContent({

                       analytics,

                       ai,

                       emergency,

                       signal

                   }) {

    return (

        <section className={styles.content}>

            <AIJunction
                analytics={analytics}
                ai={ai}
                emergency={emergency}
            />

            <AIRecommendation
                analytics={analytics}
                ai={ai}
                emergency={emergency}
            />

            <AIMetrics
                analytics={analytics}
                ai={ai}
                emergency={emergency}
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