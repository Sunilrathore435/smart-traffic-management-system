import styles from "./Vehicle.module.css";

function Vehicle({

                     lane,
                     color,
                     position,
                     stopped = false

                 }) {

    const style = {};

    const start = 12;
    const range = 48;

    switch (lane) {

        case "north":

            style.top = `${start + (position / 180) * range}%`;
            style.left = "50%";
            style.transform = "translateX(-50%) rotate(90deg)";
            break;

        case "south":

            style.bottom = `${start + (position / 180) * range}%`;
            style.left = "50%";
            style.transform = "translateX(-50%) rotate(-90deg)";
            break;

        case "east":

            style.right = `${start + (position / 180) * range}%`;
            style.top = "50%";
            style.transform = "translateY(-50%) rotate(180deg)";
            break;

        case "west":

            style.left = `${start + (position / 180) * range}%`;
            style.top = "50%";
            style.transform = "translateY(-50%)";
            break;

        default:
            break;

    }

    return (

        <div
            className={styles.vehicle}
            style={style}
        >

            <div
                className={`
                    ${styles.car}
                    ${styles[color]}
                    ${stopped ? styles.stopped : ""}
                `}
            >

                <div className={styles.window}></div>

                <div className={styles.headlight}></div>

            </div>

        </div>

    );

}

export default Vehicle;