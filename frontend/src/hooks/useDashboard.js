import { useEffect, useState } from "react";

import dashboardApi from "../services/api/dashboardApi";

export default function useDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        loadDashboard();

        const timer = setInterval(

            loadDashboard,

            3000

        );

        return () => clearInterval(timer);

    }, []);

    async function loadDashboard() {

        try {

            const data =

                await dashboardApi.getLiveDashboard();

            setDashboard(data);

            setLoading(false);

        }

        catch (err) {

            console.error(err);

            setError(err);

            setLoading(false);

        }

    }

    return {

        dashboard,

        loading,

        error

    };

}