import {
    FaGear,
    FaCircleCheck,
    FaServer,
    FaDatabase,
    FaMicrochip
} from "react-icons/fa6";

import styles from "./SettingsHeader.module.css";

function SettingsHeader() {

    return (

        <header className={styles.header}>

            <div className={styles.left}>

                <div className={styles.icon}>

                    <FaGear />

                </div>

                <div>

                    <h1>

                        System Configuration

                    </h1>

                    <p>

                        Manage AI, simulation, emergency controls and analytics settings.

                    </p>

                </div>

            </div>

            <div className={styles.badges}>

                <div className={styles.badge}>

                    <FaServer />

                    Frontend Ready

                </div>

                <div className={styles.badge}>

                    <FaDatabase />

                    MongoDB

                </div>

                <div className={styles.badge}>

                    <FaMicrochip />

                    Version 2.4.0

                </div>

                <div className={`${styles.badge} ${styles.online}`}>

                    <FaCircleCheck />

                    Online

                </div>

            </div>

        </header>

    );

}

export default SettingsHeader;