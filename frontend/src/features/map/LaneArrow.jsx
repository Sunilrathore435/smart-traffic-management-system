import {
    FaArrowUp,
    FaArrowDown,
    FaArrowLeft,
    FaArrowRight
} from "react-icons/fa";

import styles from "./LaneArrow.module.css";

function LaneArrow({ direction }) {

    const icons = {
        north: <FaArrowUp />,
        south: <FaArrowDown />,
        east: <FaArrowRight />,
        west: <FaArrowLeft />
    };

    return (

        <div className={`${styles.arrow} ${styles[direction]}`}>

            {icons[direction]}

        </div>

    );

}

export default LaneArrow;