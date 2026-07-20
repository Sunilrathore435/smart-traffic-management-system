package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalStatus;
import com.smarttraffic.backend.enums.VehicleType;

import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

public class TrafficLane {

    private final Direction direction;

    private SignalStatus signalStatus;

    private final Queue<Vehicle> waitingVehicles;

    public TrafficLane(Direction direction) {

        this.direction = direction;
        this.signalStatus = SignalStatus.RED;
        this.waitingVehicles = new ConcurrentLinkedQueue<>();

    }

    // ==========================================================
    // BASIC GETTERS
    // ==========================================================

    public Direction getDirection() {
        return direction;
    }

    public SignalStatus getSignalStatus() {
        return signalStatus;
    }

    public void setSignalStatus(SignalStatus signalStatus) {
        this.signalStatus = signalStatus;
    }

    public void addVehicle(Vehicle vehicle) {
        waitingVehicles.offer(vehicle);
    }

    public Vehicle removeVehicle() {
        return waitingVehicles.poll();
    }

    public Vehicle peekVehicle() {
        return waitingVehicles.peek();
    }

    public int getVehicleCount() {
        return waitingVehicles.size();
    }

    public boolean isEmpty() {
        return waitingVehicles.isEmpty();
    }

    public List<Vehicle> getWaitingVehicles() {
        return List.copyOf(waitingVehicles);
    }

    /**
     * Creates a stable snapshot of the queue for analysis.
     */
    private List<Vehicle> snapshot() {
        return new ArrayList<>(waitingVehicles);
    }

    // ==========================================================
    // SMART ANALYSIS METHODS
    // ==========================================================

    /**
     * Checks whether this lane contains an emergency vehicle.
     */
    public boolean hasEmergencyVehicle() {

        for (Vehicle vehicle : snapshot()) {

            if (vehicle.getVehicleType() == VehicleType.AMBULANCE
                    || vehicle.getVehicleType() == VehicleType.FIRE_TRUCK) {

                return true;

            }

        }

        return false;

    }

    /**
     * Returns emergency vehicle position.
     * First vehicle = position 1
     * Returns -1 if none exists.
     */
    public int getEmergencyVehiclePosition() {

        int position = 1;

        for (Vehicle vehicle : snapshot()) {

            if (vehicle.getVehicleType() == VehicleType.AMBULANCE
                    || vehicle.getVehicleType() == VehicleType.FIRE_TRUCK) {

                return position;

            }

            position++;

        }

        return -1;

    }

    /**
     * Returns total priority score of the lane.
     */
    public int getTotalPriorityScore() {

        int score = 0;

        for (Vehicle vehicle : snapshot()) {

            score += vehicle.getPriorityScore();

        }

        return score;

    }

    /**
     * Returns average waiting time in seconds.
     */
    public double getAverageWaitingTime() {

        List<Vehicle> vehicles = snapshot();

        if (vehicles.isEmpty()) {
            return 0;
        }

        long totalWaiting = 0;

        for (Vehicle vehicle : vehicles) {

            totalWaiting += vehicle.getWaitingTimeSeconds();

        }

        return (double) totalWaiting / vehicles.size();

    }

    /**
     * Number of vehicles before the emergency vehicle.
     * Returns -1 if no emergency vehicle exists.
     */
    public int vehiclesBeforeEmergency() {

        int count = 0;

        for (Vehicle vehicle : snapshot()) {

            if (vehicle.getVehicleType() == VehicleType.AMBULANCE
                    || vehicle.getVehicleType() == VehicleType.FIRE_TRUCK) {

                return count;

            }

            count++;

        }

        return -1;

    }

}