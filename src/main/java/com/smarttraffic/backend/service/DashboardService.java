package com.smarttraffic.backend.service;

import com.smarttraffic.backend.analytics.AnalyticsService;
import com.smarttraffic.backend.config.SimulationSettings;
import com.smarttraffic.backend.dto.AnalyticsResponse;
import com.smarttraffic.backend.dto.DashboardResponse;
import com.smarttraffic.backend.dto.SimulationStatusResponse;
import com.smarttraffic.backend.dto.TrafficStatusResponse;
import com.smarttraffic.backend.dto.dashboard.AIResponse;
import com.smarttraffic.backend.dto.dashboard.EmergencyResponse;
import com.smarttraffic.backend.dto.dashboard.SignalResponse;
import com.smarttraffic.backend.enums.SchedulerStatus;
import com.smarttraffic.backend.model.TrafficSimulationRecord;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final TrafficService trafficService;

    private final AnalyticsService analyticsService;

    private final DashboardMetricsService dashboardMetricsService;

    private final DashboardStateService dashboardStateService;

    private final SimulationHistoryService historyService;

    private final SimulationSettings settings;

    public DashboardService(

            TrafficService trafficService,

            AnalyticsService analyticsService,

            DashboardMetricsService dashboardMetricsService,

            DashboardStateService dashboardStateService,

            SimulationHistoryService historyService,

            SimulationSettings settings) {

        this.trafficService = trafficService;
        this.analyticsService = analyticsService;
        this.dashboardMetricsService = dashboardMetricsService;
        this.dashboardStateService = dashboardStateService;
        this.historyService = historyService;
        this.settings = settings;
    }

    public DashboardResponse getLiveDashboard() {

        // =====================================
        // Traffic
        // =====================================

        TrafficStatusResponse traffic =
                trafficService.getTrafficStatus();

        // =====================================
        // Analytics
        // =====================================

        AnalyticsResponse analytics =
                analyticsService.getDashboardAnalytics();

        dashboardMetricsService.populateLiveMetrics(

                analytics,

                trafficService.getIntersection()

        );

        // =====================================
        // Simulation
        // =====================================

        SimulationStatusResponse simulation =
                new SimulationStatusResponse(

                        settings.isRunning(),

                        settings.getInterval(),

                        settings.getTotalSimulationCycles(),

                        trafficService.getIntersection()
                                .getTotalVehiclesProcessed(),

                        historyService.getSimulationCount(),

                        trafficService.getIntersection()
                                .getIntersectionId(),

                        trafficService.getIntersection()
                                .getIntersectionName(),

                        trafficService.getIntersection()
                                .getCurrentGreenLane() == null

                                ? "NONE"

                                : trafficService
                                .getIntersection()
                                .getCurrentGreenLane()
                                .name(),

                        settings.isRunning()

                                ? SchedulerStatus.RUNNING

                                : SchedulerStatus.STOPPED

                );

        // =====================================
        // Dashboard State
        // =====================================

        SignalResponse signal =
                dashboardStateService.buildSignalState(
                        trafficService.getIntersection()
                );

        AIResponse ai =
                dashboardStateService.buildAIState(
                        trafficService.getCurrentDecision()
                );

        EmergencyResponse emergency =
                dashboardStateService.buildEmergencyState();

        // =====================================
        // Latest History
        // =====================================

        TrafficSimulationRecord latestHistory =
                historyService.getLatestSimulation();

        // =====================================
        // Dashboard Response
        // =====================================

        return new DashboardResponse(

                traffic,

                analytics,

                simulation,

                signal,

                ai,

                emergency,

                latestHistory,

                System.currentTimeMillis()

        );

    }

}