package com.smarttraffic.backend.dto;

import com.smarttraffic.backend.model.QueueSnapshot;

import java.time.LocalDateTime;

public class TrafficLiveUpdate {

    private String signalPhase;

    private String dominantLane;

    private int greenTime;

    private int vehiclesPassed;

    private int remainingVehicles;

    private double trafficScore;

    private String reason;

    private QueueSnapshot queueBefore;

    private QueueSnapshot queueAfter;

    private LocalDateTime simulationTime;

    public TrafficLiveUpdate(
            String signalPhase,
            String dominantLane,
            int greenTime,
            int vehiclesPassed,
            int remainingVehicles,
            double trafficScore,
            String reason,
            QueueSnapshot queueBefore,
            QueueSnapshot queueAfter,
            LocalDateTime simulationTime) {

        this.signalPhase = signalPhase;
        this.dominantLane = dominantLane;
        this.greenTime = greenTime;
        this.vehiclesPassed = vehiclesPassed;
        this.remainingVehicles = remainingVehicles;
        this.trafficScore = trafficScore;
        this.reason = reason;
        this.queueBefore = queueBefore;
        this.queueAfter = queueAfter;
        this.simulationTime = simulationTime;
    }

    public String getSignalPhase() {
        return signalPhase;
    }

    public String getDominantLane() {
        return dominantLane;
    }

    public int getGreenTime() {
        return greenTime;
    }

    public int getVehiclesPassed() {
        return vehiclesPassed;
    }

    public int getRemainingVehicles() {
        return remainingVehicles;
    }

    public double getTrafficScore() {
        return trafficScore;
    }

    public String getReason() {
        return reason;
    }

    public QueueSnapshot getQueueBefore() {
        return queueBefore;
    }

    public QueueSnapshot getQueueAfter() {
        return queueAfter;
    }

    public LocalDateTime getSimulationTime() {
        return simulationTime;
    }
}