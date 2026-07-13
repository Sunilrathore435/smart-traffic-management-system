import styles from "./AIConfidence.module.css";

function AIConfidence({

                          analytics,

                          ai,

                          emergency

                      }) {

    const percentage =

        emergency?.active

            ? 100

            : ai?.confidence ||

            analytics?.prediction?.confidence ||

            0;

    let status = "Low";

    if (emergency?.active) {

        status = "Emergency Override";

    }

    else if (percentage >= 95) {

        status = "Excellent";

    }

    else if (percentage >= 85) {

        status = "Very High";

    }

    else if (percentage >= 70) {

        status = "High";

    }

    else if (percentage >= 50) {

        status = "Moderate";

    }

    const radius = 52;

    const circumference = 2 * Math.PI * radius;

    const offset =

        circumference -

        (circumference * percentage) / 100;

    return (

        <div className={styles.wrapper}>

            <div className={styles.circle}>

                <svg viewBox="0 0 120 120">

                    <circle

                        className={styles.bg}

                        cx="60"

                        cy="60"

                        r={radius}

                    />

                    <circle

                        className={styles.progress}

                        cx="60"

                        cy="60"

                        r={radius}

                        style={{

                            strokeDasharray: circumference,

                            strokeDashoffset: offset

                        }}

                    />

                </svg>

                <div className={styles.center}>

                    <h2>

                        {percentage}%

                    </h2>

                    <span>

                        AI Confidence

                    </span>

                    <small>

                        {status}

                    </small>

                </div>

            </div>

        </div>

    );

}

export default AIConfidence;