import apiClient from "./apiClient";

const historyApi = {

    async getAll() {

        const response = await apiClient.get("/history");

        return response.data;

    },

    async getLatest() {

        const response = await apiClient.get("/history/latest");

        return response.data;

    }

};

export default historyApi;