package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(collection = "simulation_history")
public class TrafficSimulationRecord {

    // =====================================================
    // Unique Simulation Information
    // =====================================================

    @Id
    private String simulationId;
    private final LocalDateTime simulationTime;
    private final long executionTimeMs;
    // =====================================================
    // Intersection
    // =====================================================

    private final String intersectionId;

    // =====================================================
    // AI Decision
    // =====================================================

    private final Direction selectedLane;

    private final int greenTime;

    private final double trafficScore;

    private final String reason;

    // =====================================================
    // Simulation Result
    // =====================================================

    private final int vehiclesPassed;

    private final int remainingVehicles;

    // =====================================================
    // Queue Snapshots
    // =====================================================

    private final QueueSnapshot queueBefore;

    private final QueueSnapshot queueAfter;

    // =====================================================
    // Flags
    // =====================================================

    private final boolean emergencyTriggered;

    // =====================================================
    // Constructor
    // =====================================================

    public TrafficSimulationRecord(

            String intersectionId,

            Direction selectedLane,

            int greenTime,

            int vehiclesPassed,

            int remainingVehicles,

            double trafficScore,

            String reason,

            QueueSnapshot queueBefore,

            QueueSnapshot queueAfter,

            boolean emergencyTriggered,

            LocalDateTime simulationTime,
            long executionTimeMs


    ) {

        this.simulationId = UUID.randomUUID().toString();

        this.intersectionId = intersectionId;

        this.selectedLane = selectedLane;

        this.greenTime = greenTime;

        this.vehiclesPassed = vehiclesPassed;

        this.remainingVehicles = remainingVehicles;

        this.trafficScore = trafficScore;

        this.reason = reason;

        this.queueBefore = queueBefore;

        this.queueAfter = queueAfter;

        this.emergencyTriggered = emergencyTriggered;

        this.simulationTime = simulationTime;


        this.executionTimeMs = executionTimeMs;
    }

    // =====================================================
    // Getters
    // =====================================================
    public LocalDateTime getSimulationTime() {
        return simulationTime;
    }

    public String getSimulationId() {
        return simulationId;
    }


    public long getExecutionTimeMs() {
        return executionTimeMs;
    }

    public String getIntersectionId() {
        return intersectionId;
    }

    public Direction getSelectedLane() {
        return selectedLane;
    }

    public int getGreenTime() {
        return greenTime;
    }

    public int getVehiclesPassed() {
        return vehiclesPassed;
    }

    public int getRemainingVehicles() {
        return remainingVehicles;
    }

    public double getTrafficScore() {
        return trafficScore;
    }

    public String getReason() {
        return reason;
    }

    public QueueSnapshot getQueueBefore() {
        return queueBefore;
    }

    public QueueSnapshot getQueueAfter() {
        return queueAfter;
    }

    public boolean isEmergencyTriggered() {
        return emergencyTriggered;
    }


    @Override
    public String toString() {

        return "TrafficSimulationRecord{" +
                "simulationId='" + simulationId + '\'' +
                ", simulationTime=" + simulationTime +
                ", executionTimeMs=" + executionTimeMs +
                ", intersectionId='" + intersectionId + '\'' +
                ", selectedLane=" + selectedLane +
                ", greenTime=" + greenTime +
                ", vehiclesPassed=" + vehiclesPassed +
                ", remainingVehicles=" + remainingVehicles +
                ", trafficScore=" + trafficScore +
                ", emergencyTriggered=" + emergencyTriggered +
                ", reason='" + reason + '\'' +
                ", queueBefore=" + queueBefore +
                ", queueAfter=" + queueAfter +
                '}';
    }
}