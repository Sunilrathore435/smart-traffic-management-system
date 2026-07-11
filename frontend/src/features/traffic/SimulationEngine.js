import SignalEngine from "./SignalEngine";
import VehicleEngine from "./VehicleEngine";
import EmergencyEngine from "./EmergencyEngine";
import AnalyticsEngine from "./AnalyticsEngine";
import SettingsEngine from "../settings/SettingsEngine";

class SimulationEngine {

    constructor() {

        this.listeners = [];

        this.timer = null;

        this.lastSignalChange = Date.now();

        this.lastSpawn = Date.now();

        this.yellowDuration = 2000;

        this.stopLine = 95;

        this.vehicleGap = 42;

        this.settings =
            SettingsEngine.getSettings();

        SettingsEngine.subscribe(settings => {

            this.settings = settings;

        });

    }


    // =====================================
    // Start Simulation
    // =====================================

    start() {

        if (this.timer) return;

        // =====================================
// Auto Simulation
// =====================================



        this.timer = setInterval(() => {
            if (!this.settings.autoSimulation) {

                return;

            }
            const now = Date.now();
            EmergencyEngine.update();
            const decision =
                SignalEngine.getDecision();
            const greenDuration =
                (decision?.greenTime || 8) * 1000;
            const interval =
                SignalEngine.getCurrentPhase() === "green"
                    ? greenDuration
                    : this.yellowDuration;

            // =====================================
            // Signal Update
            // =====================================

            if (now - this.lastSignalChange >= interval) {

                const vehicles =
                    VehicleEngine.getVehicles();

                if (SignalEngine.getCurrentPhase() === "green") {

                    SignalEngine.startYellow();

                }

                else {

                    SignalEngine.chooseLane(
                        vehicles
                    );

                }

                this.lastSignalChange = now;

            }

            const vehicles =
                VehicleEngine.getVehicles();

            const signals =
                SignalEngine.getSignals();

            // =====================================
// Dynamic Vehicle Spawn
// =====================================

            const spawnInterval =

                12000 /

                Math.max(

                    1,

                    this.settings.vehicleSpawnRate

                );

            if (

                now - this.lastSpawn >=

                spawnInterval

            ) {

                const lanes = [

                    "north",

                    "east",

                    "south",

                    "west"

                ];

                const lane =

                    lanes[

                        Math.floor(

                            Math.random() *

                            lanes.length

                        )

                        ];

                if (

                    VehicleEngine.getVehicles().length < 40

                ) {

                    VehicleEngine.addVehicle(lane);

                }

                this.lastSpawn = now;

            }

            // =====================================
            // Vehicle Simulation
            // =====================================

            VehicleEngine.updateVehicles((list) => {

                const updated = [...list];

                ["north", "south", "east", "west"].forEach(lane => {

                    const laneVehicles = updated

                        .filter(vehicle => vehicle.lane === lane)

                        .sort((a, b) => b.position - a.position);

                    laneVehicles.forEach((vehicle, index) => {

                        const signal =
                            signals[lane];

                        const nextPosition =
                            vehicle.position + vehicle.speed;

                        vehicle.stopped = false;

                        // Lead Vehicle

                        if (index === 0) {

                            if (

                                (signal === "red" ||

                                    signal === "yellow") &&

                                nextPosition >= this.stopLine

                            ) {

                                vehicle.position =
                                    this.stopLine;

                                vehicle.stopped = true;

                            }

                            else {

                                vehicle.position =
                                    nextPosition;

                            }

                        }

                        // Queue Logic

                        else {

                            const front =
                                laneVehicles[index - 1];

                            const target =
                                front.position - this.vehicleGap;

                            if (nextPosition >= target) {

                                vehicle.position = target;

                                vehicle.stopped = true;

                            }

                            else {

                                vehicle.position =
                                    nextPosition;

                            }

                        }

                        // Respawn

                        if (vehicle.position > 220) {

                            AnalyticsEngine.vehiclePassed();

                            vehicle.position = -120;

                            vehicle.stopped = false;

                        }

                    });

                });

                return updated;

            });

            // =====================================
            // Analytics
            // =====================================

            AnalyticsEngine.update(

                vehicles,

                signals,

                SignalEngine.getDecision()

            );

            // =====================================
            // Notify UI
            // =====================================

            this.notify();

        }, 40);

    }

    // =====================================
    // Emergency Trigger
    // =====================================

    triggerEmergency(lane) {

        EmergencyEngine.activate(lane);

        AnalyticsEngine.registerEmergency();

        SignalEngine.setGreenLane(lane);

        this.lastSignalChange = Date.now();

        this.notify();

    }

    // =====================================
    // Clear Emergency
    // =====================================

    clearEmergency() {

        SignalEngine.resumeAI();

        SignalEngine.chooseLane(

            VehicleEngine.getVehicles()

        );

        this.lastSignalChange = Date.now();

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

    // =====================================
    // Current Simulation State
    // =====================================

    getState() {

        return {

            signals:
                SignalEngine.getSignals(),

            vehicles:
                VehicleEngine.getVehicles(),

            ai:
                SignalEngine.getDecision(),

            analytics:
                AnalyticsEngine.getStats(),

            emergency:
                EmergencyEngine.getStatus()

        };

    }

    // =====================================
    // Notify React
    // =====================================

    notify() {

        const state =
            this.getState();

        this.listeners.forEach(

            listener => listener(state)

        );

    }

}

export default new SimulationEngine();