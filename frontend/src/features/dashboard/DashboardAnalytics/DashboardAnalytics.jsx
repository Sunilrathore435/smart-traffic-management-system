import { useEffect, useMemo, useState } from "react";

import { useDashboard } from "../../../hooks";

import AnalyticsCard from "./components/AnalyticsCard";
import TrafficDensity from "./components/TrafficDensityChart";
import PeakHourCard from "./components/PeakHourCard";
import AIInsightCard from "./components/AIInsightCard";
import VehicleFlow from "./components/VehicleFlow";

import { SimulationEngine } from "../../traffic";

import styles from "./DashboardAnalytics.module.css";

function DashboardAnalytics() {

    const {

        dashboard,

        loading,

        error

    } = useDashboard();

    const [simulationState, setSimulationState] = useState(
        SimulationEngine.getState()
    );

    useEffect(() => {

        const listener = state => {

            setSimulationState(state);

        };

        SimulationEngine.subscribe(listener);

        return () => {

            SimulationEngine.unsubscribe(listener);

        };

    }, []);

    const offlineMode = loading || error || !dashboard;

    const analytics = useMemo(() => {

        if (!offlineMode) {

            return dashboard.analytics;

        }

        const totalVehicles =
            simulationState?.vehicles?.length ?? 0;

        return {

            totalVehicles,

            averageWaitingTime: 0,

            trafficDensity: totalVehicles,

            congestionLevel:
                totalVehicles > 40
                    ? "HIGH"
                    : totalVehicles > 20
                        ? "MEDIUM"
                        : "LOW"

        };

    }, [dashboard, simulationState, offlineMode]);

    const ai = offlineMode
        ? {

            recommendation: "Frontend Simulation",

            signalPhase:
                simulationState?.signals?.currentPhase ??
                "NORTH_SOUTH",

            confidence: 100,

            trafficScore: 0,

            reason:
                "Backend unavailable"

        }
        : dashboard.ai;

    const emergency = offlineMode
        ? {

            active: false,

            lane: null

        }
        : dashboard.emergency;

    const signal = offlineMode
        ? {

            currentSignalPhase:
                simulationState?.signals?.currentPhase ??
                "NORTH_SOUTH"

        }
        : dashboard.signal;

    const simulation = offlineMode
        ? simulationState
        : dashboard.simulation;

    return (

        <section className={styles.container}>

            <h2 className={styles.heading}>

                📊 Traffic Analytics

                <span>

                    Real-Time City Intelligence

                </span>

                <div className={styles.mode}>

                    {

                        offlineMode
                            ? (

                                <span className={styles.offline}>

                                    🔴 Frontend Simulation

                                </span>

                            )
                            : (

                                <span className={styles.online}>

                                    🟢 Live Backend

                                </span>

                            )

                    }

                </div>

            </h2>

            <div className={styles.grid}>

                <div className={styles.flow}>

                    <AnalyticsCard>

                        <VehicleFlow

                            analytics={analytics}

                            vehicles={simulationState?.vehicles}

                            signals={simulationState?.signals}

                        />

                    </AnalyticsCard>

                </div>

                <div className={styles.density}>

                    <AnalyticsCard>

                        <TrafficDensity

                            analytics={analytics}

                        />

                    </AnalyticsCard>

                </div>

                <div className={styles.peak}>

                    <AnalyticsCard>

                        <PeakHourCard

                            analytics={analytics}

                            ai={ai}

                            emergency={emergency}

                            timestamp={
                                dashboard?.timestamp ??
                                new Date().toISOString()
                            }

                        />

                    </AnalyticsCard>

                </div>

                <div className={styles.ai}>

                    <AnalyticsCard>

                        <AIInsightCard

                            analytics={analytics}

                            ai={ai}

                            emergency={emergency}

                            signal={signal}

                            simulation={simulation}

                            timestamp={
                                dashboard?.timestamp ??
                                new Date().toISOString()
                            }

                        />

                    </AnalyticsCard>

                </div>

            </div>

        </section>

    );

}

export default DashboardAnalytics;