import { useEffect, useState } from "react";

import GlassCard from "../../../components/ui/GlassCard";

import AIHeader from "./sections/AIHeader";
import AISystemStatus from "./sections/AISystemStatus";
import AIDecision from "./sections/AIDecision";
import AIConfidence from "./sections/AIConfidence";
import AIRecommendation from "./sections/AIRecommendation";
import AIFooter from "./sections/AIFooter";

import { SimulationEngine } from "../../traffic";

import styles from "./DashboardAI.module.css";
import SettingsEngine from "../../settings/SettingsEngine.js";

function DashboardAI() {

    const [simulation, setSimulation] = useState(

        SimulationEngine.getState()

    );

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

    const currentGreenLane =

        simulation.emergency?.active

            ? simulation.emergency.lane

            : Object.keys(simulation.signals).find(

            lane => simulation.signals[lane] === "green"

        ) || "-";

    const vehicleCount =
        simulation.vehicles.length;
    const queues =

        simulation.ai?.queues ||

        {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

    return (

        <GlassCard className={styles.container}>
            <AIHeader />

            <AISystemStatus
                vehicles={vehicleCount}
                currentLane={currentGreenLane}
                emergency={simulation.emergency.active}
                aiStatus={
                    simulation.emergency?.active
                        ? "EMERGENCY"
                        : "ACTIVE"
                }
            />

            <AIDecision
                currentLane={currentGreenLane}
                greenDuration={
                    simulation.ai?.greenTime || 8
                }
                reduction={
                    simulation.analytics?.fuelSaving || 0
                }
                priority={
                    simulation.emergency?.active
                        ? "EMERGENCY"
                        : "NORMAL"
                }
                emergency={
                    simulation.emergency?.active
                }
            />

            <AIConfidence
                value={simulation.ai?.confidence || 98}

                prediction={simulation.ai?.confidence || 98}
                lastPrediction="Live"
            />

            <AIRecommendation

                queues={queues}

                currentLane={currentGreenLane}

                greenTime={simulation.ai?.greenTime || 8}

                fuelSaving={simulation.analytics?.fuelSaving || 0}

                congestion={simulation.analytics?.congestion || 0}

                emergency={simulation.emergency?.active || false}

            />

            <AIFooter
                status="online"
                responseTime={`${simulation.analytics.averageWait} ms`}
                lastSync="Live"
                backend={
                    SettingsEngine.getSettings().backendStatus
                }
                websocket="ONLINE"
            />
        </GlassCard>

    );

}

export default DashboardAI;