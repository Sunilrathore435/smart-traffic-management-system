package com.smarttraffic.backend.dto.analytics;

public class SystemHealthResponse {

    private String status;

    private double uptime;

    public SystemHealthResponse() {
    }

    public SystemHealthResponse(
            String status,
            double uptime) {

        this.status = status;
        this.uptime = uptime;
    }

    public String getStatus() {
        return status;
    }

    public double getUptime() {
        return uptime;
    }

}