import {
    FaRotateLeft,
    FaDownload,
    FaUpload,
    FaFloppyDisk,
    FaCircleInfo
} from "react-icons/fa6";

import SettingsEngine from "./SettingsEngine";

import styles from "./ActionButtons.module.css";

function ActionButtons({

                           onSave,

                           onReset

                       }) {

    const exportSettings = () => {

        const blob = new Blob(

            [

                JSON.stringify(
                    SettingsEngine.getSettings(),
                    null,
                    2
                )

            ],

            {

                type: "application/json"

            }

        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "traffic-settings.json";

        link.click();

        URL.revokeObjectURL(url);

    };

    const importSettings = () => {

        alert(
            "Import feature coming soon."
        );

    };

    return (

        <section className={styles.card}>

            <div className={styles.info}>

                <FaCircleInfo />

                <div>

                    <h3>

                        Configuration Center

                    </h3>

                    <p>

                        Save, restore or export your current traffic management configuration.

                    </p>

                </div>

            </div>

            <div className={styles.buttons}>

                <button

                    className={styles.secondary}

                    onClick={onReset}

                >

                    <FaRotateLeft />

                    Reset

                </button>

                <button

                    className={styles.secondary}

                    onClick={exportSettings}

                >

                    <FaDownload />

                    Export

                </button>

                <button

                    className={styles.secondary}

                    onClick={importSettings}

                >

                    <FaUpload />

                    Import

                </button>

                <button

                    className={styles.primary}

                    onClick={onSave}

                >

                    <FaFloppyDisk />

                    Save Configuration

                </button>

            </div>

        </section>

    );

}

export default ActionButtons;