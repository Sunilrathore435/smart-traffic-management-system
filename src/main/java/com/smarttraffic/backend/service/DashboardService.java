package com.smarttraffic.backend.service;

import com.smarttraffic.backend.analytics.AnalyticsService;
import com.smarttraffic.backend.config.RuntimeSimulationState;
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

    // Runtime statistics
    private final RuntimeSimulationState runtimeState;

    // MongoDB settings
    private final SettingsService settingsService;

    public DashboardService(

            TrafficService trafficService,

            AnalyticsService analyticsService,

            DashboardMetricsService dashboardMetricsService,

            DashboardStateService dashboardStateService,

            SimulationHistoryService historyService,

            RuntimeSimulationState runtimeState,

            SettingsService settingsService) {

        this.trafficService = trafficService;
        this.analyticsService = analyticsService;
        this.dashboardMetricsService = dashboardMetricsService;
        this.dashboardStateService = dashboardStateService;
        this.historyService = historyService;
        this.runtimeState = runtimeState;
        this.settingsService = settingsService;
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

        boolean autoSimulation =
                settingsService
                        .getSettings()
                        .isAutoSimulation();

        SimulationStatusResponse simulation =
                new SimulationStatusResponse(

                        autoSimulation,

                        runtimeState.getInterval(),

                        runtimeState.getTotalSimulationCycles(),

                        trafficService.getIntersection()
                                .getTotalVehiclesProcessed(),

                        historyService.getSimulationCount(),

                        trafficService.getIntersection()
                                .getIntersectionId(),

                        trafficService.getIntersection()
                                .getIntersectionName(),

                        runtimeState.getCurrentSignalPhase() == null
                                ? "NONE"
                                : runtimeState.getCurrentSignalPhase().name(),

                        runtimeState.getCurrentStage() == null
                                ? "NONE"
                                : runtimeState.getCurrentStage().name(),

                        runtimeState.getPedestrianSignal() == null
                                ? "NONE"
                                : runtimeState.getPedestrianSignal().name(),

                        runtimeState.getRemainingTime(),

                        trafficService.getIntersection()
                                .isPedestrianWaiting(),

                        autoSimulation
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