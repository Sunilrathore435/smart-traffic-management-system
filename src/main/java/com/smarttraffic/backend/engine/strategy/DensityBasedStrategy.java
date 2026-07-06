package com.smarttraffic.backend.engine.strategy;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.Intersection;

public class DensityBasedStrategy implements TrafficOptimizationStrategy {

    @Override
    public Direction chooseGreenLane(Intersection intersection) {

        Direction selected = Direction.NORTH;
        int max = -1;

        for (Direction direction : Direction.values()) {

            int vehicles = intersection
                    .getLane(direction)
                    .getVehicleCount();

            if (vehicles > max) {

                max = vehicles;
                selected = direction;

            }
        }

        return selected;
    }

    @Override
    public int calculateGreenTime(Intersection intersection,
                                  Direction direction) {

        int total = 0;

        for (Direction d : Direction.values()) {
            total += intersection.getLane(d).getVehicleCount();
        }

        if (total == 0)
            return 10;

        int laneVehicles =
                intersection.getLane(direction).getVehicleCount();

        double density =
                (laneVehicles * 100.0) / total;

        if (density >= 60)
            return 40;

        if (density >= 40)
            return 30;

        if (density >= 20)
            return 20;

        return 10;
    }
}