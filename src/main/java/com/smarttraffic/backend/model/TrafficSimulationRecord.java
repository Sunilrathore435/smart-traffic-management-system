package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;

import java.time.LocalDateTime;
import java.util.UUID;

public class TrafficSimulationRecord {

    private final String simulationId;

    private final LocalDateTime simulationTime;

    private String intersectionId;

    private Direction selectedLane;

    private int greenTime;

    private int vehiclesPassed;

    private double trafficScore;

    private String reason;

    public TrafficSimulationRecord(String intersectionId,
                                   Direction selectedLane,
                                   int greenTime,
                                   int vehiclesPassed,
                                   double trafficScore,
                                   String reason) {

        this.simulationId = UUID.randomUUID().toString();
        this.simulationTime = LocalDateTime.now();

        this.intersectionId = intersectionId;
        this.selectedLane = selectedLane;
        this.greenTime = greenTime;
        this.vehiclesPassed = vehiclesPassed;
        this.trafficScore = trafficScore;
        this.reason = reason;
    }

    public String getSimulationId() {
        return simulationId;
    }

    public LocalDateTime getSimulationTime() {
        return simulationTime;
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

    public double getTrafficScore() {
        return trafficScore;
    }

    public String getReason() {
        return reason;
    }

    @Override
    public String toString() {
        return "TrafficSimulationRecord{" +
                "simulationId='" + simulationId + '\'' +
                ", simulationTime=" + simulationTime +
                ", intersectionId='" + intersectionId + '\'' +
                ", selectedLane=" + selectedLane +
                ", greenTime=" + greenTime +
                ", vehiclesPassed=" + vehiclesPassed +
                ", trafficScore=" + trafficScore +
                ", reason='" + reason + '\'' +
                '}';
    }
}