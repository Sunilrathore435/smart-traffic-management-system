package com.smarttraffic.backend.service;

import com.smarttraffic.backend.config.RuntimeSimulationState;
import com.smarttraffic.backend.dto.AddVehicleRequest;
import com.smarttraffic.backend.dto.TrafficLiveUpdate;
import com.smarttraffic.backend.dto.TrafficStatusResponse;
import com.smarttraffic.backend.engine.*;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalPhase;
import com.smarttraffic.backend.model.*;
import com.smarttraffic.backend.websocket.TrafficUpdatePublisher;
import org.springframework.stereotype.Service;
import com.smarttraffic.backend.dto.PedestrianRequest;
import java.time.LocalDateTime;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TrafficService {
    private final AdaptiveTrafficOptimizer adaptiveTrafficOptimizer;
    private final FixedTrafficOptimizer fixedTrafficOptimizer;
    private final RuntimeSimulationState runtimeState;
    private final SimulationHistoryService historyService;
    private final TrafficUpdatePublisher publisher;
    private final Intersection intersection =
            new Intersection(
                    "INT-001",
                    "Main Intersection",
                    23.2599,
                    77.4126
            );
    private final TrafficSignalStateMachine stateMachine;
    private final TrafficEngine trafficEngine;

   // private final AdaptiveTrafficOptimizer optimizer;

    private TrafficDecision latestDecision;

    private boolean emergencyActive = false;

    private Direction emergencyLane = null;

    public TrafficService(TrafficEngine trafficEngine,
                          SimulationHistoryService historyService,TrafficUpdatePublisher publisher, AdaptiveTrafficOptimizer adaptiveTrafficOptimizer,
                          FixedTrafficOptimizer fixedTrafficOptimizer,
                          TrafficSignalStateMachine stateMachine,
                          RuntimeSimulationState runtimeState) {

        this.trafficEngine = trafficEngine;
        this.stateMachine = stateMachine;
        this.adaptiveTrafficOptimizer = adaptiveTrafficOptimizer;
        this.fixedTrafficOptimizer = fixedTrafficOptimizer;
        this.runtimeState = runtimeState;
        this.historyService = historyService;
        this.publisher = publisher;
    }

    /**
     * Add a vehicle to the selected lane.
     */
    public void addVehicle(AddVehicleRequest request) {

        Vehicle vehicle = new Vehicle(
                request.getVehicleNumber(),
                request.getVehicleType()
        );

        intersection
                .getLane(request.getDirection())
                .addVehicle(vehicle);
    }
    /**
     * Register a pedestrian crossing request.
     */
    public void requestPedestrianCrossing(
            PedestrianRequest request) {

        intersection.setPedestrianWaiting(true);

        intersection.setPedestrianDirection(
                request.getDirection());

        intersection.setPedestrianRequestTime(
                LocalDateTime.now());
    }
    /**
     * Get current traffic status.
     */
    public TrafficStatusResponse getTrafficStatus() {

        Map<String, Integer> counts = new HashMap<>();

        for (Direction direction : Direction.values()) {

            counts.put(
                    direction.name(),
                    intersection.getLane(direction).getVehicleCount()
            );
        }

        TrafficDecision decision = getCurrentDecision();

        return new TrafficStatusResponse(
                runtimeState.getCurrentSignalPhase().name(),
                runtimeState.getDominantLane().name(),
                counts,
                runtimeState.isEmergencyTriggered(),
                runtimeState.isEmergencyTriggered()
                        ? runtimeState.getDominantLane().name()
                        : null,
                runtimeState.getRemainingTime()
        );
    }

    /**
     * Execute one simulation cycle.
     */
//    public TrafficDecision simulateTraffic() {
//
//        TrafficDecision decision = getCurrentDecision();
//
//        SimulationResult result =
//                trafficEngine.simulateCycle(
//                        intersection,
//                        decision
//                );
//
//        this.latestDecision = decision;
//
//        // Count one simulation cycle
//        runtimeState.incrementSimulationCycle();
//
//        if (result.getVehiclesPassed() > 0) {
//
//            TrafficSimulationRecord record =
//                    buildSimulationRecord(result);
//
//            historyService.saveSimulation(record);
//
//            // Count processed vehicles only once
//            intersection.incrementProcessedVehicles(
//                    result.getVehiclesPassed()
//            );
//
//            publisher.publishTrafficUpdate(
//                    buildLiveUpdate(record)
//            );
//
//            if (emergencyActive) {
//                clearEmergency();
//            }
//        }
//
//        return decision;
//    }
    public TrafficDecision simulateTraffic() {

        TrafficDecision decision = getCurrentDecision();
        latestDecision = decision;
        // Request emergency preemption if a cycle is already running
        if (stateMachine.isCycleRunning()
                && decision.getReason() != null
                && decision.getReason().toLowerCase().contains("emergency")
                && !stateMachine.isCurrentCycleEmergency()) {

            stateMachine.requestEmergencyPreemption(decision);
        }

        if (!stateMachine.isCycleRunning()) {

            stateMachine.startCycle(
                    intersection,
                    decision
            );

            this.latestDecision = decision;

            runtimeState.incrementSimulationCycle();

        } else {

            stateMachine.tick();

            if (!stateMachine.isCycleRunning()) {

                SimulationResult result =
                        stateMachine.getLatestResult();

                if (result != null && result.getVehiclesPassed() > 0) {

                    TrafficSimulationRecord record =
                            buildSimulationRecord(result);

                    historyService.saveSimulation(record);

                    intersection.incrementProcessedVehicles(
                            result.getVehiclesPassed()
                    );

                    publisher.publishTrafficUpdate(
                            buildLiveUpdate(record)
                    );
                }

                // ALWAYS clear emergency after the cycle finishes
                if (emergencyActive) {
                    clearEmergency();
                }
            }
        }

        return latestDecision;
    }
    /**
     * Build simulation history record.
     */
    private TrafficSimulationRecord buildSimulationRecord(
            SimulationResult result) {

        TrafficDecision decision = result.getDecision();

        return new TrafficSimulationRecord(

                intersection.getIntersectionId(),

                decision.getSignalPhase(),

                decision.getDominantLane(),

                decision.getGreenTime(),

                result.getVehiclesPassed(),

                result.getRemainingVehicles(),

                decision.getTrafficScore(),

                decision.getReason(),

                result.getQueueBefore(),

                result.getQueueAfter(),

                decision.getReason()
                        .toLowerCase()
                        .contains("emergency"),

                result.getSimulationTime(),

                result.getExecutionTimeMs()
        );
    }
    /**
     * Complete simulation history.
     */
    public List<TrafficSimulationRecord> getSimulationHistory() {

        return historyService.getAllSimulations();

    }

    /**
     * Latest simulation.
     */
    public TrafficSimulationRecord getLatestSimulation() {

        return historyService.getLatestSimulation();

    }

    /**
     * Current intersection.
     */
    public Intersection getIntersection() {

        return intersection;

    }

    public TrafficDecision getLatestDecision() {

        return latestDecision;

    }
    public TrafficDecision getCurrentDecision() {

        if (emergencyActive && emergencyLane != null) {

            SignalPhase phase =
                    (emergencyLane == Direction.NORTH || emergencyLane == Direction.SOUTH)
                            ? SignalPhase.NORTH_SOUTH
                            : SignalPhase.EAST_WEST;

            int greenTime = runtimeState.getEmergencyGreenTime();

            int northAllowed = 0;
            int southAllowed = 0;
            int eastAllowed = 0;
            int westAllowed = 0;

            if (phase == SignalPhase.NORTH_SOUTH) {

                northAllowed = intersection.getLane(Direction.NORTH).getVehicleCount();

                southAllowed = intersection.getLane(Direction.SOUTH).getVehicleCount();

            } else {

                eastAllowed = intersection.getLane(Direction.EAST).getVehicleCount();

                westAllowed = intersection.getLane(Direction.WEST).getVehicleCount();
            }

            return new TrafficDecision(

                    phase,

                    emergencyLane,

                    greenTime,

                    northAllowed,

                    southAllowed,

                    eastAllowed,

                    westAllowed,

                    100.0,

                    "Manual emergency override"

            );

        }

        if (runtimeState.isAdaptiveAI()) {
            return adaptiveTrafficOptimizer.optimize(intersection);
        }

        return fixedTrafficOptimizer.optimize(intersection);
    }
    /**
     * Activate emergency priority.
     */
    public void activateEmergency(Direction direction) {

        emergencyActive = true;

        emergencyLane = direction;

        intersection.setEmergencyActive(true);
        intersection.setEmergencyLane(direction);
        intersection.setDominantLane(direction);

    }

    /**
     * Clear emergency priority.
     */
    public void clearEmergency() {

        emergencyActive = false;

        emergencyLane = null;

        intersection.setEmergencyActive(false);
        intersection.setEmergencyLane(null);

    }

    public boolean isEmergencyActive() {

        return emergencyActive;

    }

    public Direction getEmergencyLane() {

        return emergencyLane;

    }
    private TrafficLiveUpdate buildLiveUpdate(
            TrafficSimulationRecord record) {

        return new TrafficLiveUpdate(

                record.getSignalPhase() == null
                        ? "NONE"
                        : record.getSignalPhase().name(),

                record.getDominantLane() == null
                        ? "NONE"
                        : record.getDominantLane().name(),

                record.getGreenTime(),

                record.getVehiclesPassed(),

                record.getRemainingVehicles(),

                record.getTrafficScore(),

                record.getReason(),

                record.getQueueBefore(),

                record.getQueueAfter(),

                record.getSimulationTime()
        );
    }


    }
