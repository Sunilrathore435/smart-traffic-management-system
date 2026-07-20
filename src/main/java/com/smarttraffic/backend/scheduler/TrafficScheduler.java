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
    public void generateTraffic() {

        if (!runtimeState.isRunning()) {
            return;
        }

        vehicleGeneratorService.generateTraffic();
    }
    @Scheduled(fixedRate = 1000)
    public void runSimulation() {

        if (!runtimeState.isRunning()) {
            return;
        }

        if (!trafficService.getIntersection().hasWaitingVehicles()) {
            return;
        }

        trafficService.simulateTraffic();
    }
}