package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;

import java.time.LocalDateTime;
import java.util.EnumMap;
import java.util.Map;

public class Intersection {

    // ==================================================
    // Basic Information
    // ==================================================

    private final String intersectionId;

    private String intersectionName;

    // Future Map Integration (OpenStreetMap / Google Maps)
    private double latitude;

    private double longitude;

    // ==================================================
    // Traffic Information
    // ==================================================

    private final Map<Direction, TrafficLane> lanes;

    // Currently Green Signal
    private Direction currentGreenLane;

    // ==================================================
    // Statistics
    // ==================================================

    private long totalVehiclesProcessed;

    private LocalDateTime lastUpdated;

    // ==================================================
    // Constructor
    // ==================================================

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

    // ==================================================
    // Lane Operations
    // ==================================================

    public TrafficLane getLane(Direction direction) {
        return lanes.get(direction);
    }

    public Map<Direction, TrafficLane> getAllLanes() {
        return lanes;
    }

    public boolean hasWaitingVehicles() {

        for (TrafficLane lane : lanes.values()) {

            if (!lane.isEmpty()) {
                return true;
            }

        }

        return false;
    }

    public int getTotalWaitingVehicles() {

        int total = 0;

        for (TrafficLane lane : lanes.values()) {

            total += lane.getVehicleCount();

        }

        return total;
    }

    // ==================================================
    // Signal Management
    // ==================================================

    public Direction getCurrentGreenLane() {
        return currentGreenLane;
    }

    public void setCurrentGreenLane(Direction currentGreenLane) {

        this.currentGreenLane = currentGreenLane;

        updateTimestamp();
    }

    // ==================================================
    // Statistics
    // ==================================================

    public void incrementProcessedVehicles(int count) {

        totalVehiclesProcessed += count;

        updateTimestamp();
    }

    public long getProcessedVehicles() {
        return totalVehiclesProcessed;
    }

    public long getTotalVehiclesProcessed() {
        return totalVehiclesProcessed;
    }

    public void resetStatistics() {

        totalVehiclesProcessed = 0;

        updateTimestamp();
    }

    /**
     * Temporary utilization.
     * Later it will be calculated using
     * actual lane capacity.
     */
    public double getUtilizationPercentage() {

        return Math.min(100.0, getTotalWaitingVehicles());

    }

    // ==================================================
    // Helper
    // ==================================================

    private void updateTimestamp() {

        lastUpdated = LocalDateTime.now();

    }

    // ==================================================
    // Getters & Setters
    // ==================================================

    public String getIntersectionId() {
        return intersectionId;
    }

    public String getIntersectionName() {
        return intersectionName;
    }

    public void setIntersectionName(String intersectionName) {

        this.intersectionName = intersectionName;

        updateTimestamp();
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {

        this.latitude = latitude;

        updateTimestamp();
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {

        this.longitude = longitude;

        updateTimestamp();
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    // ==================================================
    // Debug
    // ==================================================

    @Override
    public String toString() {

        return "Intersection{" +
                "intersectionId='" + intersectionId + '\'' +
                ", intersectionName='" + intersectionName + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", currentGreenLane=" + currentGreenLane +
                ", waitingVehicles=" + getTotalWaitingVehicles() +
                ", totalVehiclesProcessed=" + totalVehiclesProcessed +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}