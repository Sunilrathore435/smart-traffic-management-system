package com.smarttraffic.backend.controller;

import com.smarttraffic.backend.analytics.AnalyticsService;
import com.smarttraffic.backend.dto.AnalyticsResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(
            AnalyticsService analyticsService) {

        this.analyticsService = analyticsService;
    }

    /**
     * Dashboard analytics.
     */
    @GetMapping("/dashboard")
    public AnalyticsResponse getDashboardAnalytics() {

        return analyticsService.getDashboardAnalytics();

    }
}