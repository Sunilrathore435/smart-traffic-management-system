package com.smarttraffic.backend.model;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class TrafficNetwork {

    private final Map<String, Intersection> intersections;

    public TrafficNetwork() {
        this.intersections = new HashMap<>();
    }

    /**
     * Add a new intersection.
     */
    public void addIntersection(Intersection intersection) {

        intersections.put(
                intersection.getIntersectionId(),
                intersection
        );
    }

    /**
     * Find intersection by ID.
     */
    public Intersection getIntersection(String intersectionId) {

        return intersections.get(intersectionId);

    }

    /**
     * Remove intersection.
     */
    public void removeIntersection(String intersectionId) {

        intersections.remove(intersectionId);

    }

    /**
     * Get all intersections.
     */
    public Collection<Intersection> getAllIntersections() {

        return intersections.values();

    }

    /**
     * Number of intersections.
     */
    public int getIntersectionCount() {

        return intersections.size();

    }

    /**
     * Check whether an intersection exists.
     */
    public boolean containsIntersection(String intersectionId) {

        return intersections.containsKey(intersectionId);

    }
}