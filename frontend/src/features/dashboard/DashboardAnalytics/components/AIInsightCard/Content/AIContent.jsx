import AIJunction from "../Junction";
import AIRecommendation from "../Recommendation";
import AIMetrics from "../Metrics";
import AIConfidence from "../Confidence";

import styles from "./AIContent.module.css";

function AIContent() {

    return (

        <section className={styles.content}>

            <AIJunction />

            <AIRecommendation />

            <AIMetrics />

            <AIConfidence />

        </section>

    );

}

export default AIContent;