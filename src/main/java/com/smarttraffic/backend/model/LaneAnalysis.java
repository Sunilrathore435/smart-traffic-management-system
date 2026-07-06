package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;

import java.time.LocalDateTime;

public class LaneAnalysis {

    // Lane Information
    private Direction direction;

    // Queue Statistics
    private int queueLength;
    private int priorityScore;
    private double averageWaitingTime;
    private double density;

    // Final Calculated Score
    private double trafficScore;

    // Emergency Analysis
    private boolean emergencyPresent;
    private int emergencyVehiclePosition;

    // Signal Recommendation
    private int greenTime;
    private int vehiclesAllowed;

    // Decision Metadata
    private String reason;
    private LocalDateTime analysisTime;

    public LaneAnalysis(Direction direction,
                        int queueLength,
                        int priorityScore,
                        double averageWaitingTime,
                        double density,
                        double trafficScore,
                        boolean emergencyPresent,
                        int emergencyVehiclePosition,
                        int greenTime,
                        int vehiclesAllowed,
                        String reason) {

        this.direction = direction;
        this.queueLength = queueLength;
        this.priorityScore = priorityScore;
        this.averageWaitingTime = averageWaitingTime;
        this.density = density;
        this.trafficScore = trafficScore;
        this.emergencyPresent = emergencyPresent;
        this.emergencyVehiclePosition = emergencyVehiclePosition;
        this.greenTime = greenTime;
        this.vehiclesAllowed = vehiclesAllowed;
        this.reason = reason;
        this.analysisTime = LocalDateTime.now();
    }

    // ==========================
    // Getters
    // ==========================

    public Direction getDirection() {
        return direction;
    }

    public int getQueueLength() {
        return queueLength;
    }

    public int getPriorityScore() {
        return priorityScore;
    }

    public double getAverageWaitingTime() {
        return averageWaitingTime;
    }

    public double getDensity() {
        return density;
    }

    public double getTrafficScore() {
        return trafficScore;
    }

    public boolean isEmergencyPresent() {
        return emergencyPresent;
    }

    public int getEmergencyVehiclePosition() {
        return emergencyVehiclePosition;
    }

    public int getGreenTime() {
        return greenTime;
    }

    public int getVehiclesAllowed() {
        return vehiclesAllowed;
    }

    public String getReason() {
        return reason;
    }

    public LocalDateTime getAnalysisTime() {
        return analysisTime;
    }

    @Override
    public String toString() {
        return "LaneAnalysis{" +
                "direction=" + direction +
                ", queueLength=" + queueLength +
                ", priorityScore=" + priorityScore +
                ", averageWaitingTime=" + averageWaitingTime +
                ", density=" + density +
                ", trafficScore=" + trafficScore +
                ", emergencyPresent=" + emergencyPresent +
                ", emergencyVehiclePosition=" + emergencyVehiclePosition +
                ", greenTime=" + greenTime +
                ", vehiclesAllowed=" + vehiclesAllowed +
                ", reason='" + reason + '\'' +
                ", analysisTime=" + analysisTime +
                '}';
    }
}