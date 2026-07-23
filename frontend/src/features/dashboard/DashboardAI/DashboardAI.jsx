import { useEffect, useState } from "react";

import GlassCard from "../../../components/ui/GlassCard";

import AIHeader from "./sections/AIHeader";
import AISystemStatus from "./sections/AISystemStatus";
import AIDecision from "./sections/AIDecision";
import AIConfidence from "./sections/AIConfidence";
import AIRecommendation from "./sections/AIRecommendation";
import AIFooter from "./sections/AIFooter";

import BackendSimulationEngine from "../../traffic/BackendSimulationEngine";
import SettingsEngine from "../../settings/SettingsEngine";

import styles from "./DashboardAI.module.css";

function DashboardAI() {

    const [dashboard, setDashboard] = useState(
        BackendSimulationEngine.getState()
    );

    useEffect(() => {

        const listener = (state) => {

            setDashboard(state);

        };

        BackendSimulationEngine.subscribe(listener);

        BackendSimulationEngine.start();

        return () => {

            BackendSimulationEngine.unsubscribe(listener);

        };

    }, []);

    // ==========================================
    // Backend Data
    // ==========================================

    const analytics = dashboard.analytics || {};

    const ai = dashboard.ai || {};

    const signal = dashboard.signal || {};

    const emergency = dashboard.emergency || {

        active: false,

        lane: "NONE"

    };

    const signalPhase =
        dashboard.signal?.currentSignalPhase ??
        dashboard.traffic?.currentSignalPhase ??
        dashboard.simulation?.currentSignalPhase ??
        "UNKNOWN";

    const signalPhaseLabel = {
        NORTH_SOUTH: "North ↕ South",
        EAST_WEST: "East ↔ West",
        ALL_RED: "All Red"
    };

    const vehicleCount =

        signal.totalWaitingVehicles || 0;

    const queues =

        signal.laneQueues || {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

    const currentSignalPhase =
        dashboard.signal?.currentSignalPhase ??
        dashboard.traffic?.currentSignalPhase ??
        dashboard.simulation?.currentSignalPhase ??
        "UNKNOWN";

    const aiSignalPhase =
        dashboard.ai?.signalPhase ??
        currentSignalPhase;

    const currentSignalLabel =
        signalPhaseLabel[currentSignalPhase] ?? currentSignalPhase;

    const aiSignalLabel =
        signalPhaseLabel[aiSignalPhase] ?? aiSignalPhase;

    return (

        <GlassCard className={styles.container}>

            <AIHeader
                status={
                    dashboard.simulation?.simulationRunning
                        ? "online"
                        : "offline"
                }

                version={
                    dashboard.analytics?.systemHealth?.version ??
                    "v2.4.0"
                }

                mode={
                    emergency.active
                        ? "Emergency Override"
                        : "Adaptive AI"
                }

                scheduler={
                    dashboard.simulation?.schedulerStatus ??
                    "UNKNOWN"
                }

                uptime={
                    dashboard.analytics?.systemHealth?.uptime ?? 0
                }

                lastUpdated={
                    dashboard.latestHistory?.simulationTime
                        ? new Date(
                            dashboard.latestHistory.simulationTime
                        ).toLocaleTimeString()
                        : "--:--:--"
                }
            />

            <AISystemStatus
                ai={ai}
                vehicles={vehicleCount}
                signalPhase={
                    currentSignalLabel
                }
                emergency={emergency.active}
                aiStatus={
                    emergency.active
                        ? "EMERGENCY"
                        : "ACTIVE"
                }
                recommendation={
                    ai.reason ||
                    analytics.prediction?.recommendation ||
                    "Traffic Flow Normal"
                }
            />

            <AIDecision
                signalPhase={
                    aiSignalLabel
                }
                greenDuration={ai.greenTime}
                trafficScore={ai.trafficScore ?? 0}
                priority={
                    emergency.active
                        ? "EMERGENCY"
                        : "NORMAL"
                }
            />

            <AIConfidence
                value={
                    analytics.prediction?.confidence ?? 0
                }
                prediction={analytics.prediction?.confidence ?? 99}
                lastPrediction={
                    dashboard.timestamp
                        ? new Date(dashboard.timestamp).toLocaleTimeString()
                        : "--:--:--"
                }
            />

            <AIRecommendation
                ai={ai}
                fuelSaving={
                    analytics.performance?.fuelSaving ??
                    analytics.fuelSaving ??
                    0
                }

                congestion={
                    analytics.congestion ?? 0
                }

                emergency={

                    emergency.active

                }

            />

            <AIFooter
                status={
                    dashboard.simulation?.simulationRunning
                        ? "online"
                        : "offline"
                }
                responseTime="<100 ms"
                lastSync={new Date(dashboard.timestamp).toLocaleTimeString()}
                backend={
                    dashboard.simulation?.schedulerStatus ??
                    "UNKNOWN"
                }
                websocket={
                    analytics.systemHealth?.status ??
                    "UNKNOWN"
                }
            />
        </GlassCard>

    );

}

export default DashboardAI;