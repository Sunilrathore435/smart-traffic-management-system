package com.smarttraffic.backend.service;

import com.smarttraffic.backend.dto.AddVehicleRequest;
import com.smarttraffic.backend.dto.TrafficStatusResponse;
import com.smarttraffic.backend.engine.AdaptiveTrafficOptimizer;
import com.smarttraffic.backend.engine.TrafficEngine;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TrafficService {

    private final SimulationHistoryService historyService;

    private final Intersection intersection =
            new Intersection(
                    "INT-001",
                    "Main Intersection",
                    23.2599,
                    77.4126
            );

    private final TrafficEngine trafficEngine;

    private final AdaptiveTrafficOptimizer optimizer;

    public TrafficService(TrafficEngine trafficEngine,
                          AdaptiveTrafficOptimizer optimizer,
                          SimulationHistoryService historyService) {

        this.trafficEngine = trafficEngine;
        this.optimizer = optimizer;
        this.historyService = historyService;
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

        TrafficDecision decision = optimizer.optimize(intersection);

        return new TrafficStatusResponse(
                decision.getGreenLane().name(),
                counts
        );
    }

    /**
     * Execute one simulation cycle.
     */
    public TrafficDecision simulateTraffic() {

        TrafficDecision decision =
                trafficEngine.simulateCycle(intersection);

        // Save only meaningful simulations
        if (decision.getVehiclesPassed() > 0) {

            historyService.saveSimulation(
                    buildSimulationRecord(decision)
            );

            intersection.incrementProcessedVehicles(
                    decision.getVehiclesPassed()
            );
        }

        return decision;
    }

    /**
     * Build simulation history record.
     */
    private TrafficSimulationRecord buildSimulationRecord(
            TrafficDecision decision) {

        return new TrafficSimulationRecord(
                intersection.getIntersectionId(),
                decision.getGreenLane(),
                decision.getGreenTime(),
                decision.getVehiclesPassed(),
                decision.getTrafficScore(),
                decision.getReason()
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
}