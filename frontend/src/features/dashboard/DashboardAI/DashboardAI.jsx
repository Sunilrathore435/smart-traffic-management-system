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

    const currentGreenLane =

        emergency.active

            ? emergency.lane

            : signal.currentGreenLane || "-";

    const vehicleCount =

        signal.totalWaitingVehicles || 0;

    const queues =

        signal.laneQueues || {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

    return (

        <GlassCard className={styles.container}>

            <AIHeader

                status={
                    dashboard.simulation?.simulationRunning
                        ? "online"
                        : "offline"
                }

                version="v2.4.0"

                mode={
                    emergency.active
                        ? "Emergency Override"
                        : "Adaptive AI"
                }

            />

            <AISystemStatus
                vehicles={vehicleCount}
                currentLane={currentGreenLane}
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
                currentLane={currentGreenLane}
                greenDuration={ai.greenTime || 10}
                trafficScore={ai.trafficScore || 0}
                priority={
                    emergency.active
                        ? "EMERGENCY"
                        : "NORMAL"
                }
            />

            <AIConfidence
                value={analytics.prediction?.confidence ?? 99}
                prediction={analytics.prediction?.confidence ?? 99}
                lastPrediction={new Date(dashboard.timestamp).toLocaleTimeString()}
            />

            <AIRecommendation

                queues={queues}

                currentLane={currentGreenLane}

                greenTime={

                    ai.greenTime || 10

                }

                fuelSaving={

                    analytics.fuelSaving || 0

                }

                congestion={

                    analytics.congestion || 0

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
                    dashboard.simulation?.schedulerStatus || "CONNECTED"
                }
                websocket="ONLINE"
            />
        </GlassCard>

    );

}

export default DashboardAI;