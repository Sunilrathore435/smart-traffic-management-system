package com.smarttraffic.backend.service;

import com.smarttraffic.backend.model.TrafficSimulationRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SimulationHistoryService {

    private final List<TrafficSimulationRecord> history =
            new ArrayList<>();

    /**
     * Save one simulation.
     */
    public void saveSimulation(TrafficSimulationRecord record) {

        history.add(record);

    }

    /**
     * Return complete history.
     */
    public List<TrafficSimulationRecord> getAllSimulations() {

        return Collections.unmodifiableList(history);

    }

    /**
     * Return latest simulation.
     */
    public TrafficSimulationRecord getLatestSimulation() {

        if (history.isEmpty()) {
            return null;
        }

        return history.get(history.size() - 1);

    }

    /**
     * Clear history.
     */
    public void clearHistory() {

        history.clear();

    }

    /**
     * Number of simulations.
     */
    public int getSimulationCount() {

        return history.size();

    }

}