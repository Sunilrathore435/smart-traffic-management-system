import styles from "./AIConfidence.module.css";

function AIConfidence() {

    const percentage = 98;

    return (

        <div className={styles.wrapper}>

            <div className={styles.circle}>

                <svg viewBox="0 0 120 120">

                    <circle
                        className={styles.bg}
                        cx="60"
                        cy="60"
                        r="52"
                    />

                    <circle
                        className={styles.progress}
                        cx="60"
                        cy="60"
                        r="52"
                        style={{
                            strokeDasharray: 327,
                            strokeDashoffset: 327 - (327 * percentage) / 100
                        }}
                    />

                </svg>

                <div className={styles.center}>

                    <h2>{percentage}%</h2>

                    <span>AI Confidence</span>

                    <small>Very High</small>

                </div>

            </div>

        </div>

    );

}

export default AIConfidence;