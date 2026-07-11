import { useEffect, useState } from "react";

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

    return (

        <section className={styles.container}>

            <h2 className={styles.heading}>

                📊 Traffic Analytics

                <span>

                     Real-Time City Intelligence

                </span>

            </h2>

            <div className={styles.grid}>

                <div className={styles.flow}>

                    <AnalyticsCard>

                        <VehicleFlow

                            analytics={simulation.analytics}

                            vehicles={simulation.vehicles}

                            signals={simulation.signals}

                        />

                    </AnalyticsCard>

                </div>

                <div className={styles.density}>

                    <AnalyticsCard>

                        <TrafficDensity

                            analytics={simulation.analytics}

                            vehicles={simulation.vehicles}

                        />

                    </AnalyticsCard>

                </div>

                <div className={styles.peak}>

                    <AnalyticsCard>

                        <PeakHourCard

                            analytics={simulation.analytics}

                            ai={simulation.ai}

                            emergency={simulation.emergency}

                        />

                    </AnalyticsCard>

                </div>

                <div className={styles.ai}>

                    <AnalyticsCard>

                        <AIInsightCard

                            analytics={simulation.analytics}

                            ai={simulation.ai}

                            emergency={simulation.emergency}

                            signals={simulation.signals}

                        />

                    </AnalyticsCard>

                </div>

            </div>

        </section>

    );

}

export default DashboardAnalytics;