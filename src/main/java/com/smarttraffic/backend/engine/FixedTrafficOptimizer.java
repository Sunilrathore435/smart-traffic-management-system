package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.Intersection;
import com.smarttraffic.backend.model.TrafficDecision;
import com.smarttraffic.backend.model.TrafficLane;
import com.smarttraffic.backend.config.RuntimeSimulationState;
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

        // Try every lane once
        for (int i = 0; i < directions.length; i++) {

            Direction direction = directions[currentIndex];

            currentIndex = (currentIndex + 1) % directions.length;

            TrafficLane lane = intersection.getLane(direction);

            if (!lane.isEmpty()) {

                return new TrafficDecision(
                        direction,
                        runtimeState.getMinGreenTime(),
                        runtimeState.getVehiclesPerGreen(),
                        lane.getVehicleCount(),
                        "Fixed Round Robin"
                );
            }
        }

        // No vehicles anywhere
        return new TrafficDecision(
                Direction.NORTH,
                runtimeState.getMinGreenTime(),
                0,
                0,
                "No vehicles waiting"
        );
    }
}