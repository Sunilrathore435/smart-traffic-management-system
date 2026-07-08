import GlassCard from "../GlassCard";
import styles from "./MetricCard.module.css";

function MetricCard({
                        title,
                        value,
                        subtitle,
                        icon,
                        className = "",
                    }) {
    return (
        <GlassCard className={`${styles.card} ${className}`}>

            <div className={styles.header}>

                <div>

                    <p className={styles.title}>
                        {title}
                    </p>

                    <h2 className={styles.value}>
                        {value}
                    </h2>

                    {subtitle && (
                        <p className={styles.subtitle}>
                            {subtitle}
                        </p>
                    )}

                </div>

                <div className={styles.icon}>
                    {icon}
                </div>

            </div>

        </GlassCard>
    );
}

export default MetricCard;