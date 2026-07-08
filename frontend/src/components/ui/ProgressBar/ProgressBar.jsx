import AnimatedCounter from "../AnimatedCounter";
import styles from "./ProgressBar.module.css";

function ProgressBar({
                         value = 0,
                         label = "",
                         animated = true,
                         glow = true,
                         showValue = true,
                         className = "",
                     }) {

    const progress = Math.min(Math.max(value, 0), 100);

    return (

        <div className={`${styles.wrapper} ${className}`}>

            <div
                className={styles.track}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >

                <div
                    className={[
                        styles.fill,
                        animated && styles.animated,
                        glow && styles.glow,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    style={{
                        width: `${progress}%`,
                    }}
                />

            </div>

            <div className={styles.info}>

                {label && (
                    <span className={styles.label}>
                        {label}
                    </span>
                )}

                {showValue && (
                    <span className={styles.value}>
                        <AnimatedCounter
                            value={progress}
                            suffix="%"
                            duration={1500}
                        />
                    </span>
                )}

            </div>

        </div>

    );

}

export default ProgressBar;