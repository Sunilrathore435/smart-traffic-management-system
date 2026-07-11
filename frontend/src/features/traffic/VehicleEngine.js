import SettingsEngine from "../settings/SettingsEngine";

class VehicleEngine {

    constructor() {

        this.vehicleGap = 45;

        this.lanes = [

            "north",
            "south",
            "east",
            "west"

        ];

        this.colors = [

            "cyan",
            "red",
            "green",
            "orange"

        ];

        // =====================================
        // Live Settings
        // =====================================

        this.settings =
            SettingsEngine.getSettings();

        SettingsEngine.subscribe(settings => {

            this.settings = settings;

            this.updateSettings();

        });

        this.vehicles = [];

        this.createVehicles();

    }

    // =====================================
    // Apply Settings
    // =====================================

    updateSettings() {

        this.vehicles.forEach(vehicle => {

            vehicle.speed =
                this.settings.vehicleSpeed;

        });

    }

    // =====================================
    // Initial Vehicles
    // =====================================

    createVehicles() {

        this.vehicles = [];

        let id = 1;

        this.lanes.forEach(lane => {

            for (let i = 0; i < 3; i++) {

                this.vehicles.push({

                    id: id++,

                    lane,

                    color:
                        this.colors[
                        (id - 2) %
                        this.colors.length
                            ],

                    position:
                        -(10 + i * this.vehicleGap),

                    speed:
                    this.settings.vehicleSpeed,

                    stopped: false

                });

            }

        });

    }

    // =====================================
    // All Vehicles
    // =====================================

    getVehicles() {

        return this.vehicles;

    }

    // =====================================
    // Update Vehicles
    // =====================================

    updateVehicles(callback) {

        this.vehicles = callback(this.vehicles);

    }

    // =====================================
    // Vehicles By Lane
    // =====================================

    getVehiclesByLane(lane) {

        return this.vehicles

            .filter(vehicle =>

                vehicle.lane === lane

            )

            .sort(

                (a, b) =>

                    b.position - a.position

            );

    }

    // =====================================
    // Queue Length
    // =====================================

    getQueueLength(lane) {

        return this.vehicles.filter(

            vehicle =>

                vehicle.lane === lane &&

                vehicle.stopped

        ).length;

    }

    // =====================================
    // Spawn Vehicle
    // =====================================

    addVehicle(lane) {

        const id =

            this.vehicles.length === 0

                ? 1

                : Math.max(

                ...this.vehicles.map(

                    vehicle => vehicle.id

                )

            ) + 1;

        this.vehicles.push({

            id,

            lane,

            color:

                this.colors[

                    Math.floor(

                        Math.random() *

                        this.colors.length

                    )

                    ],

            position: -120,

            speed:
            this.settings.vehicleSpeed,

            stopped: false

        });

    }

    // =====================================
    // Remove Vehicle
    // =====================================

    removeVehicle(id) {

        this.vehicles =

            this.vehicles.filter(

                vehicle =>

                    vehicle.id !== id

            );

    }

    // =====================================
    // Current Spawn Rate
    // =====================================

    getSpawnRate() {

        return this.settings.vehicleSpawnRate;

    }

    // =====================================
    // Vehicle Speed
    // =====================================

    getVehicleSpeed() {

        return this.settings.vehicleSpeed;

    }

    // =====================================
    // Reset
    // =====================================

    reset() {

        this.createVehicles();

    }

}

export default new VehicleEngine();