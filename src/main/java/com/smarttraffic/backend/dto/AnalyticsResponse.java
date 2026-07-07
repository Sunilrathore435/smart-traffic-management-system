package com.smarttraffic.backend.dto;

public class AnalyticsResponse {

    private long totalSimulations;

    private long totalVehiclesProcessed;

    private double averageGreenTime;

    private double averageVehiclesPassed;

    private double averageTrafficScore;

    private String busiestLane;

    private long emergencyVehiclesHandled;

    public AnalyticsResponse() {
    }

    public AnalyticsResponse(
            long totalSimulations,
            long totalVehiclesProcessed,
            double averageGreenTime,
            double averageVehiclesPassed,
            double averageTrafficScore,
            String busiestLane,
            long emergencyVehiclesHandled) {

        this.totalSimulations = totalSimulations;
        this.totalVehiclesProcessed = totalVehiclesProcessed;
        this.averageGreenTime = averageGreenTime;
        this.averageVehiclesPassed = averageVehiclesPassed;
        this.averageTrafficScore = averageTrafficScore;
        this.busiestLane = busiestLane;
        this.emergencyVehiclesHandled = emergencyVehiclesHandled;
    }

    public long getTotalSimulations() {
        return totalSimulations;
    }

    public long getTotalVehiclesProcessed() {
        return totalVehiclesProcessed;
    }

    public double getAverageGreenTime() {
        return averageGreenTime;
    }

    public double getAverageVehiclesPassed() {
        return averageVehiclesPassed;
    }

    public double getAverageTrafficScore() {
        return averageTrafficScore;
    }

    public String getBusiestLane() {
        return busiestLane;
    }

    public long getEmergencyVehiclesHandled() {
        return emergencyVehiclesHandled;
    }
}