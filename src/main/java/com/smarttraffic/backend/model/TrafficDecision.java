package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;

public class TrafficDecision {

    private Direction greenLane;
    private int greenTime;
    private int vehiclesAllowed;
    private double trafficScore;
    private String reason;

    // Filled after execution
    private int vehiclesPassed;
    private int remainingVehicles;

    public TrafficDecision(Direction greenLane,
                           int greenTime,
                           int vehiclesAllowed,
                           double trafficScore,
                           String reason) {
        this.greenLane = greenLane;
        this.greenTime = greenTime;
        this.vehiclesAllowed = vehiclesAllowed;
        this.trafficScore = trafficScore;
        this.reason = reason;
    }

    public Direction getGreenLane() {
        return greenLane;
    }

    public int getGreenTime() {
        return greenTime;
    }

    public int getVehiclesAllowed() {
        return vehiclesAllowed;
    }

    public double getTrafficScore() {
        return trafficScore;
    }

    public String getReason() {
        return reason;
    }

    public int getVehiclesPassed() {
        return vehiclesPassed;
    }

    public void setVehiclesPassed(int vehiclesPassed) {
        this.vehiclesPassed = vehiclesPassed;
    }

    public int getRemainingVehicles() {
        return remainingVehicles;
    }

    public void setRemainingVehicles(int remainingVehicles) {
        this.remainingVehicles = remainingVehicles;
    }
}