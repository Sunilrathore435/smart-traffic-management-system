import styles from "./GlassCard.module.css";

function GlassCard({
                       children,
                       className = "",
                   }) {
    return (
        <div className={`${styles.card} ${className}`}>
            {children}
        </div>
    );
}

export default GlassCard;