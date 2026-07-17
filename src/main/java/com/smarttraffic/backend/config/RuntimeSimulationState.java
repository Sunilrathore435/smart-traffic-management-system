package com.smarttraffic.backend.config;

import org.springframework.stereotype.Component;

@Component
public class RuntimeSimulationState {

    // =====================================================
    // Runtime State
    // =====================================================

    private boolean running = false;

    private long interval = 5000;

    private long totalSimulationCycles = 0;

    // =====================================================
    // Simulation
    // =====================================================

    private int vehicleSpawnRate = 5;

    // =====================================================
    // Artificial Intelligence
    // =====================================================

    private boolean adaptiveAI = true;

    private int minGreenTime = 10;

    private int maxGreenTime = 40;

    private int vehiclesPerGreen = 3;

    // =====================================================
    // Emergency
    // =====================================================

    private boolean emergencyPriority = true;

    private int emergencyGreenTime = 30;

    // =====================================================
    // Dashboard
    // =====================================================

    private int refreshRate = 500;

    private int historyLimit = 100;

    // =====================================================
    // Constructor
    // =====================================================

    public RuntimeSimulationState() {
    }

    // =====================================================
    // Runtime
    // =====================================================

    public boolean isRunning() {
        return running;
    }

    public void setRunning(boolean running) {
        this.running = running;
    }

    public long getInterval() {
        return interval;
    }

    public void setInterval(long interval) {

        if (interval < 1000) {
            interval = 1000;
        }

        this.interval = interval;
    }

    public long getTotalSimulationCycles() {
        return totalSimulationCycles;
    }

    public void incrementSimulationCycle() {
        totalSimulationCycles++;
    }

    public void resetSimulationCycles() {
        totalSimulationCycles = 0;
    }

    // =====================================================
    // Simulation
    // =====================================================

    public int getVehicleSpawnRate() {
        return vehicleSpawnRate;
    }

    public void setVehicleSpawnRate(int vehicleSpawnRate) {
        this.vehicleSpawnRate = vehicleSpawnRate;
    }

    // =====================================================
    // AI
    // =====================================================

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

    // =====================================================
    // Emergency
    // =====================================================

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

    // =====================================================
    // Dashboard
    // =====================================================

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

    // =====================================================
    // Debug
    // =====================================================

    @Override
    public String toString() {

        return "RuntimeSimulationState{" +
                "running=" + running +
                ", interval=" + interval +
                ", totalSimulationCycles=" + totalSimulationCycles +
                ", vehicleSpawnRate=" + vehicleSpawnRate +
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