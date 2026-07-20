package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.config.RuntimeSimulationState;
import com.smarttraffic.backend.enums.SimulationStage;
import com.smarttraffic.backend.model.Intersection;
import com.smarttraffic.backend.model.TrafficDecision;
import org.springframework.stereotype.Component;

@Component
public class TrafficSignalStateMachine {

    private final RuntimeSimulationState runtimeState;
    private final TrafficEngine trafficEngine;

    private SimulationResult latestResult;

    private Intersection intersection;

    private TrafficDecision currentDecision;

    /**
     * Emergency waiting for safe preemption.
     */
    private TrafficDecision pendingEmergencyDecision;

    /**
     * Is a traffic cycle currently running?
     */
    private boolean cycleRunning = false;

    public TrafficSignalStateMachine(
            RuntimeSimulationState runtimeState,
            TrafficEngine trafficEngine) {

        this.runtimeState = runtimeState;
        this.trafficEngine = trafficEngine;
    }

    /**
     * Starts a new traffic signal cycle.
     */
    public void startCycle(
            Intersection intersection,
            TrafficDecision decision) {

        this.intersection = intersection;
        this.currentDecision = decision;

        this.cycleRunning = true;

        trafficEngine.startCycle(intersection, decision);
    }

    /**
     * Called by TrafficService when an emergency is detected.
     */
    public void requestEmergencyPreemption(
            TrafficDecision emergencyDecision) {

        System.out.println(
                "Preemption Requested -> Stage = "
                        + runtimeState.getCurrentStage()
                        + " | Pending = "
                        + (pendingEmergencyDecision != null)
        );

        if (pendingEmergencyDecision != null) {
            return;
        }

        pendingEmergencyDecision = emergencyDecision;
    }
    /**
     * Executes one timer tick.
     */
    public void tick() {
        System.out.println(
                "Tick -> Stage = "
                        + runtimeState.getCurrentStage()
                        + " | Pending = "
                        + (pendingEmergencyDecision != null)
        );
        if (!cycleRunning) {
            return;
        }

        // Emergency waiting while GREEN is active
        if (pendingEmergencyDecision != null
                && runtimeState.getCurrentStage()
                == SimulationStage.VEHICLE_GREEN) {

            trafficEngine.activateYellowPhase(intersection);
            return;
        }

        // Normal countdown
        trafficEngine.tick();

        if (runtimeState.getRemainingTime() == 0) {
            nextStage();
        }
    }

    /**
     * Move to the next stage.
     */
    private void nextStage() {

        switch (runtimeState.getCurrentStage()) {

            case VEHICLE_GREEN ->
                    trafficEngine.activateYellowPhase(intersection);

            case VEHICLE_YELLOW ->
                    trafficEngine.activateAllRedPhase(intersection);

            case ALL_RED -> {

                // Emergency has highest priority
                if (pendingEmergencyDecision != null) {

                    currentDecision = pendingEmergencyDecision;
                    pendingEmergencyDecision = null;

                    trafficEngine.startCycle(
                            intersection,
                            currentDecision
                    );

                    return;
                }

                // Pedestrian crossing
                if (runtimeState.isPedestrianEnabled()
                        && intersection.isPedestrianWaiting()) {

                    trafficEngine.activatePedestrianPhase(intersection);

                } else {

                    finishCycle();
                }
            }

            case PEDESTRIAN_WALK ->

                    trafficEngine.activatePedestrianFlashPhase(intersection);

            case PEDESTRIAN_FLASH -> {

                trafficEngine.deactivatePedestrianPhase(intersection);

                finishCycle();
            }
        }
    }

    /**
     * Finish current cycle.
     */
    private void finishCycle() {

        latestResult = trafficEngine.finishCycle(intersection);

        cycleRunning = false;

        pendingEmergencyDecision = null;

        runtimeState.setEmergencyTriggered(false);

        intersection.setPedestrianWaiting(false);
        intersection.setPedestrianDirection(null);
        intersection.setPedestrianRequestTime(null);
    }

    public SimulationResult getLatestResult() {
        return latestResult;
    }

    public void stopCycle() {
        cycleRunning = false;
    }

    public boolean isCycleRunning() {
        return cycleRunning;
    }

    public Intersection getIntersection() {
        return intersection;
    }

    public TrafficDecision getCurrentDecision() {
        return currentDecision;
    }

    public boolean isCurrentCycleEmergency() {

        return currentDecision != null
                && currentDecision.getReason() != null
                && currentDecision.getReason()
                .equals("Manual emergency override");
    }
}