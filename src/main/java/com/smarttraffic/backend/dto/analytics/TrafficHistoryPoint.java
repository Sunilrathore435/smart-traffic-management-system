package com.smarttraffic.backend.dto.analytics;

public class TrafficHistoryPoint {

    private String time;

    private int vehicles;

    public TrafficHistoryPoint() {
    }

    public TrafficHistoryPoint(
            String time,
            int vehicles) {

        this.time = time;
        this.vehicles = vehicles;
    }

    public String getTime() {
        return time;
    }

    public int getVehicles() {
        return vehicles;
    }

}