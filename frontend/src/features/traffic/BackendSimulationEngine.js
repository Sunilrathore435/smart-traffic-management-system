import {
    dashboardApi,
    historyApi,
    emergencyApi,
    pedestrianApi
} from "../../services/api";

import socketClient from "../../services/websocket/socketClient";

class BackendSimulationEngine {

    state = {
        analytics: null,
        traffic: null,
        simulation: null,
        history: [],
        offline: false
    };

    listeners = [];

    started = false;

    socketListener = null;

    healthCheckTimer = null;

    loading = false;

    // ===================================================
    // Start Engine
    // ===================================================

    start() {

        if (this.started) {
            return;
        }

        this.started = true;

        // Initial dashboard load
        this.load().catch(() => {
            // Backend may be offline initially
        });

        socketClient.connect();

        this.socketListener = async (event) => {

            switch (event.type) {

                case "CONNECTED":

                    this.stopHealthCheck();

                    await this.load();

                    break;

                case "UPDATE":

                    // Refresh dashboard silently
                    await this.load();

                    break;

                case "DISCONNECTED":

                    if (!this.state.offline) {

                        this.state = {
                            analytics: null,
                            traffic: null,
                            simulation: null,
                            history: [],
                            offline: true
                        };

                        this.notify();

                    }

                    this.startHealthCheck();

                    break;

                default:

                    break;

            }

        };

        socketClient.subscribe(this.socketListener);

    }

    // ===================================================
    // Stop Engine
    // ===================================================

    stop() {

        if (!this.started) {
            return;
        }

        this.started = false;

        this.stopHealthCheck();

        if (this.socketListener) {

            socketClient.unsubscribe(this.socketListener);

            this.socketListener = null;

        }

        socketClient.disconnect();

    }

    // ===================================================
    // Health Monitor
    // ===================================================

    startHealthCheck() {

        if (this.healthCheckTimer) {
            return;
        }

        this.healthCheckTimer = setInterval(async () => {

            try {

                await dashboardApi.getLiveDashboard();

                this.stopHealthCheck();

                if (!socketClient.connected) {

                    socketClient.connect();

                }

            } catch (_) {

                // Backend still offline

            }

        }, 3000);

    }

    stopHealthCheck() {

        if (!this.healthCheckTimer) {
            return;
        }

        clearInterval(this.healthCheckTimer);

        this.healthCheckTimer = null;

    }

    // ===================================================
    // Dashboard Loader
    // ===================================================

    async load() {

        if (this.loading) {
            return;
        }

        this.loading = true;

        try {

            const [dashboard, history] = await Promise.all([

                dashboardApi.getLiveDashboard(),

                historyApi.getAll()

            ]);

            const wasOffline = this.state.offline;

            this.state = {

                ...dashboard,

                history: Array.isArray(history)
                    ? history
                    : [],

                offline: false

            };

            if (wasOffline) {

                console.log("📡 Dashboard Loaded");

            }

            this.notify();

            return this.state;

        } catch (_) {

            if (!this.state.offline) {

                this.state = {

                    analytics: null,
                    traffic: null,
                    simulation: null,
                    history: [],
                    offline: true

                };

                this.notify();

            }

        } finally {

            this.loading = false;

        }

    }

    // ===================================================
    // Emergency
    // ===================================================

    async triggerEmergency(lane) {

        try {

            await emergencyApi.activate(lane);

            await this.load();

        } catch (_) {

            // Backend offline

        }

    }

    async clearEmergency() {

        try {

            await emergencyApi.clear();

            await this.load();

        } catch (_) {

            // Backend offline

        }

    }

    // ===================================================
    // Pedestrian
    // ===================================================

    async requestPedestrianCrossing() {

        try {

            await pedestrianApi.requestPedestrianCrossing();

            await this.load();

        } catch (_) {

            // Backend offline

        }

    }

    // ===================================================
    // Listeners
    // ===================================================

    subscribe(listener) {

        if (!this.listeners.includes(listener)) {

            this.listeners.push(listener);

        }

    }

    unsubscribe(listener) {

        this.listeners =
            this.listeners.filter(
                l => l !== listener
            );

    }

    notify() {

        this.listeners.forEach(listener => {

            try {

                listener(this.state);

            } catch (error) {

                console.error(error);

            }

        });

    }

    // ===================================================
    // Getter
    // ===================================================

    getState() {

        return this.state;

    }

}

export default new BackendSimulationEngine();