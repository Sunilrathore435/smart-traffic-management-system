package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.dto.AddVehicleRequest;
import com.smarttraffic.backend.dto.TrafficStatusResponse;
import com.smarttraffic.backend.model.TrafficDecision;
import com.smarttraffic.backend.service.TrafficService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}