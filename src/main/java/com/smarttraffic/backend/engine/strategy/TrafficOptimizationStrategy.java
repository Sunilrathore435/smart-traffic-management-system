package com.smarttraffic.backend.engine.strategy;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.Intersection;

public interface TrafficOptimizationStrategy {

    Direction chooseGreenLane(Intersection intersection);

    int calculateGreenTime(Intersection intersection, Direction direction);

}