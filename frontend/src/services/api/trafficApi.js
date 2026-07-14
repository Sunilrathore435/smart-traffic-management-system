import apiClient from "./apiClient";

const trafficApi = {

    getStatus() {

        return apiClient.get("/traffic/status");

    },

    simulate() {

        return apiClient.post("/traffic/simulate");

    },

    addVehicle(data) {

        return apiClient.post("/traffic/vehicle", data);

    },

    getBusiestLane() {

        return apiClient.get("/traffic/busiest-lane");

    }

};

export default trafficApi;