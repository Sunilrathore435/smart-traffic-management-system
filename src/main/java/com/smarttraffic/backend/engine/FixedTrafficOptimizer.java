package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.config.RuntimeSimulationState;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalPhase;
import com.smarttraffic.backend.model.Intersection;
import com.smarttraffic.backend.model.TrafficDecision;
import com.smarttraffic.backend.model.TrafficLane;
import org.springframework.stereotype.Component;

@Component
public class FixedTrafficOptimizer implements TrafficOptimizer {

    private final RuntimeSimulationState runtimeState;

    private int currentIndex = 0;

    public FixedTrafficOptimizer(RuntimeSimulationState runtimeState) {
        this.runtimeState = runtimeState;
    }

    @Override
    public synchronized TrafficDecision optimize(Intersection intersection) {

        Direction[] directions = Direction.values();

        for (int i = 0; i < directions.length; i++) {

            Direction direction = directions[currentIndex];

            currentIndex = (currentIndex + 1) % directions.length;

            TrafficLane lane = intersection.getLane(direction);

            if (lane.isEmpty()) {
                continue;
            }

            SignalPhase phase = getSignalPhase(direction);

            int greenTime = runtimeState.getMinGreenTime();

            int northAllowed = 0;
            int southAllowed = 0;
            int eastAllowed = 0;
            int westAllowed = 0;

            if (phase == SignalPhase.NORTH_SOUTH) {

                northAllowed = calculateVehiclesAllowed(
                        intersection.getLane(Direction.NORTH).getVehicleCount(),
                        greenTime);

                southAllowed = calculateVehiclesAllowed(
                        intersection.getLane(Direction.SOUTH).getVehicleCount(),
                        greenTime);

            } else {

                eastAllowed = calculateVehiclesAllowed(
                        intersection.getLane(Direction.EAST).getVehicleCount(),
                        greenTime);

                westAllowed = calculateVehiclesAllowed(
                        intersection.getLane(Direction.WEST).getVehicleCount(),
                        greenTime);
            }

            return new TrafficDecision(

                    phase,

                    direction,

                    greenTime,

                    northAllowed,

                    southAllowed,

                    eastAllowed,

                    westAllowed,

                    lane.getVehicleCount(),

                    "Fixed Round Robin"

            );
        }

        return new TrafficDecision(

                SignalPhase.NORTH_SOUTH,

                Direction.NORTH,

                runtimeState.getMinGreenTime(),

                0,

                0,

                0,

                0,

                0,

                "No vehicles waiting"

        );
    }

    /**
     * Calculate how many vehicles can pass.
     */
    private int calculateVehiclesAllowed(
            int queueLength,
            int greenTime) {

        int vehiclesAllowed = greenTime / 2;

        vehiclesAllowed = Math.min(queueLength, vehiclesAllowed);

        if (queueLength > 0) {
            vehiclesAllowed = Math.max(1, vehiclesAllowed);
        }

        return vehiclesAllowed;
    }

    /**
     * Convert lane into phase.
     */
    private SignalPhase getSignalPhase(Direction direction) {

        return switch (direction) {

            case NORTH, SOUTH -> SignalPhase.NORTH_SOUTH;

            case EAST, WEST -> SignalPhase.EAST_WEST;
        };
    }

}