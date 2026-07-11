import GlassCard from "../../../components/ui/GlassCard";

import MapHeader from "./sections/MapHeader";
import LaneSummary from "./sections/LaneSummary";
import MapFooter from "./sections/MapFooter";



import styles from "./DashboardMap.module.css";
import CityMap from "../../map/index.js";

function DashboardMap() {

    return (

        <GlassCard className={styles.container}>

            <MapHeader />

            <CityMap />

            <LaneSummary />

            <MapFooter />

        </GlassCard>

    );

}

export default DashboardMap;