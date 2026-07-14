import apiClient from "./apiClient";

const dashboardApi = {

    async getLiveDashboard() {

        const response = await apiClient.get(

            "/dashboard/live"

        );

        return response.data;

    }

};

export default dashboardApi;