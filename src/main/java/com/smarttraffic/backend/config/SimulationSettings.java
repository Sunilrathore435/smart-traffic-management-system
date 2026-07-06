package com.smarttraffic.backend.config;

import org.springframework.stereotype.Component;

@Component
public class SimulationSettings {

    // Is automatic simulation running?
    private boolean running = false;

    // Scheduler interval (milliseconds)
    private long interval = 5000;

    // Statistics
    private long totalSimulationCycles = 0;

    // Constructors
    public SimulationSettings() {
    }

    // Running
    public boolean isRunning() {
        return running;
    }

    public void setRunning(boolean running) {
        this.running = running;
    }

    // Interval
    public long getInterval() {
        return interval;
    }

    public void setInterval(long interval) {

        // Prevent invalid values
        if (interval < 1000) {
            interval = 1000;
        }

        this.interval = interval;
    }

    // Statistics
    public long getTotalSimulationCycles() {
        return totalSimulationCycles;
    }

    public void incrementSimulationCycle() {
        totalSimulationCycles++;
    }

    public void resetSimulationCycles() {
        totalSimulationCycles = 0;
    }
}