package com.smarttraffic.backend.service;

import com.smarttraffic.backend.config.RuntimeSimulationState;
import com.smarttraffic.backend.dto.AddVehicleRequest;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.VehicleType;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Service
public class VehicleGeneratorService {

    private final RuntimeSimulationState runtimeState;

    private final TrafficService trafficService;

    private final Random random = new Random();

    public VehicleGeneratorService(
            RuntimeSimulationState runtimeState,
            TrafficService trafficService) {

        this.runtimeState = runtimeState;
        this.trafficService = trafficService;
    }

    /**
     * Generate random traffic based on Vehicle Spawn Rate.
     */
    public void generateTraffic() {

        int vehiclesToGenerate =
                runtimeState.getVehicleSpawnRate();

        for (int i = 0; i < vehiclesToGenerate; i++) {

            AddVehicleRequest request =
                    new AddVehicleRequest();

            request.setDirection(randomDirection());

            request.setVehicleType(randomVehicleType());

            request.setVehicleNumber(generateVehicleNumber());

            trafficService.addVehicle(request);
        }
    }

    private Direction randomDirection() {

        Direction[] directions = Direction.values();

        return directions[random.nextInt(directions.length)];
    }

    private VehicleType randomVehicleType() {

        // 2% chance of emergency vehicle
        if (random.nextInt(100) < 2) {

            return random.nextBoolean()

                    ? VehicleType.AMBULANCE

                    : VehicleType.FIRE_TRUCK;
        }

        VehicleType[] normalVehicles = {

                VehicleType.CAR,
                VehicleType.BIKE,
                VehicleType.BUS,
                VehicleType.TRUCK

        };

        return normalVehicles[
                random.nextInt(normalVehicles.length)
                ];
    }

    private String generateVehicleNumber() {

        return "AUTO-" +
                UUID.randomUUID()
                        .toString()
                        .substring(0, 8)
                        .toUpperCase();
    }

}