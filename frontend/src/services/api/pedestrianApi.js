import apiClient from "./apiClient";

const pedestrianApi = {

    async requestPedestrianCrossing() {

        const response = await apiClient.post(

            "/traffic/pedestrian/request",

            {
                direction: null
            }

        );

        return response.data;

    }

};

export default pedestrianApi;