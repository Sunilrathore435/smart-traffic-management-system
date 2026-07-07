package com.smarttraffic.backend.repository;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.TrafficSimulationRecord;
import org.springframework.data.domain.Sort;
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
     * Find simulations by selected lane.
     */
    List<TrafficSimulationRecord> findBySelectedLane(
            Direction selectedLane
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