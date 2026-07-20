package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.dto.AddVehicleRequest;
import com.smarttraffic.backend.dto.TrafficStatusResponse;
import com.smarttraffic.backend.dto.PedestrianRequest;
import com.smarttraffic.backend.model.TrafficDecision;
import com.smarttraffic.backend.model.TrafficSimulationRecord;
import com.smarttraffic.backend.service.TrafficService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traffic")
public class TrafficController {

    private final TrafficService trafficService;

    public TrafficController(TrafficService trafficService) {
        this.trafficService = trafficService;
    }

    /**
     * Add a vehicle into a traffic lane.
     */
    @PostMapping("/vehicle")
    public ResponseEntity<String> addVehicle(
            @RequestBody AddVehicleRequest request) {

        trafficService.addVehicle(request);

        return ResponseEntity.ok("Vehicle Added Successfully");
    }
    /**
     * Request pedestrian crossing.
     */
    @PostMapping("/pedestrian/request")
    public ResponseEntity<String> requestPedestrianCrossing(
            @RequestBody PedestrianRequest request) {

        trafficService.requestPedestrianCrossing(request);

        return ResponseEntity.ok(
                "Pedestrian crossing request accepted.");
    }
    /**
     * Get current traffic status.
     */
    @GetMapping("/status")
    public TrafficStatusResponse getTrafficStatus() {
        return trafficService.getTrafficStatus();
    }

    /**
     * Run one traffic simulation cycle.
     */
    @PostMapping("/simulate")
    public TrafficDecision simulateTraffic() {

        return trafficService.simulateTraffic();

    }

    @GetMapping("/history")
    public List<TrafficSimulationRecord> getHistory() {

        return trafficService.getSimulationHistory();

    }

    @GetMapping("/history/latest")
    public TrafficSimulationRecord getLatestSimulation() {

        return trafficService.getLatestSimulation();

    }
}