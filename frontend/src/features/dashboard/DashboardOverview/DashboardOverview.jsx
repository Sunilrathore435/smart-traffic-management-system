import { useEffect, useState } from "react";
import {
    FaCarSide,
    FaTrafficLight,
    FaBrain,
    FaAmbulance
} from "react-icons/fa";

import MetricCard from "../../../components/ui/MetricCard";

import BackendSimulationEngine from "../../traffic/BackendSimulationEngine";

import styles from "./DashboardOverview.module.css";

function DashboardOverview() {

    const [state, setState] = useState(
        BackendSimulationEngine.getState()
    );

    useEffect(() => {

        const listener = (dashboard) => {

            setState(dashboard);

        };

        BackendSimulationEngine.subscribe(listener);

        BackendSimulationEngine.start();

        return () => {

            BackendSimulationEngine.unsubscribe(listener);

        };

    }, []);

    // ==========================================
    // Live Dashboard Data
    // ==========================================

    const totalVehicles =
        state.analytics?.totalVehiclesProcessed ?? 0;

    const activeSignals = 1;

    const currentGreenLane =
        state.signal?.currentGreenLane ?? "-";

    const aiConfidence =
        state.analytics?.prediction?.confidence ?? 99;

    const emergency =
        state.emergency || {
            active: false,
            lane: "NONE"
        };

    const emergencyStatus =
        emergency.active
            ? emergency.lane
            : "OFF";

    return (

        <>

            <section className={styles.grid}>

                <MetricCard
                    title="Total Vehicles"
                    value={totalVehicles}
                    subtitle="Processed Vehicles"
                    icon={<FaCarSide />}
                />

                <MetricCard
                    title="Green Signal"
                    value={currentGreenLane}
                    subtitle={`${activeSignals} Active`}
                    icon={<FaTrafficLight />}
                />

                <MetricCard
                    title="AI Confidence"
                    value={aiConfidence}
                    suffix="%"
                    subtitle="Traffic Optimizer"
                    icon={<FaBrain />}
                />

                <MetricCard
                    title="Emergency"
                    value={emergencyStatus}
                    subtitle="Priority Lane"
                    icon={<FaAmbulance />}
                />

            </section>

            <div className={styles.emergencyPanel}>

                <div className={styles.header}>

                    <div>

                        <h3>

                            🚑 Emergency Controls

                        </h3>

                        <p>

                            Instantly prioritize a junction for emergency vehicles.

                        </p>

                    </div>

                    <span className={styles.status}>

                        {
                            emergency.active

                                ? `ACTIVE • ${emergency.lane}`

                                : "STANDBY"
                        }

                    </span>

                </div>

                <div className={styles.buttons}>

                    <button
                        className={`${styles.laneButton}
                        ${emergency.active && emergency.lane === "NORTH"
                            ? styles.active
                            : ""}`}
                        onClick={() =>
                            BackendSimulationEngine.triggerEmergency("north")
                        }
                    >
                        ⬆ North
                    </button>

                    <button
                        className={`${styles.laneButton}
                        ${emergency.active && emergency.lane === "EAST"
                            ? styles.active
                            : ""}`}
                        onClick={() =>
                            BackendSimulationEngine.triggerEmergency("east")
                        }
                    >
                        ➡ East
                    </button>

                    <button
                        className={`${styles.laneButton}
                        ${emergency.active && emergency.lane === "SOUTH"
                            ? styles.active
                            : ""}`}
                        onClick={() =>
                            BackendSimulationEngine.triggerEmergency("south")
                        }
                    >
                        ⬇ South
                    </button>

                    <button
                        className={`${styles.laneButton}
                        ${emergency.active && emergency.lane === "WEST"
                            ? styles.active
                            : ""}`}
                        onClick={() =>
                            BackendSimulationEngine.triggerEmergency("west")
                        }
                    >
                        ⬅ West
                    </button>

                    <button
                        className={styles.clear}
                        onClick={() =>
                            BackendSimulationEngine.clearEmergency()
                        }
                    >
                        ✕ Clear Priority
                    </button>

                </div>

            </div>

        </>

    );

}

export default DashboardOverview;