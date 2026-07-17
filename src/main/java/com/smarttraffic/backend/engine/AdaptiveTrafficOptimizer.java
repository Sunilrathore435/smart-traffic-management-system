package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.*;
import com.smarttraffic.backend.config.RuntimeSimulationState;
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

        // =====================================================
        // STEP 0 : Adaptive AI Disabled
        // =====================================================

        if (!runtimeState.isAdaptiveAI()) {

            return new TrafficDecision(

                    Direction.NORTH,

                    runtimeState.getMinGreenTime(),

                    runtimeState.getVehiclesPerGreen(),

                    0,

                    "Adaptive AI Disabled"

            );

        }

        // =====================================================
        // STEP 1 : Automatic Emergency Vehicle Detection
        // =====================================================

        if (runtimeState.isEmergencyPriority()) {

            TrafficDecision emergencyDecision =
                    checkEmergency(intersection);

            if (emergencyDecision != null) {
                return emergencyDecision;
            }
        }

        // =====================================================
        // STEP 2 : Normal AI Optimization
        // =====================================================

        int totalVehicles =
                calculateTotalVehicles(intersection);

        if (totalVehicles == 0) {

            return new TrafficDecision(

                    Direction.NORTH,

                    runtimeState.getMinGreenTime(),

                    0,

                    0,

                    "No vehicles waiting"

            );
        }

        LaneAnalysis bestLane = null;

        for (Direction direction : Direction.values()) {

            LaneAnalysis analysis =
                    analyzeLane(
                            intersection,
                            direction,
                            totalVehicles
                    );

            if (bestLane == null
                    || analysis.getTrafficScore()
                    > bestLane.getTrafficScore()) {

                bestLane = analysis;
            }
        }

        if (bestLane == null) {

            return new TrafficDecision(

                    Direction.NORTH,

                    runtimeState.getMinGreenTime(),

                    0,

                    0,

                    "No valid lane found"

            );
        }

        return new TrafficDecision(

                bestLane.getDirection(),

                bestLane.getGreenTime(),

                bestLane.getVehiclesAllowed(),

                bestLane.getTrafficScore(),

                bestLane.getReason()

        );
    }

    /**
     * Analyze one lane completely.
     */
    private LaneAnalysis analyzeLane(

            Intersection intersection,

            Direction direction,

            int totalVehicles) {

        TrafficLane lane =
                intersection.getLane(direction);

        int queueLength =
                lane.getVehicleCount();

        int priorityScore =
                lane.getTotalPriorityScore();

        double waitingTime =
                lane.getAverageWaitingTime();

        double density =
                totalVehicles == 0

                        ? 0

                        : (queueLength * 100.0)
                          / totalVehicles;

        double trafficScore =

                queueLength
                        * TrafficConstants.QUEUE_WEIGHT

                        + priorityScore
                        * TrafficConstants.PRIORITY_WEIGHT

                        + waitingTime
                        * TrafficConstants.WAITING_WEIGHT

                        + density
                        * TrafficConstants.DENSITY_WEIGHT;

        int greenTime =
                calculateGreenTime(density);

        int vehiclesAllowed =
                calculateVehiclesAllowed(
                        queueLength,
                        greenTime
                );

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

                "Highest adaptive traffic score"

        );
    }

    /**
     * Automatic Emergency Vehicle Detection
     */
    private TrafficDecision checkEmergency(
            Intersection intersection) {

        LaneAnalysis bestEmergency = null;

        for (Direction direction : Direction.values()) {

            TrafficLane lane =
                    intersection.getLane(direction);
            if (!lane.hasEmergencyVehicle()) {

                continue;

            }

            int position =
                    lane.getEmergencyVehiclePosition();

            if (bestEmergency == null
                    || position
                    < bestEmergency.getEmergencyVehiclePosition()) {

                bestEmergency = new LaneAnalysis(

                        direction,

                        lane.getVehicleCount(),

                        lane.getTotalPriorityScore(),

                        lane.getAverageWaitingTime(),

                        100,

                        TrafficConstants.EMERGENCY_SCORE,

                        true,

                        position,

                        runtimeState.getEmergencyGreenTime(),

                        Math.min(
                                lane.getVehicleCount(),
                                runtimeState.getEmergencyGreenTime()
                                        / TrafficConstants.PASSING_RATE
                        ),

                        "Emergency vehicle detected"

                );

            }

        }

        if (bestEmergency == null) {

            return null;

        }

        return new TrafficDecision(

                bestEmergency.getDirection(),

                bestEmergency.getGreenTime(),

                bestEmergency.getVehiclesAllowed(),

                bestEmergency.getTrafficScore(),

                bestEmergency.getReason()

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
     * Calculate vehicles that can pass during this green cycle.
     */
    private int calculateVehiclesAllowed(
            int queueLength,
            int greenTime) {

        // 1 vehicle crosses every PASSING_RATE seconds
        int vehiclesAllowed = greenTime / TrafficConstants.PASSING_RATE;

        // Never allow more vehicles than actually exist
        vehiclesAllowed = Math.min(queueLength, vehiclesAllowed);

        // At least one vehicle should pass if the queue isn't empty
        if (queueLength > 0) {
            vehiclesAllowed = Math.max(1, vehiclesAllowed);
        }

        // Store for dashboard/settings display
        runtimeState.setVehiclesPerGreen(vehiclesAllowed);

        return vehiclesAllowed;
    }

}