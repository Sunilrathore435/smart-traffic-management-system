package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.dto.DashboardResponse;
import com.smarttraffic.backend.service.DashboardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService) {

        this.dashboardService = dashboardService;
    }

    /**
     * Live Dashboard Data
     */
    @GetMapping("/live")
    public DashboardResponse getLiveDashboard() {

        return dashboardService.getLiveDashboard();

    }

}