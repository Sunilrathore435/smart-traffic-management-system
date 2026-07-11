import { useEffect, useState } from "react";

import Road from "./Road";
import Junction from "./Junction";
import TrafficSignal from "./TrafficSignal";
import Vehicle from "./Vehicle";
import ZebraCrossing from "./ZebraCrossing";
import LaneArrow from "./LaneArrow";

import { SimulationEngine } from "../traffic";

import styles from "./CityMap.module.css";

function CityMap() {

    const [simulation, setSimulation] = useState({

        signals: {
            north: "green",
            east: "red",
            south: "red",
            west: "red"
        },

        vehicles: []

    });

    useEffect(() => {

        const listener = (state) => {

            setSimulation(state);

        };

        SimulationEngine.subscribe(listener);

        SimulationEngine.start();

        return () => {

            SimulationEngine.unsubscribe(listener);

        };

    }, []);

    return (

        <section className={styles.map}>

            {/* Roads */}

            <Road direction="horizontal" />

            <Road direction="vertical" />

            {/* Lane Direction */}

            <LaneArrow direction="north" />
            <LaneArrow direction="south" />
            <LaneArrow direction="east" />
            <LaneArrow direction="west" />

            {/* Zebra Crossing */}

            <ZebraCrossing position="north" />
            <ZebraCrossing position="south" />
            <ZebraCrossing position="east" />
            <ZebraCrossing position="west" />

            {/* Traffic Signals */}

            {Object.entries(simulation.signals).map(([lane, color]) => (

                <TrafficSignal
                    key={lane}
                    position={lane}
                    color={color}
                />

            ))}

            {/* Vehicles */}

            {simulation.vehicles.map((vehicle) => (

                <Vehicle
                    key={vehicle.id}
                    lane={vehicle.lane}
                    color={vehicle.color}
                    position={vehicle.position}
                    stopped={vehicle.stopped}
                />

            ))}

            {/* Junction */}

            <Junction />

        </section>

    );

}

export default CityMap;