package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;

import java.time.LocalDateTime;
import java.util.EnumMap;
import java.util.Map;

public class Intersection {

    // ==========================
    // Basic Information
    // ==========================

    private final String intersectionId;
    private String intersectionName;

    // Future Map Integration
    private double latitude;
    private double longitude;

    // Traffic Lanes
    private final Map<Direction, TrafficLane> lanes;

    // Current Active Green Lane
    private Direction currentGreenLane;

    // Statistics
    private long totalVehiclesProcessed;
    private LocalDateTime lastUpdated;

    public Intersection(String intersectionId,
                        String intersectionName,
                        double latitude,
                        double longitude) {

        this.intersectionId = intersectionId;
        this.intersectionName = intersectionName;
        this.latitude = latitude;
        this.longitude = longitude;

        this.lanes = new EnumMap<>(Direction.class);

        lanes.put(Direction.NORTH, new TrafficLane(Direction.NORTH));
        lanes.put(Direction.SOUTH, new TrafficLane(Direction.SOUTH));
        lanes.put(Direction.EAST, new TrafficLane(Direction.EAST));
        lanes.put(Direction.WEST, new TrafficLane(Direction.WEST));

        this.currentGreenLane = Direction.NORTH;
        this.totalVehiclesProcessed = 0;
        this.lastUpdated = LocalDateTime.now();
    }

    // ==========================
    // Lane Operations
    // ==========================

    public TrafficLane getLane(Direction direction) {
        return lanes.get(direction);
    }

    public Map<Direction, TrafficLane> getAllLanes() {
        return lanes;
    }

    // ==========================
    // Statistics
    // ==========================

    public void incrementProcessedVehicles(int count) {
        totalVehiclesProcessed += count;
        lastUpdated = LocalDateTime.now();
    }

    // ==========================
    // Getters
    // ==========================

    public String getIntersectionId() {
        return intersectionId;
    }

    public String getIntersectionName() {
        return intersectionName;
    }

    public void setIntersectionName(String intersectionName) {
        this.intersectionName = intersectionName;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Direction getCurrentGreenLane() {
        return currentGreenLane;
    }

    public void setCurrentGreenLane(Direction currentGreenLane) {
        this.currentGreenLane = currentGreenLane;
        this.lastUpdated = LocalDateTime.now();
    }

    public long getTotalVehiclesProcessed() {
        return totalVehiclesProcessed;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    @Override
    public String toString() {
        return "Intersection{" +
                "intersectionId='" + intersectionId + '\'' +
                ", intersectionName='" + intersectionName + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", currentGreenLane=" + currentGreenLane +
                ", totalVehiclesProcessed=" + totalVehiclesProcessed +
                '}';
    }
}