import styles from "./ZebraCrossing.module.css";

function ZebraCrossing({ position }) {

    return (

        <div className={`${styles.crossing} ${styles[position]}`}>

            {Array.from({ length: 6 }).map((_, index) => (

                <span key={index}></span>

            ))}

        </div>

    );

}

export default ZebraCrossing;