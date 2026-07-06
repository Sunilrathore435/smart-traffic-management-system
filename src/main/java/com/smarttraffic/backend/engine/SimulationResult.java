package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.model.QueueSnapshot;
import com.smarttraffic.backend.model.TrafficDecision;

public class SimulationResult {

    // Decision taken by the optimizer
    private final TrafficDecision decision;

    // Queue state before simulation
    private final QueueSnapshot queueBefore;

    // Queue state after simulation
    private final QueueSnapshot queueAfter;

    // Actual execution result
    private final int vehiclesPassed;

    private final int remainingVehicles;

    public SimulationResult(TrafficDecision decision,
                            QueueSnapshot queueBefore,
                            QueueSnapshot queueAfter,
                            int vehiclesPassed,
                            int remainingVehicles) {

        this.decision = decision;
        this.queueBefore = queueBefore;
        this.queueAfter = queueAfter;
        this.vehiclesPassed = vehiclesPassed;
        this.remainingVehicles = remainingVehicles;
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

    @Override
    public String toString() {
        return "SimulationResult{" +
                "decision=" + decision +
                ", queueBefore=" + queueBefore +
                ", queueAfter=" + queueAfter +
                ", vehiclesPassed=" + vehiclesPassed +
                ", remainingVehicles=" + remainingVehicles +
                '}';
    }
}