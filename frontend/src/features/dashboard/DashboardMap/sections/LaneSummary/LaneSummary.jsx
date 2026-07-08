import ProgressBar from "../../../../../components/ui/ProgressBar";

import styles from "./LaneSummary.module.css";

function LaneSummary() {

    const lanes = [

        {
            direction: "North Lane",
            vehicles: 62,
            density: 82
        },

        {
            direction: "East Lane",
            vehicles: 38,
            density: 58
        },

        {
            direction: "South Lane",
            vehicles: 44,
            density: 67
        },

        {
            direction: "West Lane",
            vehicles: 21,
            density: 35
        }

    ];

    return (

        <section className={styles.container}>

            <h3 className={styles.heading}>

                TRAFFIC DENSITY

            </h3>

            {

                lanes.map((lane) => (

                    <div
                        key={lane.direction}
                        className={styles.row}
                    >

                        <div className={styles.top}>

                            <span>

                                {lane.direction}

                            </span>

                            <strong>

                                {lane.vehicles} Vehicles

                            </strong>

                        </div>

                        <ProgressBar
                            value={lane.density}
                            animated
                            glow
                            showValue={false}
                        />

                    </div>

                ))

            }

        </section>

    );

}

export default LaneSummary;