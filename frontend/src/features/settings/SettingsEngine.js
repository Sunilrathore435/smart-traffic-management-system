class SettingsEngine {

    constructor() {

        this.listeners = [];

        this.storageKey = "sctcc-settings";

        this.defaultSettings = {

            // Simulation

            autoSimulation: true,

            vehicleSpawnRate: 6,

            vehicleSpeed: 5,

            // AI

            adaptiveAI: true,

            minGreenTime: 8,

            maxGreenTime: 20,

            aiDecisionInterval: 5,

            // Emergency

            emergencyPriority: true,

            emergencyDuration: 20,

            // Analytics

            refreshRate: 500,

            historyLimit: 100,

            // UI

            theme: "dark"

        };

        this.systemInfo = {

            backendConnected: false,

            websocketConnected: false,

            database: "MongoDB Atlas",

            version: "2.4.0"

        };

        this.settings = {

            ...this.defaultSettings

        };

        this.load();

    }

    // =====================================
    // Getter
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

        this.save();

        this.notify();

    }

    // =====================================
    // Toggle Boolean
    // =====================================

    toggle(key) {

        if (

            typeof this.settings[key] !== "boolean"

        ) {

            return;

        }

        this.update(

            key,

            !this.settings[key]

        );

    }

    // =====================================
    // Multiple Update
    // =====================================

    updateAll(values) {

        Object.keys(values).forEach(key => {

            if (key in this.settings) {

                this.settings[key] = values[key];

            }

        });

        this.save();

        this.notify();

    }

    // =====================================
    // Reset
    // =====================================

    reset() {

        this.settings = {

            ...this.defaultSettings

        };

        this.save();

        this.notify();

    }

    // =====================================
    // Export
    // =====================================

    export() {

        return JSON.stringify(

            this.settings,

            null,

            2

        );

    }

    // =====================================
    // Import
    // =====================================

    import(config) {

        Object.keys(config).forEach(key => {

            if (key in this.settings) {

                this.settings[key] = config[key];

            }

        });

        this.save();

        this.notify();

    }

    // =====================================
    // Local Storage
    // =====================================

    save() {

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(this.settings)

        );

    }

    load() {

        const data =

            localStorage.getItem(

                this.storageKey

            );

        if (!data) {

            return;

        }

        try {

            this.settings = {

                ...this.defaultSettings,

                ...JSON.parse(data)

            };

        }

        catch {

            this.settings = {

                ...this.defaultSettings

            };

        }

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

        const settings =

            this.getSettings();

        this.listeners.forEach(

            listener => listener(settings)

        );

    }

}

export default new SettingsEngine();