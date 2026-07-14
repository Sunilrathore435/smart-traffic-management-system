package com.smarttraffic.backend.dto.analytics;

public class LaneRankingResponse {

    private String name;

    private int vehicles;

    private int congestion;

    public LaneRankingResponse() {
    }

    public LaneRankingResponse(
            String name,
            int vehicles,
            int congestion) {

        this.name = name;
        this.vehicles = vehicles;
        this.congestion = congestion;
    }

    public String getName() {
        return name;
    }

    public int getVehicles() {
        return vehicles;
    }

    public int getCongestion() {
        return congestion;
    }

}