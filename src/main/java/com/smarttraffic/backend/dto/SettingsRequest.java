package com.smarttraffic.backend.dto;

public class SettingsRequest {

    // Simulation
    private boolean autoSimulation;
    private int vehicleSpawnRate;
    private int schedulerInterval;

    // AI
    private boolean adaptiveAI;
    private int minGreenTime;
    private int maxGreenTime;
    private int vehiclesPerGreen;

    // Emergency
    private boolean emergencyPriority;
    private int emergencyGreenTime;

    // Dashboard
    private int refreshRate;
    private int historyLimit;

    public SettingsRequest() {
    }

    public boolean isAutoSimulation() {
        return autoSimulation;
    }

    public void setAutoSimulation(boolean autoSimulation) {
        this.autoSimulation = autoSimulation;
    }

    public int getVehicleSpawnRate() {
        return vehicleSpawnRate;
    }

    public void setVehicleSpawnRate(int vehicleSpawnRate) {
        this.vehicleSpawnRate = vehicleSpawnRate;
    }

    public int getSchedulerInterval() {
        return schedulerInterval;
    }

    public void setSchedulerInterval(int schedulerInterval) {
        this.schedulerInterval = schedulerInterval;
    }

    public boolean isAdaptiveAI() {
        return adaptiveAI;
    }

    public void setAdaptiveAI(boolean adaptiveAI) {
        this.adaptiveAI = adaptiveAI;
    }

    public int getMinGreenTime() {
        return minGreenTime;
    }

    public void setMinGreenTime(int minGreenTime) {
        this.minGreenTime = minGreenTime;
    }

    public int getMaxGreenTime() {
        return maxGreenTime;
    }

    public void setMaxGreenTime(int maxGreenTime) {
        this.maxGreenTime = maxGreenTime;
    }

    public int getVehiclesPerGreen() {
        return vehiclesPerGreen;
    }

    public void setVehiclesPerGreen(int vehiclesPerGreen) {
        this.vehiclesPerGreen = vehiclesPerGreen;
    }

    public boolean isEmergencyPriority() {
        return emergencyPriority;
    }

    public void setEmergencyPriority(boolean emergencyPriority) {
        this.emergencyPriority = emergencyPriority;
    }

    public int getEmergencyGreenTime() {
        return emergencyGreenTime;
    }

    public void setEmergencyGreenTime(int emergencyGreenTime) {
        this.emergencyGreenTime = emergencyGreenTime;
    }

    public int getRefreshRate() {
        return refreshRate;
    }

    public void setRefreshRate(int refreshRate) {
        this.refreshRate = refreshRate;
    }

    public int getHistoryLimit() {
        return historyLimit;
    }

    public void setHistoryLimit(int historyLimit) {
        this.historyLimit = historyLimit;
    }

}