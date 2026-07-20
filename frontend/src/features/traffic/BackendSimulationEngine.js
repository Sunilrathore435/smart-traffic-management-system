import { dashboardApi, emergencyApi ,pedestrianApi} from "../../services/api";

class BackendSimulationEngine {

    state = {
        analytics: null,
        traffic: null,
        simulation: null,
        latestHistory: null
    };

    listeners = [];

    timer = null;

    start() {

        if (this.timer) return;

        this.load();

        this.timer = setInterval(() => {

            this.load();

        }, 1000);

    }

    stop() {

        clearInterval(this.timer);

        this.timer = null;

    }

    async load() {

        try {

            const data =
                await dashboardApi.getLiveDashboard();

            this.state = data;

            this.notify();

        } catch (error) {

            console.error(error);

        }

    }

    async triggerEmergency(lane) {

        await emergencyApi.activate(lane);

        await this.load();

    }

    async clearEmergency() {

        await emergencyApi.clear();

        await this.load();

    }

    subscribe(listener) {

        this.listeners.push(listener);

    }

    unsubscribe(listener) {

        this.listeners =
            this.listeners.filter(

                l => l !== listener

            );

    }

    notify() {

        this.listeners.forEach(

            listener => listener(this.state)

        );

    }

    getState() {

        return this.state;

    }
    async requestPedestrianCrossing() {

        try {

            await pedestrianApi.requestPedestrianCrossing();

            await this.load();

        } catch (error) {

            console.error(error);

        }

    }
}

export default new BackendSimulationEngine();