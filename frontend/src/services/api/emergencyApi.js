import apiClient from "./apiClient";

const emergencyApi = {

    activate(lane) {
        return apiClient.post(`/emergency/${lane}`);
    },

    clear() {
        return apiClient.post("/emergency/clear");
    }

};

export default emergencyApi;