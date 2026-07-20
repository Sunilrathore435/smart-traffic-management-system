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

    // =====================================================
    // Loading
    // =====================================================

    if (
        !dashboard ||
        !dashboard.signal ||
        !dashboard.simulation
    ) {
        return (
            <GlassCard className={styles.loading}>
                <div className={styles.loader} />
                <h3>Connecting to Smart Traffic Controller...</h3>
            </GlassCard>
        );
    }

    // =====================================================
    // Dashboard State
    // =====================================================

    const signal = dashboard.signal ?? {};
    const simulation = dashboard.simulation ?? {};
    const emergency = dashboard.emergency ?? {};
    const analytics = dashboard.analytics ?? {};
    const ai = dashboard.ai ?? {};

    return (

        <GlassCard className={styles.container}>

            {/* ==========================================
                Dashboard Header
            ========================================== */}

            <MapHeader

                simulation={simulation}

                signal={signal}

                emergency={emergency}

            />

            {/* ==========================================
                Live Traffic Intersection
            ========================================== */}

            <CityMap

                signal={signal}

                simulation={simulation}

                emergency={emergency}

                ai={ai}

                analytics={analytics}

            />

            {/* ==========================================
                Lane Statistics
            ========================================== */}

            <LaneSummary

                signal={signal}

                analytics={analytics}

            />

            {/* ==========================================
                Footer
            ========================================== */}

            <MapFooter

                simulation={simulation}

            />

        </GlassCard>

    );

}

export default DashboardMap;