package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.config.RuntimeSimulationState;
import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.enums.SignalPhase;
import com.smarttraffic.backend.model.*;
import com.smarttraffic.backend.util.TrafficConstants;
import org.springframework.stereotype.Component;

@Component
public class AdaptiveTrafficOptimizer implements TrafficOptimizer {

    private final RuntimeSimulationState runtimeState;

    public AdaptiveTrafficOptimizer(RuntimeSimulationState runtimeState) {
        this.runtimeState = runtimeState;
    }


    @Override
    public TrafficDecision optimize(Intersection intersection) {

        // ==========================================
        // Adaptive AI Disabled
        // ==========================================

        if (!runtimeState.isAdaptiveAI()) {

            int vehicles = runtimeState.getVehiclesPerGreen();

            return new TrafficDecision(
                    SignalPhase.NORTH_SOUTH,
                    Direction.NORTH,
                    runtimeState.getMinGreenTime(),
                    vehicles,
                    vehicles,
                    0,
                    0,
                    0,
                    "Adaptive AI is disabled. Using fixed traffic signal timing."
            );
        }

        // ==========================================
        // Emergency Vehicle
        // ==========================================

        if (runtimeState.isEmergencyPriority()) {

            TrafficDecision emergency = checkEmergency(intersection);

            if (emergency != null) {
                return emergency;
            }
        }

        // ==========================================
        // Total Vehicles
        // ==========================================

        int totalVehicles = calculateTotalVehicles(intersection);

        if (totalVehicles == 0) {

            return new TrafficDecision(
                    SignalPhase.NORTH_SOUTH,
                    Direction.NORTH,
                    runtimeState.getMinGreenTime(),
                    0,
                    0,
                    0,
                    0,
                    0,
                    "No vehicles are waiting at the intersection."
            );
        }

        LaneAnalysis north = analyzeLane(intersection, Direction.NORTH, totalVehicles);
        LaneAnalysis south = analyzeLane(intersection, Direction.SOUTH, totalVehicles);
        LaneAnalysis east = analyzeLane(intersection, Direction.EAST, totalVehicles);
        LaneAnalysis west = analyzeLane(intersection, Direction.WEST, totalVehicles);

        double northSouthScore = north.getTrafficScore() + south.getTrafficScore();
        double eastWestScore = east.getTrafficScore() + west.getTrafficScore();

        // ==========================================================
        // NORTH - SOUTH SELECTED
        // ==========================================================

        if (northSouthScore >= eastWestScore) {

            int greenTime = Math.max(
                    north.getGreenTime(),
                    south.getGreenTime());

            int northAllowed =
                    calculateVehiclesAllowed(
                            north.getQueueLength(),
                            greenTime);

            int southAllowed =
                    calculateVehiclesAllowed(
                            south.getQueueLength(),
                            greenTime);

            Direction dominant =
                    north.getTrafficScore() >= south.getTrafficScore()
                            ? Direction.NORTH
                            : Direction.SOUTH;

            int nsQueue =
                    north.getQueueLength() + south.getQueueLength();

            int ewQueue =
                    east.getQueueLength() + west.getQueueLength();

            String reason = String.format(
                    "North-South selected because it has the highest traffic score (%.1f vs %.1f). Queue: %d vehicles (N:%d, S:%d) compared to East-West: %d vehicles. Planned green time: %ds.",
                    northSouthScore,
                    eastWestScore,
                    nsQueue,
                    north.getQueueLength(),
                    south.getQueueLength(),
                    ewQueue,
                    greenTime
            );

            return new TrafficDecision(
                    SignalPhase.NORTH_SOUTH,
                    dominant,
                    greenTime,
                    northAllowed,
                    southAllowed,
                    0,
                    0,
                    northSouthScore,
                    reason
            );
        }

        // ==========================================================
        // EAST - WEST SELECTED
        // ==========================================================

        int greenTime =
                Math.max(
                        east.getGreenTime(),
                        west.getGreenTime());

        int eastAllowed =
                calculateVehiclesAllowed(
                        east.getQueueLength(),
                        greenTime);

        int westAllowed =
                calculateVehiclesAllowed(
                        west.getQueueLength(),
                        greenTime);

        Direction dominant =
                east.getTrafficScore() >= west.getTrafficScore()
                        ? Direction.EAST
                        : Direction.WEST;

        int ewQueue =
                east.getQueueLength() + west.getQueueLength();

        int nsQueue =
                north.getQueueLength() + south.getQueueLength();

        String reason = String.format(
                "East-West selected because it has the highest traffic score (%.1f vs %.1f). Queue: %d vehicles (E:%d, W:%d) compared to North-South: %d vehicles. Planned green time: %ds.",
                eastWestScore,
                northSouthScore,
                ewQueue,
                east.getQueueLength(),
                west.getQueueLength(),
                nsQueue,
                greenTime
        );

        return new TrafficDecision(
                SignalPhase.EAST_WEST,
                dominant,
                greenTime,
                0,
                0,
                eastAllowed,
                westAllowed,
                eastWestScore,
                reason
        );
    }
    /**
     * Analyze one lane completely.
     */
    private LaneAnalysis analyzeLane(
            Intersection intersection,
            Direction direction,
            int totalVehicles) {

        TrafficLane lane = intersection.getLane(direction);

        int queueLength = lane.getVehicleCount();

        int priorityScore = lane.getTotalPriorityScore();

        double waitingTime = lane.getAverageWaitingTime();

        double density = totalVehicles == 0
                ? 0
                : (queueLength * 100.0) / totalVehicles;

        double trafficScore =
                queueLength * TrafficConstants.QUEUE_WEIGHT
                        + priorityScore * TrafficConstants.PRIORITY_WEIGHT
                        + waitingTime * TrafficConstants.WAITING_WEIGHT
                        + density * TrafficConstants.DENSITY_WEIGHT;

        int greenTime = calculateGreenTime(density);

        int vehiclesAllowed =
                calculateVehiclesAllowed(queueLength, greenTime);

        return new LaneAnalysis(
                direction,
                queueLength,
                priorityScore,
                waitingTime,
                density,
                trafficScore,
                lane.hasEmergencyVehicle(),
                lane.getEmergencyVehiclePosition(),
                greenTime,
                vehiclesAllowed,
                "Lane analyzed successfully"
        );
    }

    /**
     * Emergency Vehicle Detection
     */
    private TrafficDecision checkEmergency(
            Intersection intersection) {

        LaneAnalysis bestEmergency = null;

        for (Direction direction : Direction.values()) {

            TrafficLane lane = intersection.getLane(direction);

            if (!lane.hasEmergencyVehicle()) {
                continue;
            }

            int position = lane.getEmergencyVehiclePosition();

            if (bestEmergency == null
                    || position < bestEmergency.getEmergencyVehiclePosition()) {

                int greenTime = runtimeState.getEmergencyGreenTime();

                bestEmergency = new LaneAnalysis(
                        direction,
                        lane.getVehicleCount(),
                        lane.getTotalPriorityScore(),
                        lane.getAverageWaitingTime(),
                        100,
                        TrafficConstants.EMERGENCY_SCORE,
                        true,
                        position,
                        greenTime,
                        calculateVehiclesAllowed(
                                lane.getVehicleCount(),
                                greenTime
                        ),
                        "Emergency vehicle detected"
                );
            }
        }

        // No emergency vehicle found
        if (bestEmergency == null) {

            runtimeState.setEmergencyTriggered(false);

            return null;
        }

        // Update runtime state for frontend/dashboard
        runtimeState.setEmergencyTriggered(true);
        runtimeState.setDominantLane(bestEmergency.getDirection());

        SignalPhase phase =
                getSignalPhase(bestEmergency.getDirection());

        runtimeState.setCurrentSignalPhase(phase);

        int greenTime = runtimeState.getEmergencyGreenTime();

        int northAllowed = 0;
        int southAllowed = 0;
        int eastAllowed = 0;
        int westAllowed = 0;

        if (phase == SignalPhase.NORTH_SOUTH) {

            northAllowed = calculateVehiclesAllowed(
                    intersection.getLane(Direction.NORTH).getVehicleCount(),
                    greenTime);

            southAllowed = calculateVehiclesAllowed(
                    intersection.getLane(Direction.SOUTH).getVehicleCount(),
                    greenTime);

        } else {

            eastAllowed = calculateVehiclesAllowed(
                    intersection.getLane(Direction.EAST).getVehicleCount(),
                    greenTime);

            westAllowed = calculateVehiclesAllowed(
                    intersection.getLane(Direction.WEST).getVehicleCount(),
                    greenTime);
        }

        return new TrafficDecision(

                phase,

                bestEmergency.getDirection(),

                greenTime,

                northAllowed,

                southAllowed,

                eastAllowed,

                westAllowed,

                TrafficConstants.EMERGENCY_SCORE,

                "Emergency vehicle detected"
        );
    }

    /**
     * Total waiting vehicles.
     */
    private int calculateTotalVehicles(
            Intersection intersection) {

        int total = 0;

        for (Direction direction : Direction.values()) {

            total += intersection
                    .getLane(direction)
                    .getVehicleCount();

        }

        return total;
    }

    /**
     * Dynamic Green Time.
     */
    private int calculateGreenTime(
            double density) {

        int greenTime =
                runtimeState.getMinGreenTime()
                        + (int) (
                        (density / 100.0)
                                * (
                                runtimeState.getMaxGreenTime()
                                        - runtimeState.getMinGreenTime()
                        )
                );

        return Math.min(
                runtimeState.getMaxGreenTime(),
                greenTime
        );
    }

    /**
     * Vehicles allowed during green phase.
     */
    private int calculateVehiclesAllowed(
            int queueLength,
            int greenTime) {

        int vehiclesAllowed =
                greenTime / TrafficConstants.PASSING_RATE;

        vehiclesAllowed =
                Math.min(queueLength, vehiclesAllowed);

        if (queueLength > 0) {
            vehiclesAllowed =
                    Math.max(1, vehiclesAllowed);
        }

        runtimeState.setVehiclesPerGreen(vehiclesAllowed);

        return vehiclesAllowed;
    }

    /**
     * Convert lane into signal phase.
     */
    private SignalPhase getSignalPhase(
            Direction direction) {

        return switch (direction) {

            case NORTH, SOUTH ->
                    SignalPhase.NORTH_SOUTH;

            case EAST, WEST ->
                    SignalPhase.EAST_WEST;
        };
    }

}