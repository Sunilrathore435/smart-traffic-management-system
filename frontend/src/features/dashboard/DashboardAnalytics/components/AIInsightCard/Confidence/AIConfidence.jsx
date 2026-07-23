import {
    FaBrain,
    FaCircleCheck,
    FaGaugeHigh
} from "react-icons/fa6";

import styles from "./AIConfidence.module.css";

function AIConfidence({

                          analytics,
                          emergency

                      }) {

    const prediction = analytics?.prediction ?? {};

    const performance = analytics?.performance ?? {};

    const percentage = emergency?.active

        ? 100

        : Math.round(prediction.confidence ?? 0);

    const recommendation =

        prediction.recommendation ??

        "Traffic Stable";

    const efficiency =

        performance.efficiency ??

        0;

    let status = "Low";

    if (emergency?.active)

        status = "Emergency Override";

    else if (percentage >= 95)

        status = "Excellent";

    else if (percentage >= 85)

        status = "Very High";

    else if (percentage >= 70)

        status = "High";

    else if (percentage >= 50)

        status = "Moderate";

    return (

        <section className={styles.wrapper}>

            <div className={styles.header}>

                <h3>

                    AI Confidence

                </h3>

                <span>

                    Live Prediction

                </span>

            </div>

            <div className={styles.card}>

                <div className={styles.top}>

                    <div className={styles.icon}>

                        <FaBrain/>

                    </div>

                    <div className={styles.info}>

                        <h4>

                            Neural Prediction

                        </h4>

                        <small>

                            {recommendation}

                        </small>

                    </div>

                    <div className={styles.percent}>

                        {percentage}%

                    </div>

                </div>

                <div className={styles.progress}>

                    <div

                        className={styles.fill}

                        style={{

                            width:`${percentage}%`

                        }}

                    />

                </div>

                <div className={styles.metrics}>

                    <div>

                        <small>

                            Status

                        </small>

                        <strong>

                            <FaCircleCheck/>

                            {status}

                        </strong>

                    </div>

                    <div>

                        <small>

                            Efficiency

                        </small>

                        <strong>

                            <FaGaugeHigh/>

                            {efficiency}%

                        </strong>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AIConfidence;