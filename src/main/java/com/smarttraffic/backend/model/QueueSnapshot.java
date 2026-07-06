package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;

import java.util.EnumMap;
import java.util.Map;

public class QueueSnapshot {

    private final Map<Direction, Integer> laneQueues;

    public QueueSnapshot() {
        this.laneQueues = new EnumMap<>(Direction.class);
    }

    public void setQueue(Direction direction, int vehicles) {
        laneQueues.put(direction, vehicles);
    }

    public int getQueue(Direction direction) {
        return laneQueues.getOrDefault(direction, 0);
    }

    public Map<Direction, Integer> getLaneQueues() {
        return laneQueues;
    }

    @Override
    public String toString() {
        return laneQueues.toString();
    }
}