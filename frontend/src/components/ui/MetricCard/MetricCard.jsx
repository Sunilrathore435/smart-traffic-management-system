import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaCircle
} from "react-icons/fa6";

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

                        // New Props
                        trend = null,
                        trendLabel = "",
                        status = "online",
                        hideStatus = false,
                        customValue = null

                    }) {

    const trendIcon =
        trend > 0
            ? <FaArrowTrendUp />
            : trend < 0
                ? <FaArrowTrendDown />
                : null;

    return (

        <GlassCard className={`${styles.card} ${className}`}>

            {/* Live Status */}

            {
                !hideStatus && (

                    <div className={styles.status}>

                        <FaCircle className={styles[status]} />

                        <span>
                {status.toUpperCase()}
            </span>

                    </div>

                )
            }

            <div className={styles.header}>

                <div className={styles.left}>

                    <p className={styles.title}>

                        {title}

                    </p>

                    <h2 className={styles.value}>

                        {

                            customValue ??

                            (

                                typeof value === "number"

                                    ?

                                    <AnimatedCounter

                                        value={value}

                                        prefix={prefix}

                                        suffix={suffix}

                                        duration={duration}

                                    />

                                    :

                                    <>

                                        {prefix}

                                        {value}

                                        {suffix}

                                    </>

                            )

                        }

                    </h2>

                    {

                        subtitle &&

                        <p className={styles.subtitle}>

                            {subtitle}

                        </p>

                    }

                    {

                        trend !== null &&

                        <div className={styles.trend}>

                            {trendIcon}

                            <span>

                                {Math.abs(trend)}%

                            </span>

                            {

                                trendLabel &&

                                <small>

                                    {trendLabel}

                                </small>

                            }

                        </div>

                    }

                </div>

                <div className={styles.icon}>

                    {icon}

                </div>

            </div>

        </GlassCard>

    );

}

export default MetricCard;