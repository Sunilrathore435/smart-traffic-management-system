package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalStatus;
import com.smarttraffic.backend.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class TrafficEngine {

    private static final Logger log =
            LoggerFactory.getLogger(TrafficEngine.class);




    /**
     * Executes one complete traffic simulation cycle.
     */
    public SimulationResult simulateCycle(
            Intersection intersection,
            TrafficDecision decision) {

        // Simulation Start Time
        LocalDateTime simulationStartTime = LocalDateTime.now();

        long startMillis = System.currentTimeMillis();

        log.info("========== Starting Traffic Simulation ==========");

        QueueSnapshot beforeSnapshot = captureSnapshot(intersection);

        resetSignals(intersection);

        TrafficLane lane = intersection.getLane(decision.getGreenLane());

        lane.setSignalStatus(SignalStatus.GREEN);

        intersection.setCurrentGreenLane(decision.getGreenLane());

        log.info(
                "Decision -> Lane: {}, Green Time: {}, Vehicles Allowed: {}, Score: {}",
                decision.getGreenLane(),
                decision.getGreenTime(),
                decision.getVehiclesAllowed(),
                decision.getTrafficScore()
        );

        int vehiclesPassed = 0;

        while (!lane.isEmpty()
                && vehiclesPassed < decision.getVehiclesAllowed()) {

            Vehicle vehicle = lane.removeVehicle();

            log.info("Vehicle Passed : {}", vehicle.getVehicleNumber());

            vehiclesPassed++;
        }

        lane.setSignalStatus(SignalStatus.YELLOW);

        lane.setSignalStatus(SignalStatus.RED);

        QueueSnapshot afterSnapshot =
                captureSnapshot(intersection);

        long executionTime =
                System.currentTimeMillis() - startMillis;

        log.info(
                "Simulation completed in {} ms",
                executionTime
        );
        System.out.println(
                "Decision = "
                        + decision
        );
        return new SimulationResult(

                decision,

                beforeSnapshot,

                afterSnapshot,

                vehiclesPassed,

                lane.getVehicleCount(),

                simulationStartTime,

                executionTime
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

    /**
     * Capture queue snapshot.
     */
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