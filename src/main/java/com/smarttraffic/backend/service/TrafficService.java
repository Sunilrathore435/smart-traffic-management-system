package com.smarttraffic.backend.service;

import com.smarttraffic.backend.dto.AddVehicleRequest;
import com.smarttraffic.backend.dto.TrafficLiveUpdate;
import com.smarttraffic.backend.dto.TrafficStatusResponse;
import com.smarttraffic.backend.engine.AdaptiveTrafficOptimizer;
import com.smarttraffic.backend.engine.SimulationResult;
import com.smarttraffic.backend.engine.TrafficEngine;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.*;
import com.smarttraffic.backend.websocket.TrafficUpdatePublisher;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TrafficService {

    private final SimulationHistoryService historyService;
    private final TrafficUpdatePublisher publisher;
    private final Intersection intersection =
            new Intersection(
                    "INT-001",
                    "Main Intersection",
                    23.2599,
                    77.4126
            );

    private final TrafficEngine trafficEngine;

    private final AdaptiveTrafficOptimizer optimizer;

    private TrafficDecision latestDecision;

    private boolean emergencyActive = false;

    private Direction emergencyLane = null;

    public TrafficService(TrafficEngine trafficEngine,
                          AdaptiveTrafficOptimizer optimizer,
                          SimulationHistoryService historyService,TrafficUpdatePublisher publisher) {

        this.trafficEngine = trafficEngine;
        this.optimizer = optimizer;
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
                decision.getGreenLane().name(),
                counts
        );
    }

    /**
     * Execute one simulation cycle.
     */
    public TrafficDecision simulateTraffic() {

        TrafficDecision decision = getCurrentDecision();

        SimulationResult result =
                trafficEngine.simulateCycle(
                        intersection,
                        decision
                );

        this.latestDecision = decision;

        if (result.getVehiclesPassed() > 0) {

            TrafficSimulationRecord record =
                    buildSimulationRecord(result);

            historyService.saveSimulation(record);

            intersection.incrementProcessedVehicles(
                    result.getVehiclesPassed()
            );

            publisher.publishTrafficUpdate(
                    buildLiveUpdate(record)
            );

            // ==========================================
            // Clear manual emergency after simulation
            // ==========================================

            if (emergencyActive) {

                clearEmergency();

            }
        }

        return decision;
    }

    /**
     * Build simulation history record.
     */
    private TrafficSimulationRecord buildSimulationRecord(
            SimulationResult result) {

        TrafficDecision decision = result.getDecision();

        return new TrafficSimulationRecord(

                intersection.getIntersectionId(),

                decision.getGreenLane(),

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

            return new TrafficDecision(

                    emergencyLane,

                    40,

                    Math.max(

                            1,

                            intersection
                                    .getLane(emergencyLane)
                                    .getVehicleCount()

                    ),

                    9999,

                    "Manual emergency override"

            );
        }

        return optimizer.optimize(intersection);

    }
    /**
     * Activate emergency priority.
     */
    public void activateEmergency(Direction direction) {

        emergencyActive = true;

        emergencyLane = direction;

        intersection.setCurrentGreenLane(direction);

    }

    /**
     * Clear emergency priority.
     */
    public void clearEmergency() {

        emergencyActive = false;

        emergencyLane = null;

        intersection.setCurrentGreenLane(Direction.NORTH);

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

                record.getSelectedLane().name(),

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