import { settingsApi } from "../../services/api";

class SettingsEngine {

    constructor() {

        this.listeners = [];

        this.loading = false;

        this.settings = {

            autoSimulation: true,
            vehicleSpawnRate: 5,
            schedulerInterval: 5000,

            adaptiveAI: true,
            minGreenTime: 10,
            maxGreenTime: 40,
            vehiclesPerGreen: 3,

            emergencyPriority: true,
            emergencyGreenTime: 40,

            refreshRate: 500,
            historyLimit: 100

        };

        this.hasChanges = false;

        this.systemInfo = {

            backendConnected: false,
            websocketConnected: false,
            database: "MongoDB Atlas",
            version: "2.5.0"

        };

        this.load();

    }

    // =====================================
    // Load Settings
    // =====================================

    async load() {

        if (this.loading) {
            return;
        }

        this.loading = true;

        try {

            const data =
                await settingsApi.getSettings();

            this.settings = data;

            this.hasChanges = false;

            this.systemInfo.backendConnected = true;

            this.notify();

        }

        catch (_) {

            // Backend offline

            if (this.systemInfo.backendConnected) {

                this.systemInfo.backendConnected = false;

                this.notify();

            }

        }

        finally {

            this.loading = false;

        }

    }

    // =====================================
    // Save Settings
    // =====================================

    async save() {

        try {

            const data =
                await settingsApi.updateSettings(
                    this.settings
                );

            this.settings = data;

            this.hasChanges = false;

            this.systemInfo.backendConnected = true;

            this.notify();

            return true;

        }

        catch (_) {

            this.systemInfo.backendConnected = false;

            this.notify();

            return false;

        }

    }

    // =====================================
    // Reset
    // =====================================

    async reset() {

        try {

            const data =
                await settingsApi.resetSettings();

            this.settings = data;

            this.hasChanges = false;

            this.systemInfo.backendConnected = true;

            this.notify();

        }

        catch (_) {

            this.systemInfo.backendConnected = false;

            this.notify();

        }

    }

    // =====================================
    // Getters
    // =====================================

    getSettings() {

        return {

            ...this.settings

        };

    }

    getSystemInfo() {

        return {

            ...this.systemInfo

        };

    }

    hasUnsavedChanges() {

        return this.hasChanges;

    }

    // =====================================
    // Update
    // =====================================

    update(key, value) {

        if (!(key in this.settings)) {
            return;
        }

        if (this.settings[key] === value) {
            return;
        }

        this.settings[key] = value;

        this.hasChanges = true;

        this.notify();

    }

    // =====================================
    // Update Multiple
    // =====================================

    updateAll(values) {

        this.settings = {

            ...this.settings,
            ...values

        };

        this.hasChanges = true;

        this.notify();

    }

    // =====================================
    // Subscribe
    // =====================================

    subscribe(listener) {

        if (!this.listeners.includes(listener)) {

            this.listeners.push(listener);

        }

    }

    unsubscribe(listener) {

        this.listeners =
            this.listeners.filter(
                item => item !== listener
            );

    }

    notify() {

        const state = {

            ...this.settings,

            hasChanges: this.hasChanges,

            systemInfo: {

                ...this.systemInfo

            }

        };

        this.listeners.forEach(listener => {

            try {

                listener(state);

            } catch (_) {}

        });

    }

}

export default new SettingsEngine();