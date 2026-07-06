package com.smarttraffic.backend.util;

public final class TrafficConstants {

    private TrafficConstants() {
    }

    /*
     * ============================================================
     * TRAFFIC SCORE WEIGHTS
     * Total = 1.0 (100%)
     * ============================================================
     */

    public static final double QUEUE_WEIGHT = 0.40;
    public static final double PRIORITY_WEIGHT = 0.30;
    public static final double WAITING_WEIGHT = 0.20;
    public static final double DENSITY_WEIGHT = 0.10;

    /*
     * ============================================================
     * SIGNAL TIMING
     * ============================================================
     */

    public static final int MIN_GREEN_TIME = 10;     // seconds
    public static final int MAX_GREEN_TIME = 40;     // seconds
    public static final int YELLOW_TIME = 3;          // seconds
    public static final int ALL_RED_TIME = 2;         // safety interval

    /*
     * ============================================================
     * VEHICLE MOVEMENT
     * ============================================================
     */

    public static final int PASSING_RATE = 2;         // seconds per vehicle
    public static final int MIN_VEHICLES_ALLOWED = 1;

    /*
     * ============================================================
     * EMERGENCY PRIORITY
     * ============================================================
     */

    public static final int EMERGENCY_SCORE = 1000;
    public static final int AMBULANCE_PRIORITY = 100;
    public static final int FIRE_TRUCK_PRIORITY = 100;

    /*
     * ============================================================
     * NORMAL VEHICLE PRIORITY
     * ============================================================
     */

    public static final int CAR_PRIORITY = 10;
    public static final int BIKE_PRIORITY = 5;
    public static final int BUS_PRIORITY = 20;
    public static final int TRUCK_PRIORITY = 25;

    /*
     * ============================================================
     * WAITING TIME
     * ============================================================
     */

    public static final int MAX_WAITING_TIME = 120;   // seconds
    public static final int WAITING_TIME_THRESHOLD = 60;

    /*
     * ============================================================
     * SIMULATION
     * ============================================================
     */

    public static final int SIMULATION_INTERVAL = 5;  // seconds
    public static final int MAX_QUEUE_LENGTH = 100;
}