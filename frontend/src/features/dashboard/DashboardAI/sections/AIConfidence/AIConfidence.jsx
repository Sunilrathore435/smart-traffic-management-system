import ProgressBar from "../../../../../components/ui/ProgressBar";

import styles from "./AIConfidence.module.css";

function AIConfidence() {

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>

                AI CONFIDENCE

            </h3>

            <ProgressBar
                value={98}
                label="Excellent"
                animated
                glow
            />

            <div className={styles.metrics}>

                <div className={styles.metric}>

                    <span className={styles.label}>

                        Prediction Accuracy

                    </span>

                    <strong>

                        99.3%

                    </strong>

                </div>

                <div className={styles.metric}>

                    <span className={styles.label}>

                        Last Prediction

                    </span>

                    <strong>

                        0.8 sec ago

                    </strong>

                </div>

            </div>

        </section>

    );

}

export default AIConfidence;