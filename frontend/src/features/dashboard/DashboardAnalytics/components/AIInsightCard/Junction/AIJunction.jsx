import styles from "./AIJunction.module.css";

function AIJunction() {

    return (

        <div className={styles.wrapper}>

            <div className={styles.priority}>

                ● HIGH PRIORITY

            </div>

            <div className={styles.map}>

                <div className={styles.vertical}></div>

                <div className={styles.horizontal}></div>

                <div className={styles.center}></div>

                <span className={`${styles.car} ${styles.top}`}></span>

                <span className={`${styles.car} ${styles.bottom}`}></span>

                <span className={`${styles.car} ${styles.left}`}></span>

                <span className={`${styles.car} ${styles.right}`}></span>

            </div>

        </div>

    );

}

export default AIJunction;