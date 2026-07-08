import GlassCard from "../../../components/ui/GlassCard";

import MapHeader from "./sections/MapHeader";
import MapCanvas from "./sections/MapCanvas";
import LaneSummary from "./sections/LaneSummary";
import MapFooter from "./sections/MapFooter";

import styles from "./DashboardMap.module.css";

function DashboardMap() {

    return (

        <GlassCard className={styles.container}>

            <MapHeader />

            <MapCanvas />

            <LaneSummary />

            <MapFooter />

        </GlassCard>

    );

}

export default DashboardMap;