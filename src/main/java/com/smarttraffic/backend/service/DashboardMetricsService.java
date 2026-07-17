package com.smarttraffic.backend.service;

import com.smarttraffic.backend.dto.AnalyticsResponse;
import com.smarttraffic.backend.dto.analytics.*;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.Intersection;
import com.smarttraffic.backend.model.TrafficLane;
import org.springframework.stereotype.Service;

import java.lang.management.ManagementFactory;
import java.util.*;

@Service
public class DashboardMetricsService {

    /**
     * Enrich AnalyticsResponse with live dashboard metrics.
     */
    public void populateLiveMetrics(
            AnalyticsResponse analytics,
            Intersection intersection) {

        Map<String, Integer> laneCongestion = new LinkedHashMap<>();

        int totalVehicles = 0;

        List<LaneRankingResponse> ranking = new ArrayList<>();

        // =====================================
        // Lane Statistics
        // =====================================

        for (Direction direction : Direction.values()) {

            TrafficLane lane = intersection.getLane(direction);

            int vehicles = lane.getVehicleCount();

            totalVehicles += vehicles;

            laneCongestion.put(
                    direction.name().toLowerCase(),
                    vehicles
            );

            ranking.add(
                    new LaneRankingResponse(
                            direction.name().toLowerCase(),
                            vehicles,
                            vehicles
                    )
            );
        }

        // Highest queue first
        ranking.sort((a, b) ->
                Integer.compare(
                        b.getVehicles(),
                        a.getVehicles()
                ));

        // =====================================
        // Congestion
        // =====================================

        int congestion = Math.min(
                100,
                totalVehicles * 5
        );

        // =====================================
        // Throughput
        // =====================================

        int throughput =
                (int) analytics.getAverageVehiclesPassed();

        // =====================================
        // Live Flow
        // =====================================

        int flowPercentage = Math.min(
                100,
                throughput * 2
        );

        int fuelSaving =
                Math.max(
                        0,
                        100 - congestion
                );

        // =====================================
        // Prediction
        // =====================================

        String recommendation =
                congestion >= 70
                        ? "Increase Green Time"
                        : congestion >= 40
                          ? "Monitor Queue"
                          : "Traffic Flow Normal";

        int confidence = Math.max(
                60,
                Math.min(
                        99,
                        80 +
                                (fuelSaving / 4) -
                                (congestion / 10)
                )
        );

        PredictionResponse prediction =
                new PredictionResponse(
                        congestion,
                        confidence,
                        recommendation
                );

        // =====================================
        // Performance
        // =====================================

        PerformanceResponse performance =
                new PerformanceResponse(
                        100 - congestion,
                        throughput,
                        fuelSaving
                );

        // =====================================
        // System Health
        // =====================================

        double uptimeHours =
                ManagementFactory
                        .getRuntimeMXBean()
                        .getUptime() / 3600000.0;

        SystemHealthResponse systemHealth =
                new SystemHealthResponse(
                        "ONLINE",
                        uptimeHours
                );

        // =====================================
        // Traffic History
        // =====================================



        // =====================================
        // Populate Response
        // =====================================

        analytics.setCongestion(congestion);
        analytics.setThroughput(throughput);
        analytics.setLiveFlow(throughput);
        analytics.setFlowPercentage(flowPercentage);
        analytics.setFuelSaving(fuelSaving);
        analytics.setLaneCongestion(laneCongestion);
        analytics.setRanking(ranking);
        analytics.setPrediction(prediction);
        analytics.setPerformance(performance);
        analytics.setSystemHealth(systemHealth);
    }
}