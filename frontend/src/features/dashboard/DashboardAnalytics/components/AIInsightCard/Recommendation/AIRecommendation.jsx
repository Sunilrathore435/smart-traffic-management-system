import { FaTag } from "react-icons/fa";

import styles from "./AIRecommendation.module.css";

function AIRecommendation({

                              analytics,

                              ai,

                              emergency

                          }) {

    const prediction =
        analytics?.prediction || {};

    const ranking =
        analytics?.ranking || [];

    // =====================================
    // Active Lane
    // =====================================

    const activeLane =

        emergency?.active

            ? emergency.lane

            : ai?.lane ||

            ranking[0]?.name ||

            "north";

    // =====================================
    // Green Time
    // =====================================

    const greenTime =

        ai?.greenTime ||

        analytics?.averageGreenTime ||

        8;

    // =====================================
    // Recommendation
    // =====================================

    const recommendation =

        emergency?.active

            ? "Emergency Override Active"

            : prediction.recommendation ||

            "Traffic Flow Normal";

    // =====================================
    // Congestion
    // =====================================

    const congestion =
        analytics?.congestion || 0;

    // =====================================
    // Reason
    // =====================================

    let reason = "";

    if (emergency?.active) {

        reason =
            `Emergency vehicle detected on ${activeLane.toUpperCase()} lane. AI immediately granted highest priority.`;

    }

    else if (congestion >= 70) {

        reason =
            `Heavy congestion detected on ${activeLane.toUpperCase()} lane. AI recommends extending the green signal.`;

    }

    else if (congestion >= 40) {

        reason =
            `Moderate traffic detected on ${activeLane.toUpperCase()} lane. AI is monitoring queue growth.`;

    }

    else {

        reason =
            "Traffic is flowing normally across all junctions.";

    }

    return (

        <section className={styles.wrapper}>

            <h2 className={styles.title}>

                {activeLane.toUpperCase()} Junction

            </h2>

            <p className={styles.description}>

                AI recommends{" "}

                <strong>

                    {recommendation}

                </strong>{" "}

                with a green signal duration of{" "}

                <span className={styles.seconds}>

                    {greenTime} sec

                </span>

                .

            </p>

            <div className={styles.reasonTag}>

                <FaTag />

                <span>

                    Reason

                </span>

            </div>

            <p className={styles.reason}>

                {reason}

            </p>

        </section>

    );

}

export default AIRecommendation;