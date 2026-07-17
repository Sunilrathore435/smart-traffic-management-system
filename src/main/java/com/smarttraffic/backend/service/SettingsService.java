package com.smarttraffic.backend.service;

import com.smarttraffic.backend.config.RuntimeSimulationState;
import com.smarttraffic.backend.dto.SettingsRequest;
import com.smarttraffic.backend.model.SimulationSettings;
import com.smarttraffic.backend.repository.SettingsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsService {

    private final SettingsRepository repository;

    private final RuntimeSimulationState runtimeState;

    public SettingsService(
            SettingsRepository repository,
            RuntimeSimulationState runtimeState) {

        this.repository = repository;
        this.runtimeState = runtimeState;
    }

    /**
     * Return current settings.
     * If settings don't exist, create default settings.
     */
    public SimulationSettings getSettings() {

        List<SimulationSettings> settings =
                repository.findAll();

        if (settings.isEmpty()) {

            SimulationSettings defaults =
                    new SimulationSettings();

            SimulationSettings saved =
                    repository.save(defaults);

            syncRuntimeState(saved);

            return saved;
        }

        SimulationSettings current =
                settings.get(0);

        syncRuntimeState(current);

        return current;
    }

    /**
     * Save updated settings.
     */
    public SimulationSettings updateSettings(
            SettingsRequest request) {

        SimulationSettings settings =
                getSettings();

        // =====================================================
        // Simulation
        // =====================================================

        settings.setAutoSimulation(
                request.isAutoSimulation());

        settings.setVehicleSpawnRate(
                request.getVehicleSpawnRate());

        settings.setSchedulerInterval(
                request.getSchedulerInterval());

        // =====================================================
        // Artificial Intelligence
        // =====================================================

        settings.setAdaptiveAI(
                request.isAdaptiveAI());

        settings.setMinGreenTime(
                request.getMinGreenTime());

        settings.setMaxGreenTime(
                request.getMaxGreenTime());

        settings.setVehiclesPerGreen(
                request.getVehiclesPerGreen());

        // =====================================================
        // Emergency
        // =====================================================

        settings.setEmergencyPriority(
                request.isEmergencyPriority());

        settings.setEmergencyGreenTime(
                request.getEmergencyGreenTime());

        // =====================================================
        // Dashboard
        // =====================================================

        settings.setRefreshRate(
                request.getRefreshRate());

        settings.setHistoryLimit(
                request.getHistoryLimit());

        SimulationSettings saved =
                repository.save(settings);

        syncRuntimeState(saved);

        return saved;
    }

    /**
     * Restore default settings.
     */
    public SimulationSettings resetSettings() {

        repository.deleteAll();

        SimulationSettings defaults =
                new SimulationSettings();

        SimulationSettings saved =
                repository.save(defaults);

        syncRuntimeState(saved);

        return saved;
    }

    /**
     * Copy MongoDB settings into RuntimeSimulationState.
     */
    private void syncRuntimeState(
            SimulationSettings settings) {

        // Runtime

        runtimeState.setRunning(
                settings.isAutoSimulation());

        runtimeState.setInterval(
                settings.getSchedulerInterval());

        // Simulation

        runtimeState.setVehicleSpawnRate(
                settings.getVehicleSpawnRate());

        // Artificial Intelligence

        runtimeState.setAdaptiveAI(
                settings.isAdaptiveAI());

        runtimeState.setMinGreenTime(
                settings.getMinGreenTime());

        runtimeState.setMaxGreenTime(
                settings.getMaxGreenTime());

        runtimeState.setVehiclesPerGreen(
                settings.getVehiclesPerGreen());

        // Emergency

        runtimeState.setEmergencyPriority(
                settings.isEmergencyPriority());

        runtimeState.setEmergencyGreenTime(
                settings.getEmergencyGreenTime());

        // Dashboard

        runtimeState.setRefreshRate(
                settings.getRefreshRate());

        runtimeState.setHistoryLimit(
                settings.getHistoryLimit());

        System.out.println(
                "Runtime Settings Updated -> " +
                        runtimeState
        );
    }

}