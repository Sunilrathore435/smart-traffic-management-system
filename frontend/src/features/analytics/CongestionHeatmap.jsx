import styles from "./CongestionHeatmap.module.css";

function CongestionHeatmap({

                               analytics = {}

                           }) {

    const congestion =

        analytics.laneCongestion ||

        {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

    const lanes = [

        {

            name: "North",

            value: congestion.north

        },

        {

            name: "East",

            value: congestion.east

        },

        {

            name: "South",

            value: congestion.south

        },

        {

            name: "West",

            value: congestion.west

        }

    ];

    return (

        <section className={styles.card}>

            <header className={styles.header}>

                <h2>

                    🚦 Junction Congestion

                </h2>

                <span>

                    LIVE

                </span>

            </header>

            {

                lanes.map(lane => (

                    <div
                        key={lane.name}
                        className={styles.row}
                    >

                        <span className={styles.name}>

                            {lane.name}

                        </span>

                        <div className={styles.bar}>

                            <div

                                className={styles.fill}

                                style={{

                                    width: `${lane.value}%`

                                }}

                            />

                        </div>

                        <strong>

                            {lane.value}%

                        </strong>

                    </div>

                ))

            }

        </section>

    );

}

export default CongestionHeatmap;