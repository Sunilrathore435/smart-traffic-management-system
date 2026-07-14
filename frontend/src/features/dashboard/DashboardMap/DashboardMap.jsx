import { useEffect, useState } from "react";

import GlassCard from "../../../components/ui/GlassCard";

import MapHeader from "./sections/MapHeader";
import LaneSummary from "./sections/LaneSummary";
import MapFooter from "./sections/MapFooter";

import BackendSimulationEngine from "../../traffic/BackendSimulationEngine";
import CityMap from "../../map";

import styles from "./DashboardMap.module.css";

function DashboardMap() {

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

    return (

        <GlassCard className={styles.container}>

            <MapHeader
                simulation={dashboard.simulation}
                signal={dashboard.signal}
                emergency={dashboard.emergency}
            />

            <CityMap
                signal={dashboard.signal}
                emergency={dashboard.emergency}
                ai={dashboard.ai}
                analytics={dashboard.analytics}
            />

            <LaneSummary
                signal={dashboard.signal}
                analytics={dashboard.analytics}
            />

            <MapFooter
                simulation={dashboard.simulation}
            />

        </GlassCard>

    );

}

export default DashboardMap;