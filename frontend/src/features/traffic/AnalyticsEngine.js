import SettingsEngine from "../settings/SettingsEngine";


class AnalyticsEngine {

    constructor() {

        this.listeners = [];


        this.startTime = Date.now();

        this.settings =
            SettingsEngine.getSettings();

        this.lastRefresh = 0;

        this.lastVehicleCount = 0;

        this.lastHistoryUpdate = 0;

        this.flowPercentage=0;

        SettingsEngine.subscribe(settings => {

            this.settings = settings;

        });

        this.reset();

    }

    // =====================================
    // Reset
    // =====================================

    reset() {

        this.stats = {

            vehiclesPassed: 0,

            currentQueue: 0,

            averageWait: 0,

            congestion: 0,

            throughput: 0,

            fuelSaving: 0,

            emergencyCount: 0,

            averageGreenTime: 8,

            liveFlow: 0,

            flowPercentage: 0

        };

        this.trafficHistory = [];
        this.lastHistoryUpdate = 0;
        this.lastRefresh = 0;

        this.laneCongestion = {

            north: 0,
            east: 0,
            south: 0,
            west: 0

        };

    }

    // =====================================
    // Vehicle Passed
    // =====================================

    vehiclePassed() {

        this.stats.vehiclesPassed++;

    }

    // =====================================
    // Emergency Counter
    // =====================================

    registerEmergency() {

        this.stats.emergencyCount++;

        this.notify();

    }

    // =====================================
    // Average Waiting Time
    // =====================================

    updateAverageWait(seconds) {

        this.stats.averageWait = seconds;

    }

    // =====================================
    // Main Analytics Update
    // =====================================

    update(vehicles, signals, ai) {

        // -----------------------------
        // Queue
        // -----------------------------

        const queue = vehicles.filter(
            vehicle => vehicle.stopped
        ).length;

        // -----------------------------
        // Lane Congestion
        // -----------------------------

        this.laneCongestion = {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

        vehicles.forEach(vehicle => {

            if (vehicle.stopped) {

                this.laneCongestion[vehicle.lane]++;

            }

        });

        // -----------------------------
        // Congestion %
        // -----------------------------

        const congestion = Math.round(
            (queue / Math.max(vehicles.length, 1)) * 100
        );

        // -----------------------------
        // Fuel Saving
        // -----------------------------

        const fuelSaving = Math.max(
            0,

            100 - congestion
        );

        // -----------------------------
        // Throughput
        // -----------------------------

        const elapsedMinutes = Math.max(
            1 / 60,

            (Date.now() - this.startTime) / 60000
        );

        const throughput = Math.round(
            this.stats.vehiclesPassed /

            elapsedMinutes
        );
        // =====================================
// Flow Percentage
// =====================================

        const MAX_FLOW = 120;

        const flowPercentage = Math.min(
            100,
            Math.round((throughput / MAX_FLOW) * 100)
        );

        this.stats.flowPercentage = flowPercentage;
        // -----------------------------
// Live Current Flow
// -----------------------------

        const currentFlow =
            this.stats.vehiclesPassed - this.lastVehicleCount;

        this.lastVehicleCount =
            this.stats.vehiclesPassed;

        // -----------------------------
        // Save Stats
        // -----------------------------


        this.stats.currentQueue = queue;

        this.stats.congestion = congestion;

        this.stats.fuelSaving = fuelSaving;

        this.stats.throughput = throughput;

        this.stats.liveFlow = currentFlow;

        this.stats.flowPercentage = flowPercentage;

        this.stats.averageGreenTime =
            ai?.greenTime || 8;

        // -----------------------------
// Traffic History
// -----------------------------

        const now = Date.now();

// Save history every refresh interval
        if (
            now - this.lastHistoryUpdate >=
            this.settings.refreshRate
        ) {

            this.lastHistoryUpdate = now;

            this.trafficHistory.push({

                time: new Date().toLocaleTimeString([], {
                    minute: "2-digit",
                    second: "2-digit"
                }),

                // Flow during this interval
                vehicles: currentFlow

                // If you prefer cumulative values instead,
                // replace currentFlow with:
                // vehicles: this.stats.vehiclesPassed

            });

            if (this.trafficHistory.length > 12) {

                this.trafficHistory.shift();

            }

        }

// Notify UI
        if (
            now - this.lastRefresh >=
            this.settings.refreshRate
        ) {

            this.lastRefresh = now;

            this.notify();

        }
    }

    // =====================================
    // Lane Congestion
    // =====================================

    getLaneCongestion() {

        return {

            ...this.laneCongestion

        };

    }

    // =====================================
    // Junction Ranking
    // =====================================

    getRanking() {

        return Object.entries(

            this.laneCongestion

        )

            .map(([name, score]) => ({

                name,

                score: Math.min(

                    score * 20,

                    100

                )

            }))

            .sort(

                (a, b) =>

                    b.score - a.score

            );

    }

    // =====================================
    // Traffic History
    // =====================================

    getTrafficHistory() {

        return [

            ...this.trafficHistory

        ];

    }

    // =====================================
    // AI Prediction
    // =====================================
    getPrediction() {

        let recommendation = "Traffic Flow Normal";

        if (this.stats.congestion > 70) {

            recommendation = "Increase Green Time";

        }
        else if (this.stats.congestion > 40) {

            recommendation = "Monitor Queue";

        }

        // Dynamic confidence
        const confidence = Math.round(

            80 +

            (this.stats.fuelSaving * 0.15) -

            (this.stats.congestion * 0.10)

        );

        return {

            congestion: this.stats.congestion,

            confidence: Math.max(60, Math.min(99, confidence)),

            recommendation

        };

    }

    // =====================================
    // Performance Summary
    // =====================================

    getPerformance() {

        return {

            vehiclesPassed:
            this.stats.vehiclesPassed,

            throughput:
            this.stats.throughput,

            averageWait:
            this.stats.averageWait,

            fuelSaving:
            this.stats.fuelSaving,

            emergencyCount:
            this.stats.emergencyCount

        };

    }

    // =====================================
    // Backend Status
    // =====================================

    getSystemHealth() {

        return {

            simulation: "Running",

            ai: "Online",

            analytics: "Healthy",

            websocket: "Pending",

            database: "Pending"

        };

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

        this.listeners.forEach(

            listener =>

                listener(

                    this.getStats()

                )

        );

    }

    // =====================================
// Getter
// =====================================

    getStats() {

        return {

            ...this.stats,

            laneCongestion: {

                ...this.laneCongestion

            },

            trafficHistory: [

                ...this.trafficHistory

            ],

            prediction:

                this.getPrediction(),

            ranking:

                this.getRanking(),

            performance:

                this.getPerformance(),

            systemHealth:

                this.getSystemHealth(),

            timestamp: Date.now(),

            uptime:
                Date.now() - this.startTime

        };

    }

}

export default new AnalyticsEngine();