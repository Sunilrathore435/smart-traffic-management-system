package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.model.Intersection;
import com.smarttraffic.backend.model.TrafficDecision;

public interface TrafficOptimizer {

    TrafficDecision optimize(Intersection intersection);

}