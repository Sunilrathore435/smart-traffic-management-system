package com.smarttraffic.backend.dto;

import com.smarttraffic.backend.enums.SchedulerStatus;

public class SimulationStatusResponse {

    private boolean simulationRunning;

    private long schedulerIntervalMs;

    private long totalSimulationCycles;

    private long processedVehicles;

    private int historyRecords;

    private String intersectionId;

    private String intersectionName;

    private String currentGreenLane;

    private SchedulerStatus schedulerStatus;

    public SimulationStatusResponse() {
    }

    public SimulationStatusResponse(
            boolean simulationRunning,
            long schedulerIntervalMs,
            long totalSimulationCycles,
            long processedVehicles,
            int historyRecords,
            String intersectionId,
            String intersectionName,
            String currentGreenLane,
            SchedulerStatus schedulerStatus) {

        this.simulationRunning = simulationRunning;
        this.schedulerIntervalMs = schedulerIntervalMs;
        this.totalSimulationCycles = totalSimulationCycles;
        this.processedVehicles = processedVehicles;
        this.historyRecords = historyRecords;
        this.intersectionId = intersectionId;
        this.intersectionName = intersectionName;
        this.currentGreenLane = currentGreenLane;
        this.schedulerStatus = schedulerStatus;
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

    public int getHistoryRecords() {
        return historyRecords;
    }

    public String getIntersectionId() {
        return intersectionId;
    }

    public String getIntersectionName() {
        return intersectionName;
    }

    public String getCurrentGreenLane() {
        return currentGreenLane;
    }

    public SchedulerStatus getSchedulerStatus() {
        return schedulerStatus;
    }
}