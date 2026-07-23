package com.smarttraffic.backend.analytics;

import com.smarttraffic.backend.dto.AnalyticsResponse;
import com.smarttraffic.backend.model.TrafficSimulationRecord;
import com.smarttraffic.backend.repository.TrafficSimulationRepository;
import org.springframework.stereotype.Service;
import com.smarttraffic.backend.dto.analytics.TrafficHistoryPoint;
import java.time.format.DateTimeFormatter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    private final TrafficSimulationRepository repository;

    public AnalyticsService(TrafficSimulationRepository repository) {
        this.repository = repository;
    }

    /**
     * Dashboard Analytics
     */
    public AnalyticsResponse getDashboardAnalytics() {

        final List<TrafficSimulationRecord> records =
                repository.findAll();

        if (records.isEmpty()) {

            AnalyticsResponse response = new AnalyticsResponse();

            response.setBusiestLane("NONE");
            response.setBusiestPhase("NONE");

            return response;
        }

        long totalSimulations = records.size();

        long totalVehiclesProcessed =
                calculateTotalVehicles(records);

        double averageGreenTime =
                calculateAverageGreenTime(records);

        double averageVehiclesPassed =
                calculateAverageVehiclesPassed(
                        records,
                        totalVehiclesProcessed
                );

        double averageTrafficScore =
                calculateAverageTrafficScore(records);

        long emergencyVehiclesHandled =
                calculateEmergencyVehicles(records);


        String busiestLane =
                findMostUsedLane(records);

        String busiestPhase =
                findMostUsedPhase(records);

        AnalyticsResponse response = new AnalyticsResponse();

        response.setTotalSimulations(totalSimulations);
        response.setTotalVehiclesProcessed(totalVehiclesProcessed);
        response.setAverageGreenTime(averageGreenTime);
        response.setAverageVehiclesPassed(averageVehiclesPassed);
        response.setAverageTrafficScore(averageTrafficScore);
        response.setBusiestLane(busiestLane);
        response.setBusiestPhase(busiestPhase);
        response.setEmergencyVehiclesHandled(emergencyVehiclesHandled);
// Add chart history
        response.setTrafficHistory(buildTrafficHistory(records));
        return response;
    }
    private List<TrafficHistoryPoint> buildTrafficHistory(
            List<TrafficSimulationRecord> records) {

        return records.stream()

                // Keep only the latest 12 records
                .skip(Math.max(0, records.size() - 12))

                .map(record -> new TrafficHistoryPoint(

                        record.getSimulationTime()
                                .toLocalTime()
                                .withNano(0)
                                .format(TIME_FORMATTER),

                        record.getVehiclesPassed()

                ))

                .toList();
    }
    private static final DateTimeFormatter TIME_FORMATTER =
            DateTimeFormatter.ofPattern("hh:mm:ss a");
    /**
     * Calculate total processed vehicles.
     */
    private long calculateTotalVehicles(
            List<TrafficSimulationRecord> records) {

        long total = 0;

        for (TrafficSimulationRecord record : records) {

            total += record.getVehiclesPassed();

        }

        return total;
    }

    /**
     * Calculate average green signal time.
     */
    private double calculateAverageGreenTime(
            List<TrafficSimulationRecord> records) {

        double total = 0;

        for (TrafficSimulationRecord record : records) {

            total += record.getGreenTime();

        }

        return total / records.size();
    }

    /**
     * Calculate average vehicles passed.
     */
    private double calculateAverageVehiclesPassed(
            List<TrafficSimulationRecord> records,
            long totalVehicles) {

        return (double) totalVehicles / records.size();
    }

    /**
     * Calculate average traffic score.
     */
    private double calculateAverageTrafficScore(
            List<TrafficSimulationRecord> records) {

        double total = 0;

        for (TrafficSimulationRecord record : records) {

            total += record.getTrafficScore();

        }

        return total / records.size();
    }

    /**
     * Count emergency vehicle simulations.
     */
    private long calculateEmergencyVehicles(
            List<TrafficSimulationRecord> records) {

        long total = 0;

        for (TrafficSimulationRecord record : records) {

            if (record.isEmergencyTriggered()) {

                total++;

            }
        }

        return total;
    }
    /**
     * Find the most frequently selected lane.
     */
    private String findMostUsedLane(
            List<TrafficSimulationRecord> records) {

        Map<String, Integer> laneCount = new HashMap<>();

        for (TrafficSimulationRecord record : records) {

            String lane = record.getDominantLane().name();

            laneCount.put(
                    lane,
                    laneCount.getOrDefault(lane, 0) + 1
            );
        }

        String busiestLane = "NONE";

        int max = 0;

        for (Map.Entry<String, Integer> entry : laneCount.entrySet()) {

            if (entry.getValue() > max) {

                max = entry.getValue();

                busiestLane = entry.getKey();
            }
        }

        return busiestLane;
    }
    private String findMostUsedPhase(
            List<TrafficSimulationRecord> records) {

        Map<String, Integer> phaseCount = new HashMap<>();

        for (TrafficSimulationRecord record : records) {

            if (record.getSignalPhase() == null) {
                continue;
            }

            String phase = record.getSignalPhase().name();

            phaseCount.put(
                    phase,
                    phaseCount.getOrDefault(phase, 0) + 1
            );
        }

        String busiestPhase = "NONE";

        int max = 0;

        for (Map.Entry<String, Integer> entry : phaseCount.entrySet()) {

            if (entry.getValue() > max) {

                max = entry.getValue();
                busiestPhase = entry.getKey();
            }
        }

        return busiestPhase;
    }
}