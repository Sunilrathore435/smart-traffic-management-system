package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.VehicleStatus;
import com.smarttraffic.backend.enums.VehicleType;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

public class Vehicle {

    private final String vehicleId;
    private String vehicleNumber;
    private VehicleType vehicleType;
    private VehicleStatus status;
    private final LocalDateTime entryTime;
    private final int priorityScore;

    public Vehicle(String vehicleNumber,
                   VehicleType vehicleType) {

        this.vehicleId = UUID.randomUUID().toString();
        this.vehicleNumber = vehicleNumber;
        this.vehicleType = vehicleType;
        this.status = VehicleStatus.WAITING;
        this.entryTime = LocalDateTime.now();
        this.priorityScore = calculatePriority(vehicleType);
    }

    private int calculatePriority(VehicleType type) {

        return switch (type) {

            case BIKE -> 5;

            case CAR -> 10;

            case BUS -> 20;

            case TRUCK -> 25;

            case AMBULANCE -> 100;

            case FIRE_TRUCK -> 100;
        };
    }

    public long getWaitingTimeSeconds() {
        return Duration.between(entryTime, LocalDateTime.now()).getSeconds();
    }

    public String getVehicleId() {
        return vehicleId;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public VehicleStatus getStatus() {
        return status;
    }

    public void setStatus(VehicleStatus status) {
        this.status = status;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public int getPriorityScore() {
        return priorityScore;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "vehicleId='" + vehicleId + '\'' +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", vehicleType=" + vehicleType +
                ", priorityScore=" + priorityScore +
                ", waitingTime=" + getWaitingTimeSeconds() +
                ", status=" + status +
                '}';
    }
}