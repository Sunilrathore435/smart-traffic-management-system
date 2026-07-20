package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalPhase;
import com.smarttraffic.backend.enums.PedestrianSignal;
import com.smarttraffic.backend.enums.SimulationStage;
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

    // ==================================================
// Signal Management
// ==================================================

    /*
     * Current active signal phase.
     * Determines which pair of roads has GREEN.
     */
    private SignalPhase currentSignalPhase;

    /*
     * Lane with the highest traffic score.
     * Used only for analytics and dashboard.
     * This is NOT the active green lane.
     */
    private Direction dominantLane;

    /*
     * Current traffic controller stage.
     */
    private SimulationStage currentStage;

    /*
     * Current pedestrian signal.
     */
    private PedestrianSignal pedestrianSignal;

    /*
     * Remaining seconds of current stage.
     */
    private int remainingTime;

    /*
     * Time when current stage started.
     */
    private LocalDateTime phaseStartTime;

    /*
     * Emergency vehicle state.
     */
    private boolean emergencyActive;

    /*
     * Lane containing the emergency vehicle.
     */
    private Direction emergencyLane;
    /*
     * Indicates whether a pedestrian has requested to cross.
     */
    private boolean pedestrianWaiting;

    /*
     * Direction from which the pedestrian requested crossing.
     */
    private Direction pedestrianDirection;

    /*
     * Time when the pedestrian request was received.
     */
    private LocalDateTime pedestrianRequestTime;
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

        this.currentSignalPhase = SignalPhase.NORTH_SOUTH;

        this.dominantLane = Direction.NORTH;

        this.currentStage = SimulationStage.VEHICLE_GREEN;

        this.pedestrianSignal = PedestrianSignal.DONT_WALK;

        this.remainingTime = 0;

        this.phaseStartTime = LocalDateTime.now();

        this.emergencyActive = false;

        this.emergencyLane = null;
        this.pedestrianWaiting = false;
        this.pedestrianDirection = null;
        this.pedestrianRequestTime = null;

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


    public SignalPhase getCurrentSignalPhase() {
        return currentSignalPhase;
    }

    public void setCurrentSignalPhase(SignalPhase currentSignalPhase) {

        this.currentSignalPhase = currentSignalPhase;

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

    public Direction getDominantLane() {
        return dominantLane;
    }

    public void setDominantLane(Direction dominantLane) {
        this.dominantLane = dominantLane;
        updateTimestamp();
    }

    public SimulationStage getCurrentStage() {
        return currentStage;
    }

    public void setCurrentStage(SimulationStage currentStage) {

        this.currentStage = currentStage;

        updateTimestamp();
    }

    public PedestrianSignal getPedestrianSignal() {
        return pedestrianSignal;
    }

    public void setPedestrianSignal(PedestrianSignal pedestrianSignal) {
        this.pedestrianSignal = pedestrianSignal;
        updateTimestamp();
    }

    public int getRemainingTime() {
        return remainingTime;
    }

    public void setRemainingTime(int remainingTime) {
        this.remainingTime = remainingTime;
        updateTimestamp();
    }

    public LocalDateTime getPhaseStartTime() {
        return phaseStartTime;
    }

    public void setPhaseStartTime(LocalDateTime phaseStartTime) {

        this.phaseStartTime = phaseStartTime;

        updateTimestamp();
    }

    public boolean isEmergencyActive() {
        return emergencyActive;
    }

    public void setEmergencyActive(boolean emergencyActive) {
        this.emergencyActive = emergencyActive;
        updateTimestamp();
    }

    public Direction getEmergencyLane() {
        return emergencyLane;
    }

    public void setEmergencyLane(Direction emergencyLane) {
        this.emergencyLane = emergencyLane;
        updateTimestamp();
    }
// ==================================================
// Pedestrian Management
// ==================================================

    public boolean isPedestrianWaiting() {
        return pedestrianWaiting;
    }

    public void setPedestrianWaiting(boolean pedestrianWaiting) {
        this.pedestrianWaiting = pedestrianWaiting;
        updateTimestamp();
    }

    public Direction getPedestrianDirection() {
        return pedestrianDirection;
    }

    public void setPedestrianDirection(Direction pedestrianDirection) {
        this.pedestrianDirection = pedestrianDirection;
        updateTimestamp();
    }

    public LocalDateTime getPedestrianRequestTime() {
        return pedestrianRequestTime;
    }

    public void setPedestrianRequestTime(LocalDateTime pedestrianRequestTime) {
        this.pedestrianRequestTime = pedestrianRequestTime;
        updateTimestamp();
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
                ", currentSignalPhase=" + currentSignalPhase +
                ", dominantLane=" + dominantLane +
                ", currentStage=" + currentStage +
                ", pedestrianSignal=" + pedestrianSignal +
                ", remainingTime=" + remainingTime +
                ", phaseStartTime=" + phaseStartTime +
                ", emergencyActive=" + emergencyActive +
                ", emergencyLane=" + emergencyLane +
                ", waitingVehicles=" + getTotalWaitingVehicles() +
                ", totalVehiclesProcessed=" + totalVehiclesProcessed +
                ", lastUpdated=" + lastUpdated +
                ", pedestrianWaiting=" + pedestrianWaiting +
                ", pedestrianDirection=" + pedestrianDirection +
                ", pedestrianRequestTime=" + pedestrianRequestTime +
                '}';
    }
}
