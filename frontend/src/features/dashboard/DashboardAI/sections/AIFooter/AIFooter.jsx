import {
    FaBolt,
    FaClock
} from "react-icons/fa";

import StatusPill from "../../../../../components/ui/StatusPill";

import styles from "./AIFooter.module.css";

function AIFooter() {

    return (

        <footer className={styles.footer}>

            <StatusPill
                label="AI ACTIVE"
                status="online"
            />

            <div className={styles.info}>

                <div className={styles.item}>

                    <FaBolt />

                    <span>12 ms</span>

                </div>

                <div className={styles.item}>

                    <FaClock />

                    <span>Just Now</span>

                </div>

            </div>

        </footer>

    );

}

export default AIFooter;