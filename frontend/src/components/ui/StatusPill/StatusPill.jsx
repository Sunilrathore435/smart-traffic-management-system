import styles from "./StatusPill.module.css";

function StatusPill({
                        label,
                        status = "online",
                        className = "",
                        ...props
                    }) {

    return (
        <div
            className={`${styles.pill} ${styles[status]} ${className}`}
            {...props}
        >

            <span className={styles.dot}></span>

            <span>{label}</span>

        </div>
    );

}

export default StatusPill;