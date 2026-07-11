import SettingsEngine from "../settings/SettingsEngine";

class EmergencyEngine {

    constructor() {

        this.settings =
            SettingsEngine.getSettings();

        SettingsEngine.subscribe(settings => {

            this.settings = settings;

        });

        this.reset();

    }

    // =====================================
    // Default State
    // =====================================

    createState() {

        return {

            active: false,

            lane: null,

            vehicleId: null,

            startedAt: null

        };

    }

    // =====================================
    // Reset
    // =====================================

    reset() {

        const state = this.createState();

        this.active = state.active;

        this.lane = state.lane;

        this.vehicleId = state.vehicleId;

        this.startedAt = state.startedAt;

    }

    // =====================================
    // Detect Emergency Vehicle
    // =====================================

    detect(vehicles) {

        const emergencyVehicle = vehicles.find(

            vehicle => vehicle.type === "emergency"

        );

        if (emergencyVehicle) {

            this.activate(

                emergencyVehicle.lane,

                emergencyVehicle.id

            );

        }

        return this.getStatus();

    }

    // =====================================
    // Activate
    // =====================================

    activate(lane, vehicleId = null) {

        if (

            this.active &&

            this.lane === lane &&

            this.vehicleId === vehicleId

        ) {

            return;

        }

        this.active = true;

        this.lane = lane;

        this.vehicleId = vehicleId;

        this.startedAt = Date.now();

    }

    // =====================================
    // Auto Clear
    // =====================================

    update() {

        if (!this.active) {

            return;

        }

        const duration =

            this.settings.emergencyDuration * 1000;

        if (

            Date.now() - this.startedAt >= duration

        ) {

            this.clear();

        }

    }

    // =====================================
    // Clear
    // =====================================

    clear() {

        this.reset();

    }

    // =====================================
    // Active?
    // =====================================

    isActive() {

        return this.active;

    }

    // =====================================
    // Duration
    // =====================================

    getDuration() {

        if (!this.active) {

            return 0;

        }

        return Date.now() - this.startedAt;

    }

    // =====================================
    // Remaining Time
    // =====================================

    getRemainingTime() {

        if (!this.active) {

            return 0;

        }

        return Math.max(

            0,

            this.settings.emergencyDuration -

            Math.floor(this.getDuration() / 1000)

        );

    }

    // =====================================
    // Status
    // =====================================

    getStatus() {

        return {

            active: this.active,

            lane: this.lane,

            vehicleId: this.vehicleId,

            startedAt: this.startedAt,

            duration: this.getDuration(),

            remaining:

                this.getRemainingTime()

        };

    }

}

export default new EmergencyEngine();