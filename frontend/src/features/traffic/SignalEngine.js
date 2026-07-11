import AIEngine from "./AIEngine";
import EmergencyEngine from "./EmergencyEngine";
import HistoryEngine from "../history/HistoryEngine";

class SignalEngine {

    constructor() {

        this.lanes = [

            "north",
            "east",
            "south",
            "west"

        ];

        this.currentGreen = "north";

        this.phase = "green";

        this.signals = {};

        this.lanes.forEach(lane => {

            this.signals[lane] = "red";

        });

        this.updateSignals();

    }

    // =====================================
    // Update Signal Colors
    // =====================================

    updateSignals() {

        this.lanes.forEach(lane => {

            this.signals[lane] = "red";

        });

        this.signals[this.currentGreen] = this.phase;

    }

    // =====================================
    // Change Signal Phase
    // =====================================

    setPhase(lane, phase = "green") {

        this.currentGreen = lane;

        this.phase = phase;

        this.updateSignals();

    }

    // =====================================
    // AI Chooses Lane
    // =====================================

    chooseLane(vehicles) {

        const emergency =
            EmergencyEngine.getStatus();

        // Emergency always has priority

        if (emergency.active) {

            this.setPhase(emergency.lane);

            return;

        }

        const decision =
            AIEngine.analyze(vehicles);

        this.setPhase(decision.lane);

    }

    // =====================================
    // Green → Yellow
    // =====================================

    startYellow() {

        if (EmergencyEngine.getStatus().active) {

            return;

        }

        this.phase = "yellow";

        this.updateSignals();

    }

    // =====================================
    // Emergency Override
    // =====================================

    setGreenLane(lane) {

        if (!this.lanes.includes(lane)) {

            return;

        }

        EmergencyEngine.activate(lane);

        this.setPhase(lane);

        HistoryEngine.addEvent({

            category: "EMERGENCY",

            severity: "HIGH",

            title: "Emergency Activated",

            description:
                `${lane.toUpperCase()} lane granted immediate priority`

        });

    }

    // =====================================
    // Resume AI
    // =====================================

    resumeAI() {

        EmergencyEngine.clear();

        HistoryEngine.addEvent({

            category: "EMERGENCY",

            severity: "INFO",

            title: "Emergency Cleared",

            description:
                "AI resumed adaptive traffic optimization"

        });

    }

    // =====================================
    // Current State
    // =====================================

    getState() {

        return {

            currentGreen: this.currentGreen,

            phase: this.phase,

            signals: {

                ...this.signals

            }

        };

    }

    // =====================================
    // Getters
    // =====================================

    getSignals() {

        return {

            ...this.signals

        };

    }

    getCurrentGreen() {

        return this.currentGreen;

    }

    getCurrentPhase() {

        return this.phase;

    }

    getDecision() {

        const decision = AIEngine.getDecision();

        const emergency = EmergencyEngine.getStatus();

        if (emergency.active) {

            return {

                ...decision,

                lane: emergency.lane,

                emergency: true

            };

        }

        return decision;

    }

}

export default new SignalEngine();