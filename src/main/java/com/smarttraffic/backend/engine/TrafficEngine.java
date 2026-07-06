package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalStatus;
import com.smarttraffic.backend.model.*;
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
    public SimulationResult simulateCycle(Intersection intersection) {

        // STEP 1 : Capture queue BEFORE simulation
        QueueSnapshot beforeSnapshot = captureSnapshot(intersection);

        // STEP 2 : Ask optimizer for best decision
        TrafficDecision decision = trafficOptimizer.optimize(intersection);

        // STEP 3 : Reset all signals
        resetSignals(intersection);

        // STEP 4 : Turn selected lane GREEN
        TrafficLane lane = intersection.getLane(decision.getGreenLane());

        lane.setSignalStatus(SignalStatus.GREEN);

        intersection.setCurrentGreenLane(decision.getGreenLane());

        System.out.println("\n========================================");
        System.out.println("QUEUE BEFORE");
        System.out.println(beforeSnapshot);
        System.out.println("========================================");

        System.out.println("SMART TRAFFIC DECISION");
        System.out.println("========================================");
        System.out.println("Green Lane        : " + decision.getGreenLane());
        System.out.println("Green Time        : " + decision.getGreenTime() + " sec");
        System.out.println("Vehicles Allowed  : " + decision.getVehiclesAllowed());
        System.out.println("Traffic Score     : " + decision.getTrafficScore());
        System.out.println("Reason            : " + decision.getReason());
        System.out.println("========================================");

        System.out.println("🟢 GREEN SIGNAL -> " + decision.getGreenLane());

        int vehiclesPassed = 0;

        // STEP 5 : Vehicles Cross
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

        // STEP 6 : GREEN -> YELLOW
        lane.setSignalStatus(SignalStatus.YELLOW);

        System.out.println("🟡 YELLOW SIGNAL -> " + decision.getGreenLane());

        // STEP 7 : YELLOW -> RED
        lane.setSignalStatus(SignalStatus.RED);

        System.out.println("🔴 RED SIGNAL -> " + decision.getGreenLane());

        // STEP 8 : Capture queue AFTER simulation
        QueueSnapshot afterSnapshot = captureSnapshot(intersection);

        System.out.println("\n========================================");
        System.out.println("QUEUE AFTER");
        System.out.println(afterSnapshot);
        System.out.println("========================================");

        // STEP 9 : Build simulation result

        return new SimulationResult(
                decision,
                beforeSnapshot,
                afterSnapshot,
                vehiclesPassed,
                lane.getVehicleCount()
        );
    }

    /**
     * Set all traffic signals to RED.
     */
    private void resetSignals(Intersection intersection) {

        for (TrafficLane lane : intersection.getAllLanes().values()) {

            lane.setSignalStatus(SignalStatus.RED);

        }
    }

    private QueueSnapshot captureSnapshot(Intersection intersection) {

        QueueSnapshot snapshot = new QueueSnapshot();

        for (Direction direction : Direction.values()) {

            snapshot.setQueue(
                    direction,
                    intersection.getLane(direction).getVehicleCount()
            );
        }

        return snapshot;
    }
}