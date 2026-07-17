package com.smarttraffic.backend.scheduler;

import com.smarttraffic.backend.config.RuntimeSimulationState;
import com.smarttraffic.backend.service.TrafficService;
import com.smarttraffic.backend.service.VehicleGeneratorService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TrafficScheduler {

    private final TrafficService trafficService;

    private final RuntimeSimulationState runtimeState;

    private final VehicleGeneratorService vehicleGeneratorService;

    public TrafficScheduler(
            TrafficService trafficService,
            RuntimeSimulationState runtimeState,
            VehicleGeneratorService vehicleGeneratorService) {

        this.trafficService = trafficService;
        this.runtimeState = runtimeState;
        this.vehicleGeneratorService = vehicleGeneratorService;
    }

    @Scheduled(fixedRate = 5000)
    public void runSimulation() {
        // Auto Simulation OFF
        if (!runtimeState.isRunning()) {
            return;
        }

        // Generate random vehicles according to Vehicle Spawn Rate
        vehicleGeneratorService.generateTraffic();

        // If still no vehicles, skip simulation
        if (!trafficService.getIntersection().hasWaitingVehicles()) {

            System.out.println("🚦 Scheduler Idle - No vehicles waiting.");

            return;
        }

        System.out.println("\n========== AUTO SIMULATION ==========");

        trafficService.simulateTraffic();

        runtimeState.incrementSimulationCycle();
    }
}