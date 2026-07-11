import styles from "./Road.module.css";

function Road({ direction }) {

    return (

        <div
            className={`${styles.road} ${styles[direction]}`}
        >

            {/* Asphalt Texture */}
            <div className={styles.texture}></div>

            {/* Left Lane */}
            <div className={`${styles.divider} ${styles.first}`}></div>

            {/* Center Divider */}
            <div className={`${styles.divider} ${styles.center}`}></div>

            {/* Right Lane */}
            <div className={`${styles.divider} ${styles.last}`}></div>

        </div>

    );

}

export default Road;