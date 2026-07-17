package com.smarttraffic.backend.repository;

import com.smarttraffic.backend.model.SimulationSettings;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SettingsRepository
        extends MongoRepository<SimulationSettings, String> {

}