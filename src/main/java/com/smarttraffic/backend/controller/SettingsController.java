package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.dto.SettingsRequest;
import com.smarttraffic.backend.dto.SettingsResponse;
import com.smarttraffic.backend.model.SimulationSettings;
import com.smarttraffic.backend.service.SettingsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(
            SettingsService settingsService) {

        this.settingsService = settingsService;

    }

    /**
     * Get current settings.
     */
    @GetMapping
    public SettingsResponse getSettings() {

        SimulationSettings settings =
                settingsService.getSettings();

        return map(settings);

    }

    /**
     * Update settings.
     */
    @PutMapping
    public SettingsResponse updateSettings(

            @RequestBody SettingsRequest request

    ) {

        SimulationSettings updated =
                settingsService.updateSettings(request);

        return map(updated);

    }

    /**
     * Restore default settings.
     */
    @PostMapping("/reset")
    public SettingsResponse resetSettings() {

        SimulationSettings defaults =
                settingsService.resetSettings();

        return map(defaults);

    }

    /**
     * Convert Entity -> DTO
     */
    private SettingsResponse map(
            SimulationSettings settings) {

        SettingsResponse response =
                new SettingsResponse();

        // Simulation
        response.setAutoSimulation(
                settings.isAutoSimulation());

        response.setVehicleSpawnRate(
                settings.getVehicleSpawnRate());

        response.setSchedulerInterval(
                settings.getSchedulerInterval());

        // AI
        response.setAdaptiveAI(
                settings.isAdaptiveAI());

        response.setMinGreenTime(
                settings.getMinGreenTime());

        response.setMaxGreenTime(
                settings.getMaxGreenTime());

        response.setVehiclesPerGreen(
                settings.getVehiclesPerGreen());

        // Emergency
        response.setEmergencyPriority(
                settings.isEmergencyPriority());

        response.setEmergencyGreenTime(
                settings.getEmergencyGreenTime());

        // Dashboard
        response.setRefreshRate(
                settings.getRefreshRate());

        response.setHistoryLimit(
                settings.getHistoryLimit());

        return response;
    }

}