package com.smarttraffic.backend.model;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalStatus;
import com.smarttraffic.backend.enums.TrafficMode;

import java.time.LocalDateTime;

public class TrafficSignal {

    private Direction activeDirection;

    private SignalStatus signalStatus;

    private TrafficMode trafficMode;

    private int greenTimeInSeconds;

    private LocalDateTime lastChanged;

    public TrafficSignal() {

        this.activeDirection = Direction.NORTH;
        this.signalStatus = SignalStatus.GREEN;
        this.trafficMode = TrafficMode.AUTO;
        this.greenTimeInSeconds = 30;
        this.lastChanged = LocalDateTime.now();

    }

    public Direction getActiveDirection() {
        return activeDirection;
    }

    public void setActiveDirection(Direction activeDirection) {
        this.activeDirection = activeDirection;
        this.lastChanged = LocalDateTime.now();
    }

    public SignalStatus getSignalStatus() {
        return signalStatus;
    }

    public void setSignalStatus(SignalStatus signalStatus) {
        this.signalStatus = signalStatus;
    }

    public TrafficMode getTrafficMode() {
        return trafficMode;
    }

    public void setTrafficMode(TrafficMode trafficMode) {
        this.trafficMode = trafficMode;
    }

    public int getGreenTimeInSeconds() {
        return greenTimeInSeconds;
    }

    public void setGreenTimeInSeconds(int greenTimeInSeconds) {
        this.greenTimeInSeconds = greenTimeInSeconds;
    }

    public LocalDateTime getLastChanged() {
        return lastChanged;
    }
}