package com.smarttraffic.backend.dto;

import com.smarttraffic.backend.enums.Direction;

public class PedestrianRequest {

    private Direction direction;

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }
}