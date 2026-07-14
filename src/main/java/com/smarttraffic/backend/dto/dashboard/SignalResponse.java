package com.smarttraffic.backend.dto.dashboard;

import java.util.Map;

public class SignalResponse {

    private String currentGreenLane;

    private Map<String, Integer> laneQueues;

    private int totalWaitingVehicles;

    public SignalResponse() {
    }

    public SignalResponse(
            String currentGreenLane,
            Map<String, Integer> laneQueues,
            int totalWaitingVehicles) {

        this.currentGreenLane = currentGreenLane;
        this.laneQueues = laneQueues;
        this.totalWaitingVehicles = totalWaitingVehicles;
    }

    public String getCurrentGreenLane() {
        return currentGreenLane;
    }

    public void setCurrentGreenLane(String currentGreenLane) {
        this.currentGreenLane = currentGreenLane;
    }

    public Map<String, Integer> getLaneQueues() {
        return laneQueues;
    }

    public void setLaneQueues(Map<String, Integer> laneQueues) {
        this.laneQueues = laneQueues;
    }

    public int getTotalWaitingVehicles() {
        return totalWaitingVehicles;
    }

    public void setTotalWaitingVehicles(int totalWaitingVehicles) {
        this.totalWaitingVehicles = totalWaitingVehicles;
    }

}