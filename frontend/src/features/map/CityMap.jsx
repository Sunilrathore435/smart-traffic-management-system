import Road from "./Road";
import Junction from "./Junction";
import TrafficSignal from "./TrafficSignal";
import Vehicle from "./Vehicle";
import ZebraCrossing from "./ZebraCrossing";
import LaneArrow from "./LaneArrow";

import styles from "./CityMap.module.css";

function CityMap({

                     signal,

                     emergency,

                     ai

                 }) {

    // ==========================================
    // Backend Signal State
    // ==========================================

    const currentGreen =

        signal?.currentGreenLane?.toLowerCase() ||

        "north";

    const signals = {

        north: currentGreen === "north" ? "green" : "red",

        south: currentGreen === "south" ? "green" : "red",

        east: currentGreen === "east" ? "green" : "red",

        west: currentGreen === "west" ? "green" : "red"

    };

    // ==========================================
    // Vehicles
    // (Later these will come from WebSocket)
    // ==========================================

    const vehicles = [];

    return (

        <section className={styles.map}>

            {/* Roads */}

            <Road direction="horizontal" />

            <Road direction="vertical" />

            {/* Lane Arrows */}

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

            {Object.entries(signals).map(([lane, color]) => (

                <TrafficSignal

                    key={lane}

                    position={lane}

                    color={color}

                    emergency={
                        emergency?.active &&
                        emergency.lane.toLowerCase() === lane
                    }

                />

            ))}

            {/* Vehicles */}

            {vehicles.map(vehicle => (

                <Vehicle

                    key={vehicle.id}

                    lane={vehicle.lane}

                    color={vehicle.color}

                    position={vehicle.position}

                    stopped={vehicle.stopped}

                />

            ))}

            {/* AI Junction */}

            <Junction

                currentLane={currentGreen}

                emergency={emergency}

                ai={ai}

            />

        </section>

    );

}

export default CityMap;