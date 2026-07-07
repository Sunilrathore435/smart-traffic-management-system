package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.config.SimulationSettings;
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

    private final SimulationSettings settings;
    private final TrafficService trafficService;
    private final SimulationHistoryService historyService;

    public SimulationController(
            SimulationSettings settings,
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
                        .getCurrentGreenLane() == null
                        ? "NONE"
                        : trafficService.getIntersection()
                        .getCurrentGreenLane()
                        .name(),

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