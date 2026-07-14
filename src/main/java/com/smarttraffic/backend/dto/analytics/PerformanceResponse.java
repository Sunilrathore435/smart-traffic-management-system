package com.smarttraffic.backend.dto.analytics;

public class PerformanceResponse {

    private int efficiency;

    private int throughput;

    private int fuelSaving;

    public PerformanceResponse() {
    }

    public PerformanceResponse(
            int efficiency,
            int throughput,
            int fuelSaving) {

        this.efficiency = efficiency;
        this.throughput = throughput;
        this.fuelSaving = fuelSaving;
    }

    public int getEfficiency() {
        return efficiency;
    }

    public int getThroughput() {
        return throughput;
    }

    public int getFuelSaving() {
        return fuelSaving;
    }

}