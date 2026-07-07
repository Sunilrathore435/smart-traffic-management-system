package com.smarttraffic.backend.engine;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalStatus;
import com.smarttraffic.backend.model.*;
import org.springframework.stereotype.Component;

@Component
public class TrafficEngine {

    private static final Logger log =
            LoggerFactory.getLogger(TrafficEngine.class);

    private final TrafficOptimizer trafficOptimizer;

    public TrafficEngine(TrafficOptimizer trafficOptimizer) {
        this.trafficOptimizer = trafficOptimizer;
    }

    /**
     * Executes one complete traffic simulation cycle.
     */
    public SimulationResult simulateCycle(Intersection intersection) {
        log.info("========== Starting Traffic Simulation ==========");
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

        log.debug("Queue Before : {}", beforeSnapshot);

        log.info(
                "Decision -> Lane: {}, Green Time: {} sec, Vehicles Allowed: {}, Traffic Score: {}, Reason: {}",
                decision.getGreenLane(),
                decision.getGreenTime(),
                decision.getVehiclesAllowed(),
                decision.getTrafficScore(),
                decision.getReason()
        );

        log.info("🟢 GREEN SIGNAL -> {}", decision.getGreenLane());

        int vehiclesPassed = 0;

        // STEP 5 : Vehicles Cross
        while (!lane.isEmpty()
                && vehiclesPassed < decision.getVehiclesAllowed()) {

            Vehicle vehicle = lane.removeVehicle();

            log.info(
                    "Vehicle Passed : {} ({})",
                    vehicle.getVehicleNumber(),
                    vehicle.getVehicleType()
            );

            vehiclesPassed++;
        }

        // STEP 6 : GREEN -> YELLOW
        lane.setSignalStatus(SignalStatus.YELLOW);

        log.info("🟡 YELLOW SIGNAL -> {}", decision.getGreenLane());

        // STEP 7 : YELLOW -> RED
        lane.setSignalStatus(SignalStatus.RED);

        log.info("🔴 RED SIGNAL -> {}", decision.getGreenLane());

        // STEP 8 : Capture queue AFTER simulation
        QueueSnapshot afterSnapshot = captureSnapshot(intersection);

        log.debug("Queue After : {}", afterSnapshot);

        // STEP 9 : Build simulation result
        log.info(
                "Simulation completed. Vehicles Passed: {}, Remaining: {}",
                vehiclesPassed,
                lane.getVehicleCount()
        );
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