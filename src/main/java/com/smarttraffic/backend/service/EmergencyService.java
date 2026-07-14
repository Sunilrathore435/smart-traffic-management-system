package com.smarttraffic.backend.service;

import com.smarttraffic.backend.enums.Direction;
import org.springframework.stereotype.Service;

@Service
public class EmergencyService {

    private final TrafficService trafficService;

    public EmergencyService(
            TrafficService trafficService) {

        this.trafficService = trafficService;

    }

    /**
     * Activate emergency priority.
     */
    public void activateEmergency(String lane) {

        Direction direction =
                Direction.valueOf(
                        lane.toUpperCase()
                );

        trafficService.activateEmergency(direction);

    }

    /**
     * Clear emergency mode.
     */
    public void clearEmergency() {

        trafficService.clearEmergency();

    }

    /**
     * Check whether emergency mode is active.
     */
    public boolean isEmergencyActive() {

        return trafficService.isEmergencyActive();

    }

    /**
     * Get the current emergency lane.
     */
    public Direction getEmergencyLane() {

        return trafficService.getEmergencyLane();

    }

}