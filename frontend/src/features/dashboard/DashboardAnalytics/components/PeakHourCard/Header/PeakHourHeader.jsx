import {
    FaClock,
    FaEllipsisV
} from "react-icons/fa";

import styles from "./PeakHourHeader.module.css";

function PeakHourHeader() {

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.icon}>
                    <FaClock />
                </div>

                <div>

                    <h2 className={styles.title}>
                        Peak Hour
                    </h2>

                    <div className={styles.subtitle}>

                        Today's Peak Traffic

                        <span className={styles.dot}></span>

                    </div>

                </div>

            </div>

            <button className={styles.menu}>
                <FaEllipsisV />
            </button>

        </header>

    );

}

export default PeakHourHeader;