import { settingsApi } from "../../services/api";

class SettingsEngine {

    constructor() {

        this.listeners = [];

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

        try {

            const data =
                await settingsApi.getSettings();

            console.log("Settings Loaded:", data);

            this.settings = data;

            this.hasChanges = false;

            this.systemInfo.backendConnected = true;

            this.notify();

        }

        catch (error) {

            console.error(error);

            this.systemInfo.backendConnected = false;

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

            this.notify();

            return true;

        }

        catch (error) {

            console.error(error);

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

            this.notify();

        }

        catch (error) {

            console.error(error);

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

        this.listeners.push(listener);

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

            hasChanges: this.hasChanges

        };

        this.listeners.forEach(

            listener => listener(state)

        );

    }

}

export default new SettingsEngine();