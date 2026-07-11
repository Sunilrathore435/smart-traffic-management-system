import styles from "./SliderControl.module.css";

function SliderControl({

                           label,

                           value,

                           min,

                           max,

                           step = 1,

                           unit = "",

                           onChange

                       }) {

    return (

        <div className={styles.container}>

            <div className={styles.header}>

                <div>

                    <h4>

                        {label}

                    </h4>

                    <span>

                        Adjustable Parameter

                    </span>

                </div>

                <div className={styles.value}>

                    {value}{unit}

                </div>

            </div>

            <input

                type="range"

                min={min}

                max={max}

                step={step}

                value={value}

                onChange={(event)=>

                    onChange(

                        Number(event.target.value)

                    )

                }

            />

            <div className={styles.labels}>

                <small>

                    {min}{unit}

                </small>

                <small>

                    {max}{unit}

                </small>

            </div>

        </div>

    );

}

export default SliderControl;