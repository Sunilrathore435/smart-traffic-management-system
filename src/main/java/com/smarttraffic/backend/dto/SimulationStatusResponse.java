package com.smarttraffic.backend.dto;

import com.smarttraffic.backend.enums.SchedulerStatus;
import com.smarttraffic.backend.enums.PedestrianSignal;
import com.smarttraffic.backend.enums.SimulationStage;

public class SimulationStatusResponse {

    private boolean simulationRunning;

    private long schedulerIntervalMs;

    private long totalSimulationCycles;

    private long processedVehicles;

    private long historyRecords;

    private String intersectionId;

    private String intersectionName;
    private String currentStage;

    private String pedestrianSignal;

    private int remainingTime;

    private boolean pedestrianWaiting;
    // Changed from currentGreenLane
    private String currentSignalPhase;

    private SchedulerStatus schedulerStatus;

    public SimulationStatusResponse() {
    }

    public SimulationStatusResponse(
            boolean simulationRunning,
            long schedulerIntervalMs,
            long totalSimulationCycles,
            long processedVehicles,
            long historyRecords,
            String intersectionId,
            String intersectionName,
            String currentSignalPhase,
            String currentStage,
            String pedestrianSignal,
            int remainingTime,
            boolean pedestrianWaiting,
            SchedulerStatus schedulerStatus) {

        this.simulationRunning = simulationRunning;
        this.schedulerIntervalMs = schedulerIntervalMs;
        this.totalSimulationCycles = totalSimulationCycles;
        this.processedVehicles = processedVehicles;
        this.historyRecords = historyRecords;
        this.intersectionId = intersectionId;
        this.intersectionName = intersectionName;
        this.currentSignalPhase = currentSignalPhase;
        this.currentStage = currentStage;
        this.pedestrianSignal = pedestrianSignal;
        this.remainingTime = remainingTime;
        this.pedestrianWaiting = pedestrianWaiting;
        this.schedulerStatus = schedulerStatus;
    }
    public String getCurrentStage() {
        return currentStage;
    }

    public String getPedestrianSignal() {
        return pedestrianSignal;
    }

    public int getRemainingTime() {
        return remainingTime;
    }

    public boolean isPedestrianWaiting() {
        return pedestrianWaiting;
    }
    public boolean isSimulationRunning() {
        return simulationRunning;
    }

    public long getSchedulerIntervalMs() {
        return schedulerIntervalMs;
    }

    public long getTotalSimulationCycles() {
        return totalSimulationCycles;
    }

    public long getProcessedVehicles() {
        return processedVehicles;
    }

    public long getHistoryRecords() {
        return historyRecords;
    }

    public String getIntersectionId() {
        return intersectionId;
    }

    public String getIntersectionName() {
        return intersectionName;
    }

    public String getCurrentSignalPhase() {
        return currentSignalPhase;
    }

    public SchedulerStatus getSchedulerStatus() {
        return schedulerStatus;
    }
}