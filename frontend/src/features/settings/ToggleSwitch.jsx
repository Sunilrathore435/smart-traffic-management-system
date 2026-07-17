import styles from "./ToggleSwitch.module.css";

function ToggleSwitch({

                          label,

                          description,

                          checked,

                          onChange,

                          disabled = false

                      }) {

    return (

        <div className={styles.container}>

            <div className={styles.left}>

                <h4>{label}</h4>

                {

                    description &&

                    <p>{description}</p>

                }

            </div>

            <div className={styles.right}>

                <span
                    className={`${styles.status} ${
                        checked
                            ? styles.enabled
                            : styles.disabled
                    }`}
                >

                    {checked
                        ? "Enabled"
                        : "Disabled"}

                </span>

                <button

                    type="button"

                    role="switch"

                    aria-checked={checked}

                    aria-label={label}

                    disabled={disabled}

                    onClick={() => {

                        if (!disabled) {

                            onChange(!checked);

                        }

                    }}

                    className={`${styles.switch} ${
                        checked
                            ? styles.active
                            : ""
                    } ${
                        disabled
                            ? styles.inactive
                            : ""
                    }`}

                >

                    <span />

                </button>

            </div>

        </div>

    );

}

export default ToggleSwitch;