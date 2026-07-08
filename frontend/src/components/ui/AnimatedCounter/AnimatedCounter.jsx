import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedCounter.module.css";

function AnimatedCounter({
                             value = 0,
                             duration = 1200,
                             prefix = "",
                             suffix = "",
                         }) {

    const [count, setCount] = useState(0);
    const frame = useRef();

    useEffect(() => {

        let startTime = null;

        function animate(timestamp) {

            if (!startTime) {
                startTime = timestamp;
            }

            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

            // Ease-out animation
            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(eased * value));

            if (progress < 1) {
                frame.current = requestAnimationFrame(animate);
            }

        }

        frame.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frame.current);

    }, [value, duration]);

    return (
        <span className={styles.counter}>
            {prefix}
            {count}
            {suffix}
        </span>
    );
}

export default AnimatedCounter;