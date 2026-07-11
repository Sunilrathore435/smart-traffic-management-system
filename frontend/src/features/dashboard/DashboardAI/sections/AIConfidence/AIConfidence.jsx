import ProgressBar from "../../../../../components/ui/ProgressBar";

import styles from "./AIConfidence.module.css";

function AIConfidence({

                          value = 98,

                          prediction = 99.3,

                          lastPrediction = "0.8 sec ago"

                      }) {

    const label =
        value >= 95
            ? "Excellent"
            : value >= 85
                ? "Good"
                : value >= 70
                    ? "Average"
                    : "Low";

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>

                AI CONFIDENCE

            </h3>

            <ProgressBar
                value={value}
                label={label}
                animated
                glow
            />

            <div className={styles.metrics}>

                <div className={styles.metric}>

                    <span className={styles.label}>

                        Prediction Accuracy

                    </span>

                    <strong>

                        {prediction}%

                    </strong>

                </div>

                <div className={styles.metric}>

                    <span className={styles.label}>

                        Last Prediction

                    </span>

                    <strong>

                        {lastPrediction}

                    </strong>

                </div>

            </div>

        </section>

    );

}

export default AIConfidence;