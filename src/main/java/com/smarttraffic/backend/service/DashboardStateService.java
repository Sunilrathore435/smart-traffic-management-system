package com.smarttraffic.backend.service;

import com.smarttraffic.backend.dto.dashboard.AIResponse;
import com.smarttraffic.backend.dto.dashboard.EmergencyResponse;
import com.smarttraffic.backend.dto.dashboard.SignalResponse;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.Intersection;
import com.smarttraffic.backend.model.TrafficDecision;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class DashboardStateService {

    private final TrafficService trafficService;

    public DashboardStateService(
            TrafficService trafficService) {

        this.trafficService = trafficService;

    }

    /**
     * Build live signal state.
     */
    public SignalResponse buildSignalState(
            Intersection intersection) {

        Map<String, Integer> queues =
                new LinkedHashMap<>();

        for (Direction direction : Direction.values()) {

            queues.put(

                    direction.name().toLowerCase(),

                    intersection
                            .getLane(direction)
                            .getVehicleCount()

            );

        }

        return new SignalResponse(

                intersection
                        .getCurrentSignalPhase()
                        .name(),

                queues,

                intersection.getTotalWaitingVehicles()

        );

    }

    /**
     * Build AI decision.
     */
    public AIResponse buildAIState(
            TrafficDecision decision) {

        if (decision == null) {

            return null;

        }

        return new AIResponse(

                decision.getSignalPhase().name(),

                decision.getDominantLane().name(),

                decision.getGreenTime(),

                decision.getTotalVehiclesAllowed(),

                decision.getTrafficScore(),

                decision.getReason()

        );
    }

    /**
     * Build Emergency State.
     */
    public EmergencyResponse buildEmergencyState() {

        return new EmergencyResponse(

                trafficService.isEmergencyActive(),

                trafficService.getEmergencyLane() == null

                        ? "NONE"

                        : trafficService
                        .getEmergencyLane()
                        .name()

        );

    }

}