import EmergencyEngine from "./EmergencyEngine.js";
import SettingsEngine from "../settings/SettingsEngine";

class AIEngine {

    constructor() {

        this.lanes = [

            "north",
            "east",
            "south",
            "west"

        ];

        this.rotationOrder = [...this.lanes];

        this.EMERGENCY_GREEN = 20;

        // =====================================
        // Live Settings
        // =====================================

        this.settings =
            SettingsEngine.getSettings();

        SettingsEngine.subscribe(settings => {

            this.settings = settings;

        });

        this.lastDecision =
            this.createDecision();

    }

    // =====================================
    // Default Decision
    // =====================================

    createDecision() {

        return {

            lane: "north",

            score: 0,

            confidence: 98,

            greenTime:
            this.settings.minGreenTime,

            emergency: false,

            queues: this.emptyQueues()

        };

    }

    // =====================================
    // AI Analysis
    // =====================================

    analyze(vehicles) {

        const settings =
            this.settings;

        const emergency =
            EmergencyEngine.getStatus();

        // =====================================
        // Emergency Override
        // =====================================

        if (emergency.active) {

            this.lastDecision = {

                lane: emergency.lane,

                score: 999,

                confidence: 100,

                greenTime: this.EMERGENCY_GREEN,

                emergency: true,

                queues: this.emptyQueues()

            };

            return this.lastDecision;

        }

        // =====================================
        // Adaptive AI Disabled
        // =====================================

        if (!settings.adaptiveAI) {

            this.lastDecision = {

                lane: this.lastDecision.lane,

                score: 0,

                confidence: 100,

                greenTime:
                settings.minGreenTime,

                emergency: false,

                queues: this.emptyQueues()

            };

            return this.lastDecision;

        }

        // =====================================
        // Queue Detection
        // =====================================

        const queues =
            this.calculateQueues(vehicles);

        // =====================================
        // Lane Scores
        // =====================================

        const scores = {};

        this.lanes.forEach(lane => {

            scores[lane] = queues[lane] * 10;

        });

        // =====================================
        // Best Lane
        // =====================================

        const bestLane =
            this.selectLane(scores);

        // =====================================
        // Green Time
        // =====================================

        const greenTime = Math.max(

            settings.minGreenTime,

            Math.min(

                settings.maxGreenTime,

                queues[bestLane] * 3

            )

        );

        // =====================================
        // Confidence
        // =====================================

        const confidence = Math.min(

            99,

            90 + queues[bestLane]

        );

        // =====================================
        // Final Decision
        // =====================================

        this.lastDecision = {

            lane: bestLane,

            score: scores[bestLane],

            confidence,

            greenTime,

            emergency: false,

            queues

        };

        return this.lastDecision;

    }

    // =====================================
    // Queue Detection
    // =====================================

    calculateQueues(vehicles) {

        const queues =
            this.emptyQueues();

        vehicles.forEach(vehicle => {

            if (vehicle.position >= 40) {

                queues[vehicle.lane]++;

            }

        });

        return queues;

    }

    // =====================================
    // Empty Queue
    // =====================================

    emptyQueues() {

        return {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

    }

    // =====================================
    // Fair Rotation
    // =====================================

    selectLane(scores) {

        const maxScore =

            Math.max(

                ...Object.values(scores)

            );

        const candidates =

            this.lanes.filter(

                lane =>

                    scores[lane] === maxScore

            );

        if (candidates.length === 1) {

            return candidates[0];

        }

        const current =

            this.rotationOrder.indexOf(

                this.lastDecision.lane

            );

        for (

            let i = 1;

            i <= this.rotationOrder.length;

            i++

        ) {

            const lane =

                this.rotationOrder[

                (current + i) %

                this.rotationOrder.length

                    ];

            if (

                candidates.includes(lane)

            ) {

                return lane;

            }

        }

        return candidates[0];

    }

    // =====================================
    // Reset
    // =====================================

    reset() {

        this.lastDecision =
            this.createDecision();

    }

    // =====================================
    // Getter
    // =====================================

    getDecision() {

        return {

            ...this.lastDecision

        };

    }

}

export default new AIEngine();