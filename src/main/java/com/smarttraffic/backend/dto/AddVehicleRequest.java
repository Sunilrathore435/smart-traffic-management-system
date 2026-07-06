package com.smarttraffic.backend.dto;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.VehicleType;

public class AddVehicleRequest {

    private String vehicleNumber;
    private VehicleType vehicleType;
    private Direction direction;

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public Direction getDirection() {
        return direction;
    }

    public void setDirection(Direction direction) {
        this.direction = direction;
    }
}