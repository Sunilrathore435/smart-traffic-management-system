package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.model.QueueSnapshot;
import com.smarttraffic.backend.model.TrafficDecision;

import java.time.LocalDateTime;

public class SimulationResult {

    private final TrafficDecision decision;

    private final QueueSnapshot queueBefore;

    private final QueueSnapshot queueAfter;

    private final int vehiclesPassed;

    private final int remainingVehicles;

    // Exact time when simulation started
    private final LocalDateTime simulationTime;

    // Total execution time
    private final long executionTimeMs;

    public SimulationResult(
            TrafficDecision decision,
            QueueSnapshot queueBefore,
            QueueSnapshot queueAfter,
            int vehiclesPassed,
            int remainingVehicles,
            LocalDateTime simulationTime,
            long executionTimeMs) {

        this.decision = decision;
        this.queueBefore = queueBefore;
        this.queueAfter = queueAfter;
        this.vehiclesPassed = vehiclesPassed;
        this.remainingVehicles = remainingVehicles;
        this.simulationTime = simulationTime;
        this.executionTimeMs = executionTimeMs;
    }

    public TrafficDecision getDecision() {
        return decision;
    }

    public QueueSnapshot getQueueBefore() {
        return queueBefore;
    }

    public QueueSnapshot getQueueAfter() {
        return queueAfter;
    }

    public int getVehiclesPassed() {
        return vehiclesPassed;
    }

    public int getRemainingVehicles() {
        return remainingVehicles;
    }

    public LocalDateTime getSimulationTime() {
        return simulationTime;
    }

    public long getExecutionTimeMs() {
        return executionTimeMs;
    }
}