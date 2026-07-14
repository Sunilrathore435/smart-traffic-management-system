package com.smarttraffic.backend.dto.dashboard;

public class AIResponse {

    private String selectedLane;

    private int greenTime;

    private int vehiclesAllowed;

    private double trafficScore;

    private String reason;

    public AIResponse() {
    }

    public AIResponse(
            String selectedLane,
            int greenTime,
            int vehiclesAllowed,
            double trafficScore,
            String reason) {

        this.selectedLane = selectedLane;
        this.greenTime = greenTime;
        this.vehiclesAllowed = vehiclesAllowed;
        this.trafficScore = trafficScore;
        this.reason = reason;
    }

    public String getSelectedLane() {
        return selectedLane;
    }

    public void setSelectedLane(String selectedLane) {
        this.selectedLane = selectedLane;
    }

    public int getGreenTime() {
        return greenTime;
    }

    public void setGreenTime(int greenTime) {
        this.greenTime = greenTime;
    }

    public int getVehiclesAllowed() {
        return vehiclesAllowed;
    }

    public void setVehiclesAllowed(int vehiclesAllowed) {
        this.vehiclesAllowed = vehiclesAllowed;
    }

    public double getTrafficScore() {
        return trafficScore;
    }

    public void setTrafficScore(double trafficScore) {
        this.trafficScore = trafficScore;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

}