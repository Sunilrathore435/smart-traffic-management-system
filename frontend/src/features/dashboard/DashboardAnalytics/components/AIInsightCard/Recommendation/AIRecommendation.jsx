import { FaTag } from "react-icons/fa";

import styles from "./AIRecommendation.module.css";

function AIRecommendation({

                              analytics,

                              ai,

                              emergency

                          }) {

    // =====================================
    // Active Lane
    // =====================================

    const activeLane =

        emergency?.active

            ? emergency.lane

            : ai?.selectedLane ||

            analytics?.busiestLane ||

            "NORTH";

    // =====================================
    // Green Time
    // =====================================

    const greenTime =

        ai?.greenTime ??

        Math.round(analytics?.averageGreenTime ?? 10);

    // =====================================
    // Recommendation
    // =====================================

    const recommendation =

        emergency?.active

            ? "Emergency Override Active"

            : ai?.reason ||

            analytics?.prediction?.recommendation ||

            "Traffic Flow Normal";

    // =====================================
    // Reason
    // =====================================

    const reason =

        emergency?.active

            ? `Emergency vehicle detected on ${activeLane}. AI has overridden normal optimization.`

            : ai?.reason ||

            "Traffic optimization running normally.";

    return (

        <section className={styles.wrapper}>

            <h2 className={styles.title}>

                {activeLane} Junction

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