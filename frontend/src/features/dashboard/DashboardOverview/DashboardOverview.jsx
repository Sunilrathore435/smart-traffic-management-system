import { useEffect, useState } from "react";
import {
    FaCarSide,
    FaTrafficLight,
    FaBrain,
    FaAmbulance
} from "react-icons/fa";

import MetricCard from "../../../components/ui/MetricCard";

import { SimulationEngine } from "../../traffic";
import EmergencyEngine from "../../traffic/EmergencyEngine";


import styles from "./DashboardOverview.module.css";

function DashboardOverview() {

    const [state, setState] = useState({

        vehicles: [],
        signals: {},
        ai: {}

    });

    const [emergency, setEmergency] = useState(
        EmergencyEngine.getStatus()
    );

    useEffect(() => {

        const listener = (simulation) => {

            setState(simulation);

            setEmergency(
                EmergencyEngine.getStatus()
            );

        };

        SimulationEngine.subscribe(listener);

        SimulationEngine.start();

        return () => {

            SimulationEngine.unsubscribe(listener);

        };

    }, []);

    // ===========================
    // Live Metrics
    // ===========================

    const totalVehicles = state.vehicles.length;

    const activeSignals =
        Object.values(state.signals)
            .filter(signal => signal === "green")
            .length;

    const currentGreenLane =
        Object.keys(state.signals)
            .find(lane => state.signals[lane] === "green") || "-";

    const aiConfidence =
        state.ai?.confidence || 98;

    const emergencyStatus =
        emergency.active
            ? emergency.lane.toUpperCase()
            : "OFF";

    return (

        <>

            <section className={styles.grid}>

                <MetricCard
                    title="Total Vehicles"
                    value={totalVehicles}
                    subtitle="Live Vehicles"
                    icon={<FaCarSide />}
                />

                <MetricCard
                    title="Green Signal"
                    value={currentGreenLane.toUpperCase()}
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

            {emergency.active
                ? `ACTIVE • ${emergency.lane.toUpperCase()}`
                : "STANDBY"}

        </span>

                </div>

                <div className={styles.buttons}>

                    <button
                        className={`${styles.laneButton}
            ${emergency.lane === "north" && emergency.active ? styles.active : ""}`}
                        onClick={() => SimulationEngine.triggerEmergency("north")}
                    >
                        ⬆ North
                    </button>

                    <button
                        className={`${styles.laneButton}
            ${emergency.lane === "east" && emergency.active ? styles.active : ""}`}
                        onClick={() => SimulationEngine.triggerEmergency("east")}
                    >
                        ➡ East
                    </button>

                    <button
                        className={`${styles.laneButton}
            ${emergency.lane === "south" && emergency.active ? styles.active : ""}`}
                        onClick={() => SimulationEngine.triggerEmergency("south")}
                    >
                        ⬇ South
                    </button>

                    <button
                        className={`${styles.laneButton}
            ${emergency.lane === "west" && emergency.active ? styles.active : ""}`}
                        onClick={() => SimulationEngine.triggerEmergency("west")}
                    >
                        ⬅ West
                    </button>

                    <button
                        className={styles.clear}
                        onClick={() => SimulationEngine.clearEmergency()}
                    >
                        ✕ Clear Priority
                    </button>

                </div>

            </div>
        </>

    );

}

export default DashboardOverview;