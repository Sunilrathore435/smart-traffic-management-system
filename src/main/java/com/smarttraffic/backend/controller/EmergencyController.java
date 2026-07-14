package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.service.EmergencyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emergency")
@CrossOrigin(origins = "http://localhost:5173")
public class EmergencyController {

    private final EmergencyService emergencyService;

    public EmergencyController(
            EmergencyService emergencyService) {

        this.emergencyService = emergencyService;

    }

    /**
     * Activate emergency priority
     * Example:
     * POST /api/emergency/north
     */
    @PostMapping("/{lane}")
    public ResponseEntity<String> activateEmergency(

            @PathVariable String lane) {

        emergencyService.activateEmergency(lane);

        return ResponseEntity.ok(
                "Emergency activated for " + lane.toUpperCase()
        );

    }

    /**
     * Clear emergency mode
     * Example:
     * POST /api/emergency/clear
     */
    @PostMapping("/clear")
    public ResponseEntity<String> clearEmergency() {

        emergencyService.clearEmergency();

        return ResponseEntity.ok(
                "Emergency cleared successfully"
        );

    }

}