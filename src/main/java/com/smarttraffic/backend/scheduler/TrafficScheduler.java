package com.smarttraffic.backend.scheduler;

import com.smarttraffic.backend.config.SimulationSettings;
import com.smarttraffic.backend.service.TrafficService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TrafficScheduler {

    private final TrafficService trafficService;
    private final SimulationSettings settings;

    public TrafficScheduler(TrafficService trafficService,
                            SimulationSettings settings) {

        this.trafficService = trafficService;
        this.settings = settings;
    }

    @Scheduled(fixedRate = 5000)
    public void runSimulation() {

        // Simulation stopped
        if (!settings.isRunning()) {
            return;
        }

        // No vehicles waiting
        if (!trafficService.getIntersection().hasWaitingVehicles()) {

            System.out.println("🚦 Scheduler Idle - No vehicles waiting.");

            return;
        }

        System.out.println("\n===== AUTO SIMULATION =====");

        trafficService.simulateTraffic();

        settings.incrementSimulationCycle();
    }
}