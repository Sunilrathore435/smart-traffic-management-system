import {
    FaBrain,
    FaCircle
} from "react-icons/fa";

import styles from "./Junction.module.css";

function Junction() {

    return (

        <div className={styles.junction}>

            <div className={styles.outerRing}></div>

            <div className={styles.innerRing}></div>

            <div className={styles.content}>

                <FaBrain className={styles.icon} />

                <h3>North</h3>

                <span>AI Active</span>

                <div className={styles.status}>

                    <FaCircle />

                    <small>LIVE</small>

                </div>

            </div>

        </div>

    );

}

export default Junction;