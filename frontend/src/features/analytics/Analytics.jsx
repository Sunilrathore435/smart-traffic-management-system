import { useEffect, useState } from "react";

import BackendSimulationEngine from "../traffic/BackendSimulationEngine";

import OverviewCards from "./OverviewCards";
import TrafficTrendChart from "./TrafficTrendChart";
import CongestionHeatmap from "./CongestionHeatmap";
import PeakHourAnalysis from "./PeakHourAnalysis";
import AIInsights from "./AIInsights";
import JunctionRanking from "./JunctionRanking";

import styles from "./Analytics.module.css";

function Analytics() {

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

    const analytics =
        dashboard.analytics || {};

    return (

        <section className={styles.container}>

            <header className={styles.header}>

                <h1>

                    📊 Traffic Intelligence

                </h1>

                <p>

                    Real-time traffic analytics, congestion insights,
                    AI optimization and junction performance.

                </p>

            </header>

            <OverviewCards analytics={analytics} />

            <section className={styles.grid}>

                <div className={styles.large}>

                    <TrafficTrendChart
                        analytics={analytics}
                    />

                </div>

                <CongestionHeatmap
                    analytics={analytics}
                />

                <PeakHourAnalysis
                    analytics={analytics}
                    ai={dashboard.ai}
                />

                <AIInsights
                    analytics={analytics}
                    ai={dashboard.ai}
                    emergency={dashboard.emergency}
                />

                <JunctionRanking
                    analytics={analytics}
                />

            </section>

        </section>

    );

}

export default Analytics;