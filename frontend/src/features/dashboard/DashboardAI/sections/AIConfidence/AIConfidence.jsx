import ProgressBar from "../../../../../components/ui/ProgressBar";

import styles from "./AIConfidence.module.css";

function AIConfidence({

                          value = 0,

                          prediction = 0,

                          lastPrediction = "--:--:--"

                      }) {
    const confidence = Math.max(0, Math.min(100, value));

    const label =
        confidence >= 95
            ? "Excellent"
            : confidence >= 85
                ? "Good"
                : confidence >= 70
                    ? "Average"
                    : "Low";

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>

                AI CONFIDENCE

            </h3>

            <ProgressBar
                value={confidence}
                label={label}
                animated
                glow
            />

            <div className={styles.metrics}>

                <div className={styles.metric}>

                    <span className={styles.label}>

                        Prediction Accuracy

                    </span>

                    <strong>{confidence}%</strong>

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