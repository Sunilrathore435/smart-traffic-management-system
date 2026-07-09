import {
    FaChartLine,
    FaTrafficLight,
    FaClock,
    FaBrain
} from "react-icons/fa";

import AnalyticsCard from "./components/AnalyticsCard";
import TrafficDensity from "./components/TrafficDensityChart";
import PeakHourCard from "./components/PeakHourCard";
import AIInsightCard from "./components/AIInsightCard";
import styles from "./DashboardAnalytics.module.css";
import VehicleFlow from "./components/VehicleFlow";

function DashboardAnalytics() {

    return (

        <section className={styles.container}>

            <h2 className={styles.heading}>
                📊 Traffic Analytics
                Real-Time City Intelligence
            </h2>

            <div className={styles.grid}>

                {/* Vehicle Flow */}

                <div className={styles.flow}>

                    <AnalyticsCard>

                        <VehicleFlow />

                    </AnalyticsCard>

                </div>

                {/* Traffic Density */}

                <div className={styles.density}>
                    <AnalyticsCard >

                        <TrafficDensity />

                    </AnalyticsCard>

                </div>

                {/* Peak Hour */}

                <div className={styles.peak}>

                    <AnalyticsCard>

                        <PeakHourCard />

                    </AnalyticsCard>

                </div>

                {/* AI Optimizer */}

                <div className={styles.ai}>

                    <AnalyticsCard
                        title="AI Traffic Optimizer"
                        subtitle="Real-Time AI Recommendation"
                        icon={<FaBrain />}
                    >

                        <AIInsightCard />

                    </AnalyticsCard>

                </div>

            </div>

        </section>

    );

}

export default DashboardAnalytics;