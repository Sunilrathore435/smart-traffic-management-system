import {
    FaBrain,
    FaClock,
    FaCircle
} from "react-icons/fa";

import styles from "./AIFooter.module.css";

function AIFooter() {

    return (

        <footer className={styles.footer}>

            <div className={styles.item}>

                <div className={styles.icon}>
                    <FaBrain />
                </div>

                <div>

                    <p className={styles.label}>
                        AI Model
                    </p>

                    <h4 className={styles.value}>
                        Adaptive Traffic AI v2.4
                    </h4>

                </div>

            </div>

            <div className={styles.divider}></div>

            <div className={styles.item}>

                <div className={styles.icon}>
                    <FaClock />
                </div>

                <div>

                    <p className={styles.label}>
                        Last Updated
                    </p>

                    <h4 className={styles.value}>
                        23:41:12
                    </h4>

                </div>

            </div>

            <div className={styles.divider}></div>

            <div className={styles.item}>

                <div className={styles.icon}>
                    <FaCircle className={styles.live}/>
                </div>

                <div>

                    <p className={styles.label}>
                        Status
                    </p>

                    <h4 className={styles.status}>
                        LIVE
                    </h4>

                </div>

            </div>

        </footer>

    );

}

export default AIFooter;