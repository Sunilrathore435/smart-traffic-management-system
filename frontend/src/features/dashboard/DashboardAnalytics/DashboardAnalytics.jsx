import { useEffect, useState } from "react";

import { useDashboard } from "../../../hooks";

import AnalyticsCard from "./components/AnalyticsCard";
import TrafficDensity from "./components/TrafficDensityChart";
import PeakHourCard from "./components/PeakHourCard";
import AIInsightCard from "./components/AIInsightCard";
import VehicleFlow from "./components/VehicleFlow";

import { SimulationEngine } from "../../traffic";

import styles from "./DashboardAnalytics.module.css";

function DashboardAnalytics() {

    const [simulation, setSimulation] = useState(
        SimulationEngine.getState()
    );

    const {

        dashboard,

        loading,

        error

    } = useDashboard();

    useEffect(() => {

        const listener = (state) => {

            setSimulation(state);

        };

        SimulationEngine.subscribe(listener);

        return () => {

            SimulationEngine.unsubscribe(listener);

        };

    }, []);

    if (loading) {

        return <div className={styles.loading}>Loading Dashboard...</div>;

    }

    if (error) {

        return (
            <div className={styles.error}>
                Failed to load dashboard.
            </div>
        );

    }

    return (

        <section className={styles.container}>

            <h2 className={styles.heading}>

                📊 Traffic Analytics

                <span>

                    Real-Time City Intelligence

                </span>

            </h2>

            <div className={styles.grid}>

                {/* Vehicle Animation (still frontend) */}

                <div className={styles.flow}>

                    <AnalyticsCard>

                        <VehicleFlow

                            analytics={dashboard?.analytics}

                            vehicles={simulation.vehicles}

                            signals={simulation.signals}

                        />

                    </AnalyticsCard>

                </div>

                {/* Backend */}

                <div className={styles.density}>

                    <AnalyticsCard>

                        <TrafficDensity

                            analytics={dashboard?.analytics}

                        />

                    </AnalyticsCard>

                </div>

                {/* Backend */}

                <div className={styles.peak}>

                    <AnalyticsCard>

                        <PeakHourCard

                            analytics={dashboard?.analytics}

                            ai={dashboard?.ai}

                            emergency={dashboard?.emergency}

                            timestamp={dashboard?.timestamp}

                        />
                    </AnalyticsCard>

                </div>

                {/* Backend */}

                <div className={styles.ai}>

                    <AnalyticsCard>

                        <AIInsightCard

                            analytics={dashboard?.analytics}

                            ai={dashboard?.ai}

                            emergency={dashboard?.emergency}

                            signal={dashboard?.signal}

                            simulation={dashboard?.simulation}

                            timestamp={dashboard?.timestamp}

                        />

                    </AnalyticsCard>

                </div>

            </div>

        </section>

    );

}

export default DashboardAnalytics;