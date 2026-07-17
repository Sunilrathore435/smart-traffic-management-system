package com.smarttraffic.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "simulation_settings")
public class SimulationSettings {

    @Id
    private String id;

    // =====================================
    // Simulation
    // =====================================

    private boolean autoSimulation = true;

    private int vehicleSpawnRate = 5;

    private int schedulerInterval = 5000; // milliseconds

    // =====================================
    // Artificial Intelligence
    // =====================================

    private boolean adaptiveAI = true;

    private int minGreenTime = 10;

    private int maxGreenTime = 40;

    private int vehiclesPerGreen = 3;

    // =====================================
    // Emergency
    // =====================================

    private boolean emergencyPriority = true;

    private int emergencyGreenTime = 40;

    // =====================================
    // Dashboard
    // =====================================

    private int refreshRate = 500;

    private int historyLimit = 100;

    public SimulationSettings() {
    }

    // =====================================
    // Getters & Setters
    // =====================================

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "SimulationSettings{" +
                "id='" + id + '\'' +
                ", autoSimulation=" + autoSimulation +
                ", vehicleSpawnRate=" + vehicleSpawnRate +
                ", schedulerInterval=" + schedulerInterval +
                ", adaptiveAI=" + adaptiveAI +
                ", minGreenTime=" + minGreenTime +
                ", maxGreenTime=" + maxGreenTime +
                ", vehiclesPerGreen=" + vehiclesPerGreen +
                ", emergencyPriority=" + emergencyPriority +
                ", emergencyGreenTime=" + emergencyGreenTime +
                ", refreshRate=" + refreshRate +
                ", historyLimit=" + historyLimit +
                '}';
    }
}