package com.smarttraffic.backend.config;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.PedestrianSignal;
import com.smarttraffic.backend.enums.SignalPhase;
import com.smarttraffic.backend.enums.SimulationStage;
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

    private int maxGreenTime = 20;

    private int vehiclesPerGreen = 3;

    // =====================================================
    // Emergency
    // =====================================================

    private boolean emergencyPriority = true;

    private int emergencyGreenTime =30;

    // =====================================================
    // Dashboard
    // =====================================================
// =====================================================
// Live Signal Runtime State
// =====================================================

    private SimulationStage currentStage =
            SimulationStage.VEHICLE_GREEN;

    private SignalPhase currentSignalPhase =
            SignalPhase.NORTH_SOUTH;

    private PedestrianSignal pedestrianSignal =
            PedestrianSignal.DONT_WALK;

    private Direction dominantLane =
            Direction.NORTH;

    private int remainingTime = 10;
    private int refreshRate = 500;

    private int historyLimit = 100;
    // =====================================================
// Traffic Signal Timing
// =====================================================

    private int yellowTime = 3;

    private int allRedTime = 2;

    private boolean emergencyTriggered;
// =====================================================
// Pedestrian
// =====================================================

    private boolean pedestrianEnabled = true;

    private int pedestrianWalkTime = 10;

    private int pedestrianFlashTime = 3;

    

    // =====================================================
    // Constructor
    // =====================================================
    public boolean isEmergencyTriggered() {
        return emergencyTriggered;
    }

    public void setEmergencyTriggered(boolean emergencyTriggered) {
        this.emergencyTriggered = emergencyTriggered;
    }
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
// Traffic Signal Timing
// =====================================================

    public int getYellowTime() {
        return yellowTime;
    }

    public void setYellowTime(int yellowTime) {

        if (yellowTime < 2) {
            yellowTime = 2;
        }

        this.yellowTime = yellowTime;
    }

    public int getAllRedTime() {
        return allRedTime;
    }

    public void setAllRedTime(int allRedTime) {

        if (allRedTime < 1) {
            allRedTime = 1;
        }

        this.allRedTime = allRedTime;
    }

// =====================================================
// Pedestrian
// =====================================================

    public boolean isPedestrianEnabled() {
        return pedestrianEnabled;
    }

    public void setPedestrianEnabled(boolean pedestrianEnabled) {
        this.pedestrianEnabled = pedestrianEnabled;
    }

    public int getPedestrianWalkTime() {
        return pedestrianWalkTime;
    }

    public void setPedestrianWalkTime(int pedestrianWalkTime) {

        if (pedestrianWalkTime < 5) {
            pedestrianWalkTime = 5;
        }

        this.pedestrianWalkTime = pedestrianWalkTime;
    }

    public int getPedestrianFlashTime() {
        return pedestrianFlashTime;
    }

    public void setPedestrianFlashTime(int pedestrianFlashTime) {

        if (pedestrianFlashTime < 2) {
            pedestrianFlashTime = 2;
        }

        this.pedestrianFlashTime = pedestrianFlashTime;
    }
// =====================================================
// Live Traffic Signal State
// =====================================================

    public SimulationStage getCurrentStage() {
        return currentStage;
    }

    public void setCurrentStage(SimulationStage currentStage) {
        this.currentStage = currentStage;
    }

    public SignalPhase getCurrentSignalPhase() {
        return currentSignalPhase;
    }

    public void setCurrentSignalPhase(SignalPhase currentSignalPhase) {
        this.currentSignalPhase = currentSignalPhase;
    }

    public PedestrianSignal getPedestrianSignal() {
        return pedestrianSignal;
    }

    public void setPedestrianSignal(PedestrianSignal pedestrianSignal) {
        this.pedestrianSignal = pedestrianSignal;
    }

    public Direction getDominantLane() {
        return dominantLane;
    }

    public void setDominantLane(Direction dominantLane) {
        this.dominantLane = dominantLane;
    }

    public int getRemainingTime() {
        return remainingTime;
    }

    public void setRemainingTime(int remainingTime) {
        this.remainingTime = Math.max(0, remainingTime);
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
                ", yellowTime=" + yellowTime +
                ", allRedTime=" + allRedTime +
                ", pedestrianEnabled=" + pedestrianEnabled +
                ", pedestrianWalkTime=" + pedestrianWalkTime +
                ", pedestrianFlashTime=" + pedestrianFlashTime +
                ", currentStage=" + currentStage +
                ", currentSignalPhase=" + currentSignalPhase +
                ", pedestrianSignal=" + pedestrianSignal +
                ", dominantLane=" + dominantLane +
                ", remainingTime=" + remainingTime +
                '}';
    }
}