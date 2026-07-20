package com.smarttraffic.backend.repository;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalPhase;
import com.smarttraffic.backend.model.TrafficSimulationRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TrafficSimulationRepository
        extends MongoRepository<TrafficSimulationRecord, String> {

    /**
     * Latest simulation.
     */
    TrafficSimulationRecord findTopByOrderBySimulationTimeDesc();

    /**
     * Find all simulations for an intersection.
     */
    List<TrafficSimulationRecord> findByIntersectionId(
            String intersectionId
    );

    /**
     * Find simulations by dominant lane.
     */
    List<TrafficSimulationRecord> findByDominantLane(
            Direction dominantLane
    );

    /**
     * Find simulations by signal phase.
     */
    List<TrafficSimulationRecord> findBySignalPhase(
            SignalPhase signalPhase
    );

    /**
     * Find emergency simulations.
     */
    List<TrafficSimulationRecord> findByEmergencyTriggeredTrue();

    /**
     * Count emergency simulations.
     */
    long countByEmergencyTriggeredTrue();
}