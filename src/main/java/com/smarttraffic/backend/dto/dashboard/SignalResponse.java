package com.smarttraffic.backend.dto.dashboard;

import java.util.Map;

public class SignalResponse {

    private String currentSignalPhase;

    private Map<String, Integer> laneQueues;

    private int totalWaitingVehicles;

    public SignalResponse() {
    }

    public SignalResponse(
            String currentSignalPhase,
            Map<String, Integer> laneQueues,
            int totalWaitingVehicles) {

        this.currentSignalPhase = currentSignalPhase;
        this.laneQueues = laneQueues;
        this.totalWaitingVehicles = totalWaitingVehicles;
    }

    public String getCurrentSignalPhase() {
        return currentSignalPhase;
    }

    public void setCurrentSignalPhase(String currentSignalPhase) {
        this.currentSignalPhase = currentSignalPhase;
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