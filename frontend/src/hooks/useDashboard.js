import { useEffect, useState } from "react";

import BackendSimulationEngine
    from "../features/traffic/BackendSimulationEngine";

export default function useDashboard() {

    const [dashboard, setDashboard] = useState(
        BackendSimulationEngine.getState()
    );

    const [loading, setLoading] = useState(
        BackendSimulationEngine.getState() == null
    );

    const [error, setError] = useState(null);

    useEffect(() => {

        const listener = (state) => {

            setDashboard(state);

            setLoading(false);

            setError(null);

        };

        BackendSimulationEngine.subscribe(listener);

        BackendSimulationEngine.start();

        return () => {

            BackendSimulationEngine.unsubscribe(listener);

        };

    }, []);

    return {

        dashboard,

        loading,

        error

    };

}