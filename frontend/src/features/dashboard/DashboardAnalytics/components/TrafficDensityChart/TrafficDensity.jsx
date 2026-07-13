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

                            analytics,

                            vehicles = []

                        }) {

    const lanes = useMemo(() => {

        const congestion =

            analytics?.laneCongestion ||

            {

                north: 0,

                east: 0,

                south: 0,

                west: 0

            };

        const totalVehicles =

            Math.max(

                vehicles.length,

                1

            );

        return [

            "north",

            "east",

            "south",

            "west"

        ].map(lane => {

            const vehicleCount =

                vehicles.filter(

                    vehicle =>

                        vehicle.lane === lane

                ).length;

            const percentage = Math.round(

                (

                    congestion[lane] /

                    totalVehicles

                ) * 100

            );

            return {

                lane:

                    `${lane.charAt(0).toUpperCase()}${lane.slice(1)} Lane`,

                percentage,

                vehicles: vehicleCount,

                color: laneColors[lane]

            };

        });

    }, [

        analytics,

        vehicles

    ]);

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

                vehicles={vehicles}

            />

        </div>

    );

}

export default TrafficDensity;