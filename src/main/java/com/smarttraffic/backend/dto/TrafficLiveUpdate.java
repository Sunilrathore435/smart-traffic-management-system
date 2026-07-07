package com.smarttraffic.backend.dto;

import com.smarttraffic.backend.model.QueueSnapshot;

import java.time.LocalDateTime;

public class TrafficLiveUpdate {

    private String greenLane;

    private int greenTime;

    private int vehiclesPassed;

    private int remainingVehicles;

    private double trafficScore;

    private String reason;

    private QueueSnapshot queueBefore;

    private QueueSnapshot queueAfter;

    private LocalDateTime simulationTime;

    public TrafficLiveUpdate(
            String greenLane,
            int greenTime,
            int vehiclesPassed,
            int remainingVehicles,
            double trafficScore,
            String reason,
            QueueSnapshot queueBefore,
            QueueSnapshot queueAfter,
            LocalDateTime simulationTime) {

        this.greenLane = greenLane;
        this.greenTime = greenTime;
        this.vehiclesPassed = vehiclesPassed;
        this.remainingVehicles = remainingVehicles;
        this.trafficScore = trafficScore;
        this.reason = reason;
        this.queueBefore = queueBefore;
        this.queueAfter = queueAfter;
        this.simulationTime = simulationTime;
    }

    public String getGreenLane() {
        return greenLane;
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