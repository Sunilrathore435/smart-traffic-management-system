package com.smarttraffic.backend.dto;

import java.util.Map;

public class TrafficStatusResponse {

    private String busiestLane;
    private Map<String, Integer> vehicleCounts;

    public TrafficStatusResponse(String busiestLane, Map<String, Integer> vehicleCounts) {
        this.busiestLane = busiestLane;
        this.vehicleCounts = vehicleCounts;
    }

    public String getBusiestLane() {
        return busiestLane;
    }

    public Map<String, Integer> getVehicleCounts() {
        return vehicleCounts;
    }

}