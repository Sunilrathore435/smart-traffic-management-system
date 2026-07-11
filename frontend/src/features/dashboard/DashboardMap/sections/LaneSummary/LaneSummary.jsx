import { useEffect, useState } from "react";

import {
    FaArrowUp,
    FaArrowRight,
    FaArrowDown,
    FaArrowLeft
} from "react-icons/fa";

import ProgressBar from "../../../../../components/ui/ProgressBar";

import { SimulationEngine } from "../../../../traffic";

import styles from "./LaneSummary.module.css";

const icons = {

    north: <FaArrowUp />,

    east: <FaArrowRight />,

    south: <FaArrowDown />,

    west: <FaArrowLeft />

};

function LaneSummary() {

    const [simulation, setSimulation] = useState(

        SimulationEngine.getState()

    );

    useEffect(() => {

        const listener = (state) => {

            setSimulation(state);

        };

        SimulationEngine.subscribe(listener);

        return () => {

            SimulationEngine.unsubscribe(listener);

        };

    }, []);

    const congestion =

        simulation.analytics?.laneCongestion ||

        {

            north: 0,

            east: 0,

            south: 0,

            west: 0

        };

    const totalVehicles =

        simulation.vehicles.length || 1;

    const lanes = [

        "north",

        "east",

        "south",

        "west"

    ].map(lane => {

        const vehicles =

            simulation.vehicles.filter(

                vehicle => vehicle.lane === lane

            ).length;

        const density = Math.round(

            (congestion[lane] / totalVehicles) * 100

        );

        return {

            direction:

                `${lane.charAt(0).toUpperCase()}${lane.slice(1)} Lane`,

            vehicles,

            density,

            icon: icons[lane]

        };

    });

    return (

        <section className={styles.container}>

            <div className={styles.header}>

                <h3 className={styles.heading}>
                    Traffic Density
                </h3>

                <div className={styles.liveBadge}>

                    <span className={styles.liveDot}></span>

                    <div>

            <span className={styles.liveTitle}>
                LIVE TRAFFIC
            </span>

                        <small className={styles.liveTime}>
                            Updated 1 sec ago
                        </small>

                    </div>

                </div>

            </div>

            {
                lanes.map(lane => {

                    let status = "LOW";
                    let statusClass = styles.low;

                    if (lane.density >= 70) {

                        status = "HIGH";
                        statusClass = styles.high;

                    }

                    else if (lane.density >= 40) {

                        status = "MEDIUM";
                        statusClass = styles.medium;

                    }

                    return (

                        <div

                            key={lane.direction}

                            className={styles.row}

                        >

                            <div className={styles.top}>

                                <div className={styles.left}>

                                    <div className={styles.icon}>

                                        {lane.icon}

                                    </div>

                                    <div>

                                        <h4>

                                            {lane.direction}

                                        </h4>

                                        <span>

                                {lane.vehicles} Vehicles

                            </span>

                                    </div>

                                </div>

                                <div className={styles.right}>

                        <span

                            className={`${styles.badge} ${statusClass}`}

                        >

                            {status}

                        </span>

                                    <strong className={styles.percent}>

                                        {lane.density}%

                                    </strong>

                                </div>

                            </div>

                            <ProgressBar

                                value={lane.density}

                                animated

                                glow

                                showFooter={false}

                            />

                        </div>

                    );

                })
            }

        </section>

    );

}

export default LaneSummary;