package com.smarttraffic.backend.dto.analytics;

public class PredictionResponse {

    private int congestion;

    private int confidence;

    private String recommendation;

    public PredictionResponse() {
    }

    public PredictionResponse(
            int congestion,
            int confidence,
            String recommendation) {

        this.congestion = congestion;
        this.confidence = confidence;
        this.recommendation = recommendation;
    }

    public int getCongestion() {
        return congestion;
    }

    public int getConfidence() {
        return confidence;
    }

    public String getRecommendation() {
        return recommendation;
    }

}