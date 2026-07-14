import apiClient from "./apiClient";

const analyticsApi = {

    getAnalytics() {

        return apiClient.get("/analytics");

    }

};

export default analyticsApi;