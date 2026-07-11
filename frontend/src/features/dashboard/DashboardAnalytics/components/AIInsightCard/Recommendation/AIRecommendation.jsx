import { FaTag } from "react-icons/fa";
import styles from "./AIRecommendation.module.css";

function AIRecommendation() {

    return (

        <section className={styles.wrapper}>

            <h2 className={styles.title}>
                North Junction
            </h2>

            <p className={styles.description}>

                AI recommends increasing the{" "}

                <strong>GREEN</strong>{" "}

                signal duration by{" "}

                <span className={styles.seconds}>12 seconds</span>{" "}

                to reduce congestion.

            </p>

            <div className={styles.reasonTag}>

                <FaTag />

                <span>Reason</span>

            </div>

            <p className={styles.reason}>

                High queue length detected on North approach.

            </p>

        </section>

    );

}

export default AIRecommendation;