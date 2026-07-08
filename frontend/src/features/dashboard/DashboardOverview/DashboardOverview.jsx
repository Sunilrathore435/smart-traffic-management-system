import {
    FaCarSide,
    FaTrafficLight,
    FaBrain,
    FaAmbulance
} from "react-icons/fa";

import MetricCard from "../../../components/ui/MetricCard";

import styles from "./DashboardOverview.module.css";

function DashboardOverview() {

    return (

        <section className={styles.grid}>

            <MetricCard
                title="Total Vehicles"
                value={248}
                subtitle="Live Vehicles"
                icon={<FaCarSide />}
            />

            <MetricCard
                title="Signals"
                value={4}
                subtitle="Currently Active"
                icon={<FaTrafficLight />}
            />

            <MetricCard
                title="AI Confidence"
                value={98}
                suffix="%"
                subtitle="Traffic Optimizer"
                icon={<FaBrain />}
            />

            <MetricCard
                title="Emergency"
                value="OFF"
                subtitle="No Priority Vehicle"
                icon={<FaAmbulance />}
            />

        </section>

    );

}

export default DashboardOverview;