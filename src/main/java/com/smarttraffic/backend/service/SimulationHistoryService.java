package com.smarttraffic.backend.service;

import com.smarttraffic.backend.model.TrafficSimulationRecord;
import com.smarttraffic.backend.repository.TrafficSimulationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimulationHistoryService {

    private final TrafficSimulationRepository repository;

    public SimulationHistoryService(
            TrafficSimulationRepository repository) {

        this.repository = repository;
    }

    /**
     * Save one simulation into MongoDB.
     */
    public void saveSimulation(TrafficSimulationRecord record) {

        repository.save(record);

    }

    /**
     * Return complete simulation history.
     */
    public List<TrafficSimulationRecord> getAllSimulations() {

        return repository.findAll();

    }

    /**
     * Return latest simulation.
     */
    public TrafficSimulationRecord getLatestSimulation() {

        return repository.findTopByOrderBySimulationTimeDesc();

    }

    /**
     * Delete all simulation history.
     */
    public void clearHistory() {

        repository.deleteAll();

    }

    /**
     * Number of simulations.
     */
    public long getSimulationCount() {

        return repository.count();

    }

}