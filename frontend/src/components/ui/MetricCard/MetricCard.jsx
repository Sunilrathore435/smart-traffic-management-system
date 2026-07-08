import AnimatedCounter from "../AnimatedCounter/AnimatedCounter";
import GlassCard from "../GlassCard";

import styles from "./MetricCard.module.css";

function MetricCard({
                        title,
                        value,
                        subtitle,
                        icon,
                        prefix = "",
                        suffix = "",
                        duration = 1200,
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
                        {typeof value === "number" ? (
                            <AnimatedCounter
                                value={value}
                                prefix={prefix}
                                suffix={suffix}
                                duration={duration}
                            />
                        ) : (
                            <>
                                {prefix}
                                {value}
                                {suffix}
                            </>
                        )}
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