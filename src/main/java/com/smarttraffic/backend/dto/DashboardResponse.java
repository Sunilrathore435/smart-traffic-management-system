package com.smarttraffic.backend.dto;

import com.smarttraffic.backend.dto.dashboard.AIResponse;
import com.smarttraffic.backend.dto.dashboard.EmergencyResponse;
import com.smarttraffic.backend.dto.dashboard.SignalResponse;
import com.smarttraffic.backend.model.TrafficSimulationRecord;

public class DashboardResponse {

    // =====================================
    // Dashboard Sections
    // =====================================

    private TrafficStatusResponse traffic;

    private AnalyticsResponse analytics;

    private SimulationStatusResponse simulation;

    private SignalResponse signal;

    private AIResponse ai;

    private EmergencyResponse emergency;

    private TrafficSimulationRecord latestHistory;

    private long timestamp;

    public DashboardResponse() {
    }

    public DashboardResponse(
            TrafficStatusResponse traffic,
            AnalyticsResponse analytics,
            SimulationStatusResponse simulation,
            SignalResponse signal,
            AIResponse ai,
            EmergencyResponse emergency,
            TrafficSimulationRecord latestHistory,
            long timestamp) {

        this.traffic = traffic;
        this.analytics = analytics;
        this.simulation = simulation;
        this.signal = signal;
        this.ai = ai;
        this.emergency = emergency;
        this.latestHistory = latestHistory;
        this.timestamp = timestamp;
    }

    // =====================================
    // Getters & Setters
    // =====================================

    public TrafficStatusResponse getTraffic() {
        return traffic;
    }

    public void setTraffic(TrafficStatusResponse traffic) {
        this.traffic = traffic;
    }

    public AnalyticsResponse getAnalytics() {
        return analytics;
    }

    public void setAnalytics(AnalyticsResponse analytics) {
        this.analytics = analytics;
    }

    public SimulationStatusResponse getSimulation() {
        return simulation;
    }

    public void setSimulation(SimulationStatusResponse simulation) {
        this.simulation = simulation;
    }

    public SignalResponse getSignal() {
        return signal;
    }

    public void setSignal(SignalResponse signal) {
        this.signal = signal;
    }

    public AIResponse getAi() {
        return ai;
    }

    public void setAi(AIResponse ai) {
        this.ai = ai;
    }

    public EmergencyResponse getEmergency() {
        return emergency;
    }

    public void setEmergency(EmergencyResponse emergency) {
        this.emergency = emergency;
    }

    public TrafficSimulationRecord getLatestHistory() {
        return latestHistory;
    }

    public void setLatestHistory(TrafficSimulationRecord latestHistory) {
        this.latestHistory = latestHistory;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

}