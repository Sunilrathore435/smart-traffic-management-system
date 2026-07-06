package com.smarttraffic.backend.service;

import com.smarttraffic.backend.dto.AddVehicleRequest;
import com.smarttraffic.backend.dto.TrafficStatusResponse;
import com.smarttraffic.backend.engine.AdaptiveTrafficOptimizer;
import com.smarttraffic.backend.engine.TrafficEngine;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.Intersection;
import com.smarttraffic.backend.model.TrafficDecision;
import com.smarttraffic.backend.model.Vehicle;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TrafficService {

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
                          AdaptiveTrafficOptimizer optimizer) {

        this.trafficEngine = trafficEngine;
        this.optimizer = optimizer;
    }

    /**
     * Add vehicle into a lane.
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
     * Current traffic status.
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
     * Run one simulation cycle.
     */
    public TrafficDecision simulateTraffic() {

        return trafficEngine.simulateCycle(intersection);

    }

    /**
     * Return current intersection.
     */
    public Intersection getIntersection() {

        return intersection;

    }

}