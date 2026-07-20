package com.smarttraffic.backend.dto.dashboard;

public class AIResponse {

    private String signalPhase;

    private String dominantLane;

    private int greenTime;

    private int vehiclesAllowed;

    private double trafficScore;

    private String reason;

    public AIResponse() {
    }

    public AIResponse(
            String signalPhase,
            String dominantLane,
            int greenTime,
            int vehiclesAllowed,
            double trafficScore,
            String reason) {

        this.signalPhase = signalPhase;
        this.dominantLane = dominantLane;
        this.greenTime = greenTime;
        this.vehiclesAllowed = vehiclesAllowed;
        this.trafficScore = trafficScore;
        this.reason = reason;
    }

    public String getSignalPhase() {
        return signalPhase;
    }

    public void setSignalPhase(String signalPhase) {
        this.signalPhase = signalPhase;
    }

    public String getDominantLane() {
        return dominantLane;
    }

    public void setDominantLane(String dominantLane) {
        this.dominantLane = dominantLane;
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