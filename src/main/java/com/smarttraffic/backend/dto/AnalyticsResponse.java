package com.smarttraffic.backend.dto;

import com.smarttraffic.backend.dto.analytics.*;

import java.util.List;
import java.util.Map;

public class AnalyticsResponse {

    // ======================================================
    // Historical Analytics
    // ======================================================

    private long totalSimulations;

    private long totalVehiclesProcessed;

    private double averageGreenTime;

    private double averageVehiclesPassed;

    private double averageTrafficScore;

    private String busiestLane;

    private long emergencyVehiclesHandled;

    // ======================================================
    // Live Dashboard Analytics
    // ======================================================

    private int congestion;

    private int throughput;

    private int liveFlow;

    private int flowPercentage;

    private int fuelSaving;

    private Map<String, Integer> laneCongestion;

    private List<TrafficHistoryPoint> trafficHistory;

    private PredictionResponse prediction;

    private List<LaneRankingResponse> ranking;

    private PerformanceResponse performance;

    private SystemHealthResponse systemHealth;

    public AnalyticsResponse() {
    }

    // ======================================================
    // Getters & Setters
    // ======================================================

    public long getTotalSimulations() {
        return totalSimulations;
    }

    public void setTotalSimulations(long totalSimulations) {
        this.totalSimulations = totalSimulations;
    }

    public long getTotalVehiclesProcessed() {
        return totalVehiclesProcessed;
    }

    public void setTotalVehiclesProcessed(long totalVehiclesProcessed) {
        this.totalVehiclesProcessed = totalVehiclesProcessed;
    }

    public double getAverageGreenTime() {
        return averageGreenTime;
    }

    public void setAverageGreenTime(double averageGreenTime) {
        this.averageGreenTime = averageGreenTime;
    }

    public double getAverageVehiclesPassed() {
        return averageVehiclesPassed;
    }

    public void setAverageVehiclesPassed(double averageVehiclesPassed) {
        this.averageVehiclesPassed = averageVehiclesPassed;
    }

    public double getAverageTrafficScore() {
        return averageTrafficScore;
    }

    public void setAverageTrafficScore(double averageTrafficScore) {
        this.averageTrafficScore = averageTrafficScore;
    }

    public String getBusiestLane() {
        return busiestLane;
    }

    public void setBusiestLane(String busiestLane) {
        this.busiestLane = busiestLane;
    }

    public long getEmergencyVehiclesHandled() {
        return emergencyVehiclesHandled;
    }

    public void setEmergencyVehiclesHandled(long emergencyVehiclesHandled) {
        this.emergencyVehiclesHandled = emergencyVehiclesHandled;
    }

    public int getCongestion() {
        return congestion;
    }

    public void setCongestion(int congestion) {
        this.congestion = congestion;
    }

    public int getThroughput() {
        return throughput;
    }

    public void setThroughput(int throughput) {
        this.throughput = throughput;
    }

    public int getLiveFlow() {
        return liveFlow;
    }

    public void setLiveFlow(int liveFlow) {
        this.liveFlow = liveFlow;
    }

    public int getFlowPercentage() {
        return flowPercentage;
    }

    public void setFlowPercentage(int flowPercentage) {
        this.flowPercentage = flowPercentage;
    }

    public int getFuelSaving() {
        return fuelSaving;
    }

    public void setFuelSaving(int fuelSaving) {
        this.fuelSaving = fuelSaving;
    }

    public Map<String, Integer> getLaneCongestion() {
        return laneCongestion;
    }

    public void setLaneCongestion(Map<String, Integer> laneCongestion) {
        this.laneCongestion = laneCongestion;
    }

    public List<TrafficHistoryPoint> getTrafficHistory() {
        return trafficHistory;
    }

    public void setTrafficHistory(List<TrafficHistoryPoint> trafficHistory) {
        this.trafficHistory = trafficHistory;
    }

    public PredictionResponse getPrediction() {
        return prediction;
    }

    public void setPrediction(PredictionResponse prediction) {
        this.prediction = prediction;
    }

    public List<LaneRankingResponse> getRanking() {
        return ranking;
    }

    public void setRanking(List<LaneRankingResponse> ranking) {
        this.ranking = ranking;
    }

    public PerformanceResponse getPerformance() {
        return performance;
    }

    public void setPerformance(PerformanceResponse performance) {
        this.performance = performance;
    }

    public SystemHealthResponse getSystemHealth() {
        return systemHealth;
    }

    public void setSystemHealth(SystemHealthResponse systemHealth) {
        this.systemHealth = systemHealth;
    }
}