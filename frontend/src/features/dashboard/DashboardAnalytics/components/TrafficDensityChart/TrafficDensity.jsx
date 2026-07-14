import { useMemo } from "react";

import TrafficDensityHeader from "./Header";
import LaneProgress from "./Lane";
import TrafficDensityFooter from "./Footer";

import styles from "./TrafficDensity.module.css";

const laneColors = {

    north: "#FF9F1C",

    east: "#FFD60A",

    south: "#32D74B",

    west: "#22D3EE"

};

function TrafficDensity({

                            analytics

                        }) {

    const lanes = useMemo(() => {

        const congestion =

            analytics?.laneCongestion ?? {

                north: 0,

                east: 0,

                south: 0,

                west: 0

            };

        const total =

            Object.values(congestion)

                .reduce(

                    (sum, value) => sum + value,

                    0

                );

        return [

            "north",

            "east",

            "south",

            "west"

        ].map(lane => {

            const count =

                congestion[lane] ?? 0;

            const percentage =

                total === 0

                    ? 0

                    : Math.round(

                        (count / total) * 100

                    );

            return {

                lane:

                    `${lane.charAt(0).toUpperCase()}${lane.slice(1)} Lane`,

                percentage,

                vehicles: count,

                color: laneColors[lane]

            };

        });

    }, [analytics]);

    return (

        <div className={styles.wrapper}>

            <TrafficDensityHeader

                analytics={analytics}

            />

            <div className={styles.content}>

                {

                    lanes.map(lane => (

                        <LaneProgress

                            key={lane.lane}

                            lane={lane.lane}

                            percentage={lane.percentage}

                            vehicles={lane.vehicles}

                            color={lane.color}

                        />

                    ))

                }

            </div>

            <TrafficDensityFooter

                analytics={analytics}

            />

        </div>

    );

}

export default TrafficDensity;