import styles from "./StatusPill.module.css";

function StatusPill({

                        label,

                        children,

                        status = "online",

                        pulse = true,

                        className = ""

                    }) {

    const text = label ?? children;

    // Fallback if an unknown status is passed
    const variant = styles[status] ? status : "online";

    return (

        <div
            className={[
                styles.pill,
                styles[variant],
                pulse && styles.pulse,
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >

            <span className={styles.dot}></span>

            <span className={styles.label}>
                {text}
            </span>

        </div>

    );

}

export default StatusPill;