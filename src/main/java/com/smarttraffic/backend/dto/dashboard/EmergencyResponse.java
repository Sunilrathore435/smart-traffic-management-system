package com.smarttraffic.backend.dto.dashboard;

public class EmergencyResponse {

    private boolean active;

    private String lane;

    public EmergencyResponse() {
    }

    public EmergencyResponse(
            boolean active,
            String lane) {

        this.active = active;
        this.lane = lane;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getLane() {
        return lane;
    }

    public void setLane(String lane) {
        this.lane = lane;
    }

}