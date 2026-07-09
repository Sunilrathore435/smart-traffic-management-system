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

    return (

        <GlassCard className={`${styles.card} ${className}`}>

            {/* =========================
                Header
            ========================= */}

            <header className={styles.header}>

                <div className={styles.left}>

                    {icon && (

                        <div className={styles.icon}>

                            {icon}

                        </div>

                    )}

                    <div className={styles.text}>

                        <h3 className={styles.title}>

                            {title}

                        </h3>

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

            {/* =========================
                Divider
            ========================= */}

            <div className={styles.divider}></div>

            {/* =========================
                Content
            ========================= */}

            <div className={styles.content}>

                {children}

            </div>

        </GlassCard>

    );

}

export default AnalyticsCard;