package com.smarttraffic.backend.dto;

import java.util.Map;

public class TrafficStatusResponse {

    private String currentSignalPhase;

    private String dominantLane;

    private Map<String, Integer> vehicleCounts;

    private boolean emergencyTriggered;

    private String emergencyLane;

    private int remainingTime;

    public TrafficStatusResponse(
            String currentSignalPhase,
            String dominantLane,
            Map<String, Integer> vehicleCounts,
            boolean emergencyTriggered,
            String emergencyLane,
            int remainingTime) {

        this.currentSignalPhase = currentSignalPhase;
        this.dominantLane = dominantLane;
        this.vehicleCounts = vehicleCounts;
        this.emergencyTriggered = emergencyTriggered;
        this.emergencyLane = emergencyLane;
        this.remainingTime = remainingTime;
    }

    public String getCurrentSignalPhase() {
        return currentSignalPhase;
    }

    public String getDominantLane() {
        return dominantLane;
    }

    public Map<String, Integer> getVehicleCounts() {
        return vehicleCounts;
    }

    public boolean isEmergencyTriggered() {
        return emergencyTriggered;
    }

    public String getEmergencyLane() {
        return emergencyLane;
    }

    public int getRemainingTime() {
        return remainingTime;
    }
}