import TrafficDensityHeader from "./Header";
import LaneProgress from "./Lane";
import TrafficDensityFooter from "./Footer";

import styles from "./TrafficDensity.module.css";

const lanes = [

    {
        lane: "North Lane",
        percentage: 82,
        vehicles: 54,
        color: "#FF9F1C",
    },

    {
        lane: "East Lane",
        percentage: 63,
        vehicles: 41,
        color: "#FFD60A",
    },

    {
        lane: "South Lane",
        percentage: 74,
        vehicles: 48,
        color: "#32D74B",
    },

    {
        lane: "West Lane",
        percentage: 38,
        vehicles: 23,
        color: "#22D3EE",
    },

];

function TrafficDensity() {

    return (

        <div className={styles.wrapper}>

            <TrafficDensityHeader />

            <div className={styles.content}>

                {lanes.map((lane) => (

                    <LaneProgress
                        key={lane.lane}
                        lane={lane.lane}
                        percentage={lane.percentage}
                        vehicles={lane.vehicles}
                        color={lane.color}
                    />

                ))}

            </div>

            <TrafficDensityFooter />

        </div>

    );

}

export default TrafficDensity;