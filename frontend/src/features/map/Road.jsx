import styles from "./Road.module.css";

function Road({ direction }) {

    return (

        <div
            className={`${styles.road} ${styles[direction]}`}
        >

            {/* Asphalt Texture */}
            <div className={styles.texture}></div>

            {/* Road Highlight */}
            <div className={styles.highlight}></div>

            {/* Lane Dividers */}
            <div className={`${styles.divider} ${styles.first}`}></div>
            <div className={`${styles.divider} ${styles.center}`}></div>
            <div className={`${styles.divider} ${styles.last}`}></div>

            {/* Stop Line */}
            <div className={styles.stopLine}></div>

        </div>

    );

}

export default Road;