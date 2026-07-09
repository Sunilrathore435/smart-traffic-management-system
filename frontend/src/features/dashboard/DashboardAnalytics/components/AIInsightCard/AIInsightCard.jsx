import { FaBrain } from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AIInsightCard.module.css";

function AIInsightCard() {

    return (

        <div className={styles.wrapper}>

            <div className={styles.icon}>

                <FaBrain />

            </div>

            <StatusPill
                label="HIGH PRIORITY"
                status="warning"
            />

            <div className={styles.content}>

                <h4>North Junction</h4>

                <p>

                    AI recommends increasing the GREEN signal duration
                    by <strong>12 seconds</strong> to reduce congestion.

                </p>

            </div>

            <div className={styles.footer}>

                Expected Queue Reduction

                <span>32%</span>

            </div>

        </div>

    );

}

export default AIInsightCard;