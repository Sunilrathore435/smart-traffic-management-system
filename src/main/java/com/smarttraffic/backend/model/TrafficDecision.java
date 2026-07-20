package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalPhase;

public class TrafficDecision {

    // =====================================================
    // AI Decision
    // =====================================================

    /*
     * Selected traffic signal phase.
     * (NORTH_SOUTH / EAST_WEST)
     */
    private final SignalPhase signalPhase;

    /*
     * Lane with the highest traffic score.
     * Used for analytics only.
     */
    private final Direction dominantLane;

    /*
     * Green time allocated for this phase.
     */
    private final int greenTime;

    /*
     * Vehicles allowed to pass from each direction.
     */
    private final int northVehiclesAllowed;

    private final int southVehiclesAllowed;

    private final int eastVehiclesAllowed;

    private final int westVehiclesAllowed;

    /*
     * Overall phase traffic score.
     */
    private final double trafficScore;

    /*
     * AI explanation.
     */
    private final String reason;

    // =====================================================
    // Execution Statistics
    // =====================================================

    private int vehiclesPassed;

    private int remainingVehicles;

    // =====================================================
    // Constructor
    // =====================================================

    public TrafficDecision(
            SignalPhase signalPhase,
            Direction dominantLane,
            int greenTime,
            int northVehiclesAllowed,
            int southVehiclesAllowed,
            int eastVehiclesAllowed,
            int westVehiclesAllowed,
            double trafficScore,
            String reason) {

        this.signalPhase = signalPhase;
        this.dominantLane = dominantLane;
        this.greenTime = greenTime;

        this.northVehiclesAllowed = northVehiclesAllowed;
        this.southVehiclesAllowed = southVehiclesAllowed;
        this.eastVehiclesAllowed = eastVehiclesAllowed;
        this.westVehiclesAllowed = westVehiclesAllowed;

        this.trafficScore = trafficScore;
        this.reason = reason;
    }

    // =====================================================
    // Getters
    // =====================================================

    public SignalPhase getSignalPhase() {
        return signalPhase;
    }

    public Direction getDominantLane() {
        return dominantLane;
    }

    public int getGreenTime() {
        return greenTime;
    }

    public int getNorthVehiclesAllowed() {
        return northVehiclesAllowed;
    }

    public int getSouthVehiclesAllowed() {
        return southVehiclesAllowed;
    }

    public int getEastVehiclesAllowed() {
        return eastVehiclesAllowed;
    }

    public int getWestVehiclesAllowed() {
        return westVehiclesAllowed;
    }

    public double getTrafficScore() {
        return trafficScore;
    }

    public String getReason() {
        return reason;
    }

    // =====================================================
    // Execution Statistics
    // =====================================================

    public int getVehiclesPassed() {
        return vehiclesPassed;
    }

    public void setVehiclesPassed(int vehiclesPassed) {
        this.vehiclesPassed = vehiclesPassed;
    }

    public int getRemainingVehicles() {
        return remainingVehicles;
    }

    public void setRemainingVehicles(int remainingVehicles) {
        this.remainingVehicles = remainingVehicles;
    }

    // =====================================================
    // Helper Methods
    // =====================================================

    public int getTotalVehiclesAllowed() {

        return northVehiclesAllowed
                + southVehiclesAllowed
                + eastVehiclesAllowed
                + westVehiclesAllowed;
    }

    // =====================================================
    // Debug
    // =====================================================

    @Override
    public String toString() {

        return "TrafficDecision{" +
                "signalPhase=" + signalPhase +
                ", dominantLane=" + dominantLane +
                ", greenTime=" + greenTime +
                ", northVehiclesAllowed=" + northVehiclesAllowed +
                ", southVehiclesAllowed=" + southVehiclesAllowed +
                ", eastVehiclesAllowed=" + eastVehiclesAllowed +
                ", westVehiclesAllowed=" + westVehiclesAllowed +
                ", trafficScore=" + trafficScore +
                ", reason='" + reason + '\'' +
                ", vehiclesPassed=" + vehiclesPassed +
                ", remainingVehicles=" + remainingVehicles +
                '}';
    }
}