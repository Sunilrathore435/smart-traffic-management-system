package com.smarttraffic.backend.engine;

import com.smarttraffic.backend.enums.Direction;
import com.smarttraffic.backend.model.*;

import com.smarttraffic.backend.util.TrafficConstants;
import org.springframework.stereotype.Component;

@Component
public class AdaptiveTrafficOptimizer implements TrafficOptimizer {



    @Override
    public TrafficDecision optimize(Intersection intersection) {


        // =====================================================
        // STEP 2 : Automatic Emergency Vehicle Detection
        // =====================================================

        TrafficDecision emergencyDecision =
                checkEmergency(intersection);

        if (emergencyDecision != null) {

            return emergencyDecision;

        }

        // =====================================================
        // STEP 3 : Normal AI Optimization
        // =====================================================

        int totalVehicles =
                calculateTotalVehicles(intersection);

        if (totalVehicles == 0) {

            return new TrafficDecision(

                    Direction.NORTH,

                    TrafficConstants.MIN_GREEN_TIME,

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
                calculateVehiclesAllowed(greenTime);

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

                        TrafficConstants.MAX_GREEN_TIME,

                        position,

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

                TrafficConstants.MIN_GREEN_TIME

                        + (int) (

                        (density / 100.0)

                                * (

                                TrafficConstants.MAX_GREEN_TIME

                                        - TrafficConstants.MIN_GREEN_TIME

                        )

                );

        return Math.min(

                TrafficConstants.MAX_GREEN_TIME,

                greenTime

        );
    }

    /**
     * Vehicles allowed in one cycle.
     */
    private int calculateVehiclesAllowed(
            int greenTime) {

        return Math.max(

                TrafficConstants.MIN_VEHICLES_ALLOWED,

                greenTime
                        / TrafficConstants.PASSING_RATE

        );
    }

}