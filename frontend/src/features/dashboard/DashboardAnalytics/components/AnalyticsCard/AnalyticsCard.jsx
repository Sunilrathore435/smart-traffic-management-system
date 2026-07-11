import GlassCard from "../../../../../components/ui/GlassCard";
import styles from "./AnalyticsCard.module.css";

function AnalyticsCard({

                           title,
                           subtitle = "",
                           icon = null,
                           action = null,
                           children,
                           className = "",

                       }) {

    const hasHeader = title || subtitle || icon || action;

    return (

        <GlassCard className={`${styles.card} ${className}`}>

            {hasHeader && (
                <>
                    <header className={styles.header}>

                        <div className={styles.left}>

                            {icon && (
                                <div className={styles.icon}>
                                    {icon}
                                </div>
                            )}

                            <div className={styles.text}>

                                {title && (
                                    <h3 className={styles.title}>
                                        {title}
                                    </h3>
                                )}

                                {subtitle && (
                                    <p className={styles.subtitle}>
                                        {subtitle}
                                    </p>
                                )}

                            </div>

                        </div>

                        {action && (
                            <div className={styles.action}>
                                {action}
                            </div>
                        )}

                    </header>

                    <div className={styles.divider}></div>
                </>
            )}

            <div className={styles.content}>
                {children}
            </div>

        </GlassCard>

    );

}

export default AnalyticsCard;