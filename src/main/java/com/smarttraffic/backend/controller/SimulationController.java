package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.config.RuntimeSimulationState;
import com.smarttraffic.backend.dto.ApiResponse;
import com.smarttraffic.backend.dto.SimulationStatusResponse;
import com.smarttraffic.backend.enums.SchedulerStatus;
import com.smarttraffic.backend.service.SimulationHistoryService;
import com.smarttraffic.backend.service.TrafficService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulation")
public class SimulationController {

    private final RuntimeSimulationState settings;
    private final TrafficService trafficService;
    private final SimulationHistoryService historyService;

    public SimulationController(
            RuntimeSimulationState settings,
            TrafficService trafficService,
            SimulationHistoryService historyService) {

        this.settings = settings;
        this.trafficService = trafficService;
        this.historyService = historyService;
    }

    /**
     * Start automatic simulation
     */
    @PostMapping("/start")
    public ResponseEntity<ApiResponse> startSimulation() {

        settings.setRunning(true);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Automatic simulation started.",
                        null
                )
        );
    }

    /**
     * Stop automatic simulation
     */
    @PostMapping("/stop")
    public ResponseEntity<ApiResponse> stopSimulation() {

        settings.setRunning(false);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Automatic simulation stopped.",
                        null
                )
        );
    }

    /**
     * Current scheduler status
     */
    @GetMapping("/status")
    public SimulationStatusResponse getStatus() {

        return new SimulationStatusResponse(

                settings.isRunning(),

                settings.getInterval(),

                settings.getTotalSimulationCycles(),

                trafficService.getIntersection()
                        .getTotalVehiclesProcessed(),

                historyService.getSimulationCount(),

                trafficService.getIntersection()
                        .getIntersectionId(),

                trafficService.getIntersection()
                        .getIntersectionName(),

                trafficService.getIntersection()
                        .getCurrentSignalPhase() == null
                        ? "NONE"
                        : trafficService.getIntersection()
                        .getCurrentSignalPhase()
                        .name(),

                trafficService.getIntersection()
                        .getCurrentStage() == null
                        ? "NONE"
                        : trafficService.getIntersection()
                        .getCurrentStage()
                        .name(),

                trafficService.getIntersection()
                        .getPedestrianSignal() == null
                        ? "NONE"
                        : trafficService.getIntersection()
                        .getPedestrianSignal()
                        .name(),

                trafficService.getIntersection()
                        .getRemainingTime(),

                trafficService.getIntersection()
                        .isPedestrianWaiting(),

                settings.isRunning()
                        ? SchedulerStatus.RUNNING
                        : SchedulerStatus.STOPPED
        );
    }

    /**
     * Reset cycle counter
     */
    @PostMapping("/reset")
    public ResponseEntity<ApiResponse> resetCounter() {

        settings.resetSimulationCycles();

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Simulation counter reset.",
                        null
                )
        );
    }
}