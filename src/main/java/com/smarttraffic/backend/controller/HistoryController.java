package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.dto.ApiResponse;
import com.smarttraffic.backend.model.TrafficSimulationRecord;
import com.smarttraffic.backend.service.SimulationHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final SimulationHistoryService historyService;

    public HistoryController(
            SimulationHistoryService historyService) {

        this.historyService = historyService;
    }

    /**
     * Get complete simulation history.
     */
    @GetMapping
    public List<TrafficSimulationRecord> getHistory() {

        return historyService.getAllSimulations();

    }

    /**
     * Get latest simulation.
     */
    @GetMapping("/latest")
    public TrafficSimulationRecord getLatestSimulation() {

        return historyService.getLatestSimulation();

    }

    /**
     * Get total simulation count.
     */
    @GetMapping("/count")
    public long getSimulationCount() {

        return historyService.getSimulationCount();

    }

    /**
     * Delete all simulation history.
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse> clearHistory() {

        historyService.clearHistory();

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Simulation history cleared successfully.",
                        null
                )
        );
    }

}