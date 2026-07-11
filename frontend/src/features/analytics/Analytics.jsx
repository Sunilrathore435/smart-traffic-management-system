import OverviewCards from "./OverviewCards";
import TrafficTrendChart from "./TrafficTrendChart";
import CongestionHeatmap from "./CongestionHeatmap";
import PeakHourAnalysis from "./PeakHourAnalysis";
import AIInsights from "./AIInsights";
import JunctionRanking from "./JunctionRanking";

import styles from "./Analytics.module.css";

function Analytics() {

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

            <OverviewCards />

            <section className={styles.grid}>

                <div className={styles.large}>

                    <TrafficTrendChart />

                </div>

                <CongestionHeatmap />

                <PeakHourAnalysis />

                <AIInsights />

                <JunctionRanking />

            </section>

        </section>

    );

}

export default Analytics;