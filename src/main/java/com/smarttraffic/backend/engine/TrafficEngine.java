package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.model.Intersection;
import com.smarttraffic.backend.model.TrafficDecision;
import com.smarttraffic.backend.model.TrafficLane;
import com.smarttraffic.backend.model.Vehicle;
import org.springframework.stereotype.Component;

@Component
public class TrafficEngine {

    private final TrafficOptimizer trafficOptimizer;

    public TrafficEngine(TrafficOptimizer trafficOptimizer) {
        this.trafficOptimizer = trafficOptimizer;
    }

    /**
     * Executes one complete traffic simulation cycle.
     */
    public TrafficDecision simulateCycle(Intersection intersection) {

        // Step 1: Ask optimizer to make a decision
        TrafficDecision decision = trafficOptimizer.optimize(intersection);

        // Step 2: Get selected lane
        TrafficLane lane = intersection.getLane(decision.getGreenLane());

        int vehiclesPassed = 0;

        System.out.println("\n========================================");
        System.out.println("SMART TRAFFIC DECISION");
        System.out.println("========================================");
        System.out.println("Green Lane        : " + decision.getGreenLane());
        System.out.println("Green Time        : " + decision.getGreenTime() + " sec");
        System.out.println("Vehicles Allowed  : " + decision.getVehiclesAllowed());
        System.out.println("Traffic Score     : " + decision.getTrafficScore());
        System.out.println("Reason            : " + decision.getReason());
        System.out.println("========================================");

        // Step 3: Allow vehicles to pass
        while (!lane.isEmpty()
                && vehiclesPassed < decision.getVehiclesAllowed()) {

            Vehicle vehicle = lane.removeVehicle();

            System.out.println(
                    "Vehicle Passed : "
                            + vehicle.getVehicleNumber()
                            + " ("
                            + vehicle.getVehicleType()
                            + ")"
            );

            vehiclesPassed++;
        }

        // Step 4: Update execution result
        decision.setVehiclesPassed(vehiclesPassed);
        decision.setRemainingVehicles(lane.getVehicleCount());

        return decision;
    }
}