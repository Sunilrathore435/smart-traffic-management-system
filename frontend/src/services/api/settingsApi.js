import apiClient from "./apiClient";

const settingsApi = {

    async getSettings() {

        const response = await apiClient.get(
            "/settings"
        );

        return response.data;

    },

    async updateSettings(settings) {

        const response = await apiClient.put(
            "/settings",
            settings
        );

        return response.data;

    },

    async resetSettings() {

        const response = await apiClient.post(
            "/settings/reset"
        );

        return response.data;

    }

};

export default settingsApi;