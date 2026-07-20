package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.enums.*;
import com.smarttraffic.backend.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.smarttraffic.backend.config.RuntimeSimulationState;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class TrafficEngine {

    private final RuntimeSimulationState runtimeState;
    private QueueSnapshot queueBefore;
    private LocalDateTime simulationStartTime;
    private long executionStartTime;
    private int vehiclesPassed;
    private TrafficDecision currentDecision;
    public TrafficEngine(RuntimeSimulationState runtimeState) {
        this.runtimeState = runtimeState;
    }
    private static final Logger log =
            LoggerFactory.getLogger(TrafficEngine.class);
    /**
     * Executes one complete traffic signal cycle.
     */
    public SimulationResult simulateCycle(
            Intersection intersection,
            TrafficDecision decision) {

        LocalDateTime simulationStartTime =
                LocalDateTime.now();

        long startMillis =
                System.currentTimeMillis();

        log.info("========== Simulation Started ==========");

        QueueSnapshot beforeSnapshot =
                captureSnapshot(intersection);

        // Reset every signal
        resetSignals(intersection);

        // Store current state
        intersection.setCurrentSignalPhase(
                decision.getSignalPhase());

        intersection.setDominantLane(
                decision.getDominantLane());

        intersection.setCurrentStage(
                SimulationStage.VEHICLE_GREEN);

        runtimeState.setCurrentSignalPhase(
                decision.getSignalPhase());

        runtimeState.setDominantLane(
                decision.getDominantLane());

        runtimeState.setCurrentStage(
                SimulationStage.VEHICLE_GREEN);

        runtimeState.setPedestrianSignal(
                PedestrianSignal.DONT_WALK);

        runtimeState.setRemainingTime(
                decision.getGreenTime());

        intersection.setPhaseStartTime(
                simulationStartTime);

        activateSignalPhase(
                intersection,
                decision.getSignalPhase());

        log.info(
                "Phase : {}  Dominant : {}",
                decision.getSignalPhase(),
                decision.getDominantLane());

        int vehiclesPassed =
                processGreenPhase(
                        intersection,
                        decision);

// Yellow interval
        activateYellowPhase(intersection);

// All Red interval
        activateAllRedPhase(intersection);

// Execute pedestrian crossing only if requested
        if (intersection.isPedestrianWaiting()) {

            activatePedestrianPhase(intersection);

            // Future: countdown using RuntimeSimulationState

            deactivatePedestrianPhase(intersection);

            intersection.setPedestrianWaiting(false);

            intersection.setPedestrianDirection(null);

            intersection.setPedestrianRequestTime(null);
        }

        QueueSnapshot afterSnapshot =
                captureSnapshot(intersection);

        long executionTime =
                System.currentTimeMillis()
                        - startMillis;

        log.info(
                "Simulation completed in {} ms",
                executionTime);

        return new SimulationResult(

                decision,

                beforeSnapshot,

                afterSnapshot,

                vehiclesPassed,

                calculateRemainingVehicles(intersection),

                simulationStartTime,

                executionTime
        );
    }
    /**
     * Reset every signal to RED.
     */
    private void resetSignals(
            Intersection intersection) {

        for (TrafficLane lane :
                intersection.getAllLanes().values()) {

            lane.setSignalStatus(
                    SignalStatus.RED);
        }
    }

    /**
     * Activate current signal phase.
     */
    private void activateSignalPhase(
            Intersection intersection,
            SignalPhase phase) {

        switch (phase) {

            case NORTH_SOUTH -> {

                intersection.getLane(Direction.NORTH)
                        .setSignalStatus(SignalStatus.GREEN);

                intersection.getLane(Direction.SOUTH)
                        .setSignalStatus(SignalStatus.GREEN);
            }

            case EAST_WEST -> {

                intersection.getLane(Direction.EAST)
                        .setSignalStatus(SignalStatus.GREEN);

                intersection.getLane(Direction.WEST)
                        .setSignalStatus(SignalStatus.GREEN);
            }
        }
    }

    /**
     * Process vehicles during GREEN phase.
     */
    private int processGreenPhase(
            Intersection intersection,
            TrafficDecision decision) {

        int passed = 0;

        Direction dominant =
                decision.getDominantLane();

        passed += processLane(
                intersection.getLane(dominant),
                getAllowedVehicles(
                        decision,
                        dominant));

        Direction secondary =
                getSecondaryLane(
                        decision.getSignalPhase(),
                        dominant);

        passed += processLane(
                intersection.getLane(secondary),
                getAllowedVehicles(
                        decision,
                        secondary));

        return passed;
    }
    /**
     * Remove vehicles from one lane.
     */
    private int processLane(
            TrafficLane lane,
            int vehiclesAllowed) {

        int passed = 0;

        while (!lane.isEmpty()
                && passed < vehiclesAllowed) {

            Vehicle vehicle = lane.removeVehicle();

            log.info(
                    "Vehicle Passed : {}",
                    vehicle.getVehicleNumber());

            passed++;
        }

        return passed;
    }

    /**
     * Vehicles allowed for a specific direction.
     */
    private int getAllowedVehicles(
            TrafficDecision decision,
            Direction direction) {

        return switch (direction) {

            case NORTH ->
                    decision.getNorthVehiclesAllowed();

            case SOUTH ->
                    decision.getSouthVehiclesAllowed();

            case EAST ->
                    decision.getEastVehiclesAllowed();

            case WEST ->
                    decision.getWestVehiclesAllowed();
        };
    }

    /**
     * Returns the second lane in the active phase.
     */
    private Direction getSecondaryLane(
            SignalPhase phase,
            Direction dominant) {

        if (phase == SignalPhase.NORTH_SOUTH) {

            return dominant == Direction.NORTH
                    ? Direction.SOUTH
                    : Direction.NORTH;
        }

        return dominant == Direction.EAST
                ? Direction.WEST
                : Direction.EAST;
    }

    /**
     * Total remaining vehicles.
     */
    private int calculateRemainingVehicles(
            Intersection intersection) {

        int remaining = 0;

        for (Direction direction : Direction.values()) {

            remaining += intersection
                    .getLane(direction)
                    .getVehicleCount();
        }

        return remaining;
    }

    /**
     * Capture queue snapshot.
     */
    private QueueSnapshot captureSnapshot(
            Intersection intersection) {

        QueueSnapshot snapshot =
                new QueueSnapshot();

        for (Direction direction :
                Direction.values()) {

            snapshot.setQueue(
                    direction,
                    intersection
                            .getLane(direction)
                            .getVehicleCount());
        }

        return snapshot;
    }

    /**
     * Switch active phase to YELLOW.
     */
    public void activateYellowPhase(
            Intersection intersection) {

        intersection.setCurrentStage(
                SimulationStage.VEHICLE_YELLOW);
        runtimeState.setCurrentStage(
                SimulationStage.VEHICLE_YELLOW);

        runtimeState.setRemainingTime(
                runtimeState.getYellowTime());

        for (TrafficLane lane :
                intersection.getAllLanes().values()) {

            if (lane.getSignalStatus()
                    == SignalStatus.GREEN) {

                lane.setSignalStatus(
                        SignalStatus.YELLOW);
            }
        }

        log.info("Yellow phase activated.");
    }

    /**
     * Switch every signal to ALL RED.
     */
    public void activateAllRedPhase(
            Intersection intersection) {

        intersection.setCurrentStage(
                SimulationStage.ALL_RED);
        runtimeState.setCurrentStage(
                SimulationStage.ALL_RED);

        runtimeState.setRemainingTime(
                runtimeState.getAllRedTime());

        resetSignals(intersection);

        log.info("All-Red phase activated.");
    }

    /**
     * Activate pedestrian crossing.
     */
    public void activatePedestrianPhase(
            Intersection intersection) {

        intersection.setCurrentStage(
                SimulationStage.PEDESTRIAN_WALK);

        intersection.setPedestrianSignal(
                PedestrianSignal.WALK);
        runtimeState.setCurrentStage(
                SimulationStage.PEDESTRIAN_WALK);

        runtimeState.setPedestrianSignal(
                PedestrianSignal.WALK);

        runtimeState.setRemainingTime(
                runtimeState.getPedestrianWalkTime());

        resetSignals(intersection);

        log.info("Pedestrian WALK phase activated.");
    }

    /**
     * Finish pedestrian crossing.
     */
    public void deactivatePedestrianPhase(
            Intersection intersection) {

        intersection.setPedestrianSignal(
                PedestrianSignal.DONT_WALK);
        runtimeState.setPedestrianSignal(
                PedestrianSignal.DONT_WALK);

        activateAllRedPhase(intersection);

        log.info("Pedestrian phase finished.");
    }

    public void startCycle(
            Intersection intersection,
            TrafficDecision decision) {
        System.out.println(
                "START CYCLE -> " +
                        decision.getReason() +
                        " | Stage = " + runtimeState.getCurrentStage() +
                        " | Green = " + decision.getGreenTime()
        );
        simulationStartTime = LocalDateTime.now();
        executionStartTime = System.currentTimeMillis();

        currentDecision = decision;

        queueBefore = captureSnapshot(intersection);

        resetSignals(intersection);

        intersection.setCurrentSignalPhase(decision.getSignalPhase());
        intersection.setDominantLane(decision.getDominantLane());
        intersection.setCurrentStage(SimulationStage.VEHICLE_GREEN);

        runtimeState.setCurrentSignalPhase(decision.getSignalPhase());
        runtimeState.setDominantLane(decision.getDominantLane());
        runtimeState.setCurrentStage(SimulationStage.VEHICLE_GREEN);
        runtimeState.setPedestrianSignal(PedestrianSignal.DONT_WALK);
        runtimeState.setRemainingTime(decision.getGreenTime());

        activateSignalPhase(
                intersection,
                decision.getSignalPhase());

        vehiclesPassed = processGreenPhase(
                intersection,
                decision);

        log.info("Green phase started.");
    }
    public void tick() {
        System.out.println(
                "Tick -> Stage: " + runtimeState.getCurrentStage()
                        + " Remaining: " + runtimeState.getRemainingTime()
        );
        if (runtimeState.getRemainingTime() > 0) {

            runtimeState.setRemainingTime(
                    runtimeState.getRemainingTime() - 1
            );
        }
    }
    public SimulationResult finishCycle(Intersection intersection) {

        QueueSnapshot queueAfter = captureSnapshot(intersection);

        long executionTime =
                System.currentTimeMillis() - executionStartTime;

        SimulationResult result = new SimulationResult(
                currentDecision,
                queueBefore,
                queueAfter,
                vehiclesPassed,
                calculateRemainingVehicles(intersection),
                simulationStartTime,
                executionTime
        );

        // Optional cleanup
        queueBefore = null;
        currentDecision = null;
        vehiclesPassed = 0;

        return result;
    }
    public void activatePedestrianFlashPhase(Intersection intersection) {

        runtimeState.setCurrentStage(
                SimulationStage.PEDESTRIAN_FLASH
        );

        runtimeState.setPedestrianSignal(
                PedestrianSignal.FLASHING_DONT_WALK
        );

        runtimeState.setRemainingTime(
                runtimeState.getPedestrianFlashTime()
        );

        log.info("Pedestrian FLASHING DON'T WALK phase activated.");
    }

}