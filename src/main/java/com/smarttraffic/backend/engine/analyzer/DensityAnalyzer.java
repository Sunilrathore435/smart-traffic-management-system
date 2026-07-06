package com.smarttraffic.backend.engine.analyzer;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.Intersection;

import java.util.EnumMap;
import java.util.Map;

public class DensityAnalyzer {

    public Map<Direction, Double> calculateDensity(Intersection intersection) {

        Map<Direction, Double> density = new EnumMap<>(Direction.class);

        int totalVehicles = 0;

        for (Direction direction : Direction.values()) {
            totalVehicles += intersection.getLane(direction).getVehicleCount();
        }

        if (totalVehicles == 0) {
            return density;
        }

        for (Direction direction : Direction.values()) {

            int laneVehicles = intersection.getLane(direction).getVehicleCount();

            double percentage = (laneVehicles * 100.0) / totalVehicles;

            density.put(direction, percentage);
        }

        return density;
    }
}