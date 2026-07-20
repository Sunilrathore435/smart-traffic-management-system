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
                     ai,
                     simulation

                 }) {

    // ==========================================
    // Backend Phase
    // ==========================================

    const phase =
        simulation?.currentSignalPhase ?? "NORTH_SOUTH";

    const stage =
        simulation?.currentStage ?? "VEHICLE_GREEN";

    // ==========================================
    // Signal Colours
    // ==========================================

    const signals = {

        north: "red",
        south: "red",
        east: "red",
        west: "red"

    };

    if (
        stage === "ALL_RED" ||
        stage === "PEDESTRIAN_WALK"
    ) {

        // All signals remain RED

    }
    else if (stage === "VEHICLE_YELLOW") {

        if (phase === "NORTH_SOUTH") {

            signals.north = "yellow";
            signals.south = "yellow";

        } else {

            signals.east = "yellow";
            signals.west = "yellow";

        }

    }
    else if (stage === "VEHICLE_GREEN") {

        if (phase === "NORTH_SOUTH") {

            signals.north = "green";
            signals.south = "green";

        } else {

            signals.east = "green";
            signals.west = "green";

        }

    }

    // ==========================================
    // Placeholder Vehicles
    // ==========================================

    const vehicles = simulation?.vehicles ?? [];

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
                        emergency?.lane?.toLowerCase() === lane
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

                    emergency={vehicle.emergency}

                />

            ))}

            {/* AI Junction */}

            <Junction

                simulation={simulation}

                emergency={emergency}

                ai={ai}

            />

        </section>

    );

}

export default CityMap;