import { useEffect, useState } from "react";

import {
    FaCarSide,
    FaTrafficLight,
    FaBrain,
    FaClock,
    FaGaugeHigh,
    FaServer
} from "react-icons/fa6";
import {
    FaHandPaper
} from "react-icons/fa";

import { MdOutlineWarningAmber } from "react-icons/md";
import {
    FaAmbulance,
    FaWalking
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

    /* =======================================================
       Backend State
    ======================================================= */

    const analytics = state.analytics ?? {};

    const signal = state.signal ?? {};

    const simulation = state.simulation ?? {};

    const emergency = state.emergency ?? {

        active: false,

        lane: "NONE"

    };

    /* =======================================================
       KPIs
    ======================================================= */

    const totalVehicles =
        analytics.totalVehiclesProcessed ?? 0;

    const aiConfidence =
        analytics.prediction?.confidence ?? 0;

    const signalPhase =
        simulation.currentSignalPhase ??
        signal.currentSignalPhase ??
        "NONE";

    const signalStage =
        simulation.currentStage ??
        "UNKNOWN";

    const signalStageLabel = {

        VEHICLE_GREEN: "Vehicle Green",

        VEHICLE_YELLOW: "Yellow",

        ALL_RED: "All Red",

        PEDESTRIAN_WALK: "Walk",

        PEDESTRIAN_FLASH: "Flashing",

        UNKNOWN: "Unknown"

    };

    const remainingTime =
        simulation.remainingTime ?? 0;

    const pedestrianSignal =
        simulation.pedestrianSignal ??
        "DONT_WALK";

    const throughput =

        analytics?.performance?.throughput ??

        analytics?.throughput ??

        0;

    const emergencyStatus =
        emergency.active
            ? emergency.lane
            : "NONE";

    const systemHealth =
        analytics.systemHealth ?? {};

    const systemStatus =
        systemHealth.status ?? "OFFLINE";

    const systemUptime =
        systemHealth.uptime ?? 0;

    /* =======================================================
       Pedestrian Label
    ======================================================= */

    const pedestrianState = {

        WALK: {

            label: "WALK",

            icon: <FaWalking />,

            className: styles.walk

        },

        FLASHING_DONT_WALK: {

            label: "DONT_WALK",

            icon: <MdOutlineWarningAmber />,

            className: styles.flashing

        },

        DONT_WALK: {

            label: "STOP",

            icon: <FaHandPaper />,

            className: styles.stop

        }

    }[pedestrianSignal];
    const signalPhaseLabel = {

        NORTH_SOUTH: "N-S",

        EAST_WEST: "E-W",

        ALL_RED: "ALL RED"

    };
    const uptimeText = (() => {

        const hours = systemUptime;

        if (hours >= 24) {

            return `${(hours / 24).toFixed(1)} days`;

        }

        if (hours >= 1) {

            return `${hours.toFixed(1)} hrs`;

        }

        return `${Math.round(hours * 60)} min`;

    })();

    return (

        <>

            {/* ===================================================
                KPI GRID
            ==================================================== */}

            <section className={styles.grid}>

                <MetricCard
                    title="Vehicles"
                    value={totalVehicles}
                    subtitle={`${analytics.totalSimulations ?? 0} Simulations`}
                    icon={<FaCarSide />}
                    status="online"
                />

                <MetricCard
                    title="Signal Phase"
                    value={
                        signalPhaseLabel[signalPhase]
                        ?? signalPhase
                    }
                    subtitle={
                        signalStageLabel[signalStage]
                        ?? signalStage
                    }
                    icon={<FaTrafficLight />}
                    status="online"
                />

                <MetricCard
                    title="AI Confidence"
                    value={aiConfidence}
                    suffix="%"
                    subtitle="Adaptive Optimizer"
                    icon={<FaBrain />}
                    status="online"
                />

                <MetricCard
                    title="Emergency"
                    value={emergencyStatus}
                    subtitle="Priority Lane"
                    icon={<FaAmbulance />}
                    status={
                        emergency.active
                            ? "warning"
                            : "online"
                    }
                />
                <MetricCard
                    title="Pedestrian"
                    subtitle="Crosswalk Signal"
                    icon={<FaWalking />}
                    hideStatus
                    customValue={

                        <div className={pedestrianState.className}>

                            <div className={styles.signalIcon}>
                                {pedestrianState.icon}
                            </div>

                            <div className={styles.signalText}>
                                {pedestrianState.label}
                            </div>

                        </div>

                    }
                />

                <MetricCard
                    title="Countdown"
                    value={remainingTime}
                    suffix="s"
                    subtitle={signalStageLabel[signalStage]}
                    icon={<FaClock />}
                    status="online"
                />

                <MetricCard
                    title="Throughput"
                    value={throughput}
                    subtitle={`Live Flow ${analytics.liveFlow ?? 0}`}
                    icon={<FaGaugeHigh />}
                    status="online"
                />

                <MetricCard
                    title="System"
                    value={systemStatus}
                    subtitle={`Uptime ${uptimeText}`}
                    icon={<FaServer />}
                    status={
                        systemStatus === "ONLINE"
                            ? "online"
                            : systemStatus === "WARNING"
                                ? "warning"
                                : "error"
                    }
                />

            </section>

            {/* ===================================================
                Emergency Command Center
            ==================================================== */}

            <section className={styles.emergencyPanel}>

                <div className={styles.header}>

                    <div>

                        <h2>

                            🚑 Emergency Priority Control

                        </h2>

                        <p>

                            Override the adaptive traffic optimizer and
                            immediately reserve the safest route for
                            emergency responders.

                        </p>

                    </div>

                    <div
                        className={`${styles.badge}
                        ${
                            emergency.active
                                ? styles.activeBadge
                                : styles.idleBadge
                        }`}
                    >

                        {

                            emergency.active

                                ? `ACTIVE • ${emergency.lane}`

                                : "STANDBY"

                        }

                    </div>

                </div>

                <div className={styles.buttons}>

                    <button
                        className={`${styles.laneButton}
                        ${
                            emergency.active &&
                            emergency.lane === "NORTH"
                                ? styles.active
                                : ""
                        }`}
                        onClick={() =>
                            BackendSimulationEngine.triggerEmergency("north")
                        }
                    >
                        ⬆ NORTH
                    </button>

                    <button
                        className={`${styles.laneButton}
                        ${
                            emergency.active &&
                            emergency.lane === "EAST"
                                ? styles.active
                                : ""
                        }`}
                        onClick={() =>
                            BackendSimulationEngine.triggerEmergency("east")
                        }
                    >
                        ➡ EAST
                    </button>

                    <button
                        className={`${styles.laneButton}
                        ${
                            emergency.active &&
                            emergency.lane === "SOUTH"
                                ? styles.active
                                : ""
                        }`}
                        onClick={() =>
                            BackendSimulationEngine.triggerEmergency("south")
                        }
                    >
                        ⬇ SOUTH
                    </button>

                    <button
                        className={`${styles.laneButton}
                        ${
                            emergency.active &&
                            emergency.lane === "WEST"
                                ? styles.active
                                : ""
                        }`}
                        onClick={() =>
                            BackendSimulationEngine.triggerEmergency("west")
                        }
                    >
                        ⬅ WEST
                    </button>

                    <button
                        className={styles.clear}
                        onClick={() =>
                            BackendSimulationEngine.clearEmergency()
                        }
                    >
                        CLEAR PRIORITY
                    </button>

                </div>
                </section>

            <section className={styles.aiAssistant}>

                <div className={styles.aiHeader}>

                    <div>

                        <h2>
                            🧠 AI Crossing Assistant
                        </h2>

                        <p>
                            AI continuously analyzes live traffic, emergency vehicles and signal phases to determine the safest pedestrian crossing opportunity.
                        </p>

                    </div>

                    <div className={styles.aiStatus}>

                        <span className={styles.aiPulse}></span>

                        {

                            simulation.schedulerStatus

                        }

                    </div>

                </div>

                <div className={styles.aiContent}>

                    <div className={styles.aiRobot}>

                        🤖

                    </div>

                    <div className={styles.aiInfo}>

                        <div className={styles.infoCard}>

                            <span>Traffic Load</span>

                            <strong>
                                {
                                            analytics.prediction?.recommendation
                                }
                            </strong>

                        </div>

                        <div className={styles.infoCard}>

                            <span>Emergency</span>

                            <strong>
                                {
                                    emergency.active
                                        ? "ACTIVE"
                                        : "CLEAR"
                                }
                            </strong>

                        </div>

                        <div className={styles.infoCard}>

                            <span>Crossing Status</span>

                            <strong>

                                {

                                    pedestrianSignal === "WALK"
                                        ? "SAFE TO CROSS"

                                        : pedestrianSignal === "FLASHING_DONT_WALK"
                                            ? "CLEAR CROSSWALK"

                                            : simulation.pedestrianWaiting
                                                ? "REQUEST QUEUED"

                                                : "WAITING"
                                }

                            </strong>

                        </div>

                    </div>

                    <button

                        className={styles.requestButton}

                        disabled={simulation.pedestrianWaiting}

                        onClick={() =>
                            BackendSimulationEngine.requestPedestrianCrossing()
                        }

                    >

                        {

                            simulation.pedestrianWaiting

                                ? "✓ REQUEST REGISTERED"

                                : pedestrianSignal === "WALK"

                                    ? "PEDESTRIAN CROSSING ACTIVE"

                                    : "🚶 REQUEST CROSSING"
                        }

                    </button>

                </div>

            </section>

        </>

    );

}


export default DashboardOverview;