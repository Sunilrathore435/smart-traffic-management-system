import { useEffect, useMemo, useState } from "react";
import BackendSimulationEngine from "../../../features/traffic/BackendSimulationEngine";
import {

    FaBrain,

    FaClock,

    FaTrafficLight,

    FaCarSide,

    FaRobot,

    FaAmbulance

} from "react-icons/fa";

import styles from "./Navbar.module.css";

function Navbar() {

    const [dashboard, setDashboard] = useState(
        BackendSimulationEngine.getState()
    );

    useEffect(() => {

        const listener = (state) => {

            setDashboard(state);

        };

        BackendSimulationEngine.subscribe(listener);

        BackendSimulationEngine.start();

        return () => {

            BackendSimulationEngine.unsubscribe(listener);

        };

    }, []);

    const analytics = dashboard.analytics || {};
    const traffic = dashboard.traffic || {};
    const signal = dashboard.signal || {};
    const emergency = dashboard.emergency || {};

    const [time, setTime] = useState(new Date());

    const congestion = analytics.congestion ?? 0;

    const backendOnline =
        analytics.systemHealth?.status === "ONLINE";

    const tickerMessages = useMemo(() => [

        emergency.active

            ? `Emergency Priority • ${emergency.lane}`

            : "Monitoring all intersections",

        congestion > 70

            ? "Heavy congestion detected"

            : "Traffic flow optimized",

        analytics.prediction?.recommendation

        ??

        "Predicting traffic density",

        `${analytics.performance?.efficiency ?? 0}% AI Optimization`,

        `Processed ${analytics.totalVehiclesProcessed ?? 0} vehicles`

    ], [

        emergency,

        congestion,

        analytics

    ]);

    const [tickerIndex, setTickerIndex] = useState(0);

    useEffect(() => {

        const clock = setInterval(() => {

            setTime(new Date());

        }, 1000);

        return () => clearInterval(clock);

    }, []);

    useEffect(() => {

        const ticker = setInterval(() => {

            setTickerIndex(previous =>

                (previous + 1)

                %

                tickerMessages.length

            );

        }, 3500);

        return () => clearInterval(ticker);

    }, [tickerMessages]);

    const currentTime =

        time.toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit"

        });

    const currentPhase =
        traffic.currentSignalPhase === "NORTH_SOUTH"
            ? "N_S"
            : traffic.currentSignalPhase === "EAST_WEST"
                ? "E_W"
                : "--";

    const waitingVehicles =

        signal.totalWaitingVehicles

        ??

        analytics.totalVehiclesProcessed

        ??

        0;

    const efficiency =

        analytics.performance?.efficiency

        ??

        0;

    return (

        <header

            className={`${styles.navbar}

            ${

                emergency.active

                    ?

                    styles.emergencyMode

                    :

                    ""

            }`}

        >

            {/* ========================================= */}

            {/* LEFT */}

            {/* ========================================= */}

            <div className={styles.left}>

                <div className={styles.aiRadar}>

                    <div className={styles.outerRing}></div>

                    <div className={styles.middleRing}></div>

                    <div className={styles.innerRing}></div>

                    <div className={styles.scanLine}></div>

                    <span className={styles.dot1}></span>

                    <span className={styles.dot2}></span>

                    <span className={styles.dot3}></span>

                    <div

                        className={`${styles.aiCore}

                        ${

                            emergency.active

                                ?

                                styles.coreEmergency

                                :

                                styles.coreNormal

                        }`}

                    >

                        <FaBrain />

                    </div>

                </div>

                <div className={styles.titleSection}>

                    <h1>

                        Smart City Traffic

                        <br/>

                        Command Center

                    </h1>

                    <div className={styles.aiStatus}>

                        <span

                            className={

                                backendOnline

                                    ?

                                    styles.onlineDot

                                    :

                                    styles.offlineDot

                            }

                        />

                        <span>

                            AI Neural Engine

                        </span>

                    </div>

                    <div className={styles.ticker}>

                        {tickerMessages[tickerIndex]}

                    </div>

                </div>

            </div>

            {/* ========================================= */}

            {/* CENTER */}

            {/* ========================================= */}

            <div className={styles.metrics}>

                <div className={styles.metric}>

                    <FaTrafficLight />

                    <div>

                        <strong>

                            {currentPhase}

                        </strong>

                        <span>

                            Current Phase

                        </span>

                    </div>

                </div>

                <div className={styles.metric}>

                    <FaCarSide />

                    <div>

                        <strong>

                            {waitingVehicles}

                        </strong>

                        <span>

                            Waiting Vehicles

                        </span>

                    </div>

                </div>

                <div className={styles.metric}>

                    <FaRobot />

                    <div>

                        <strong>

                            {efficiency}%

                        </strong>

                        <span>

                            AI Efficiency

                        </span>

                    </div>

                </div>
                <div className={styles.metric}>

                    <FaAmbulance />

                    <div>

                        <strong>

                            {

                                emergency.active

                                    ?

                                    emergency.lane

                                    :

                                    "NONE"

                            }

                        </strong>

                        <span>

                            Emergency

                        </span>

                    </div>

                </div>

            </div>

            {/* ========================================= */}

            {/* RIGHT */}

            {/* ========================================= */}

            <div className={styles.right}>

                <div className={styles.clockCard}>

                    <div className={styles.clockHeader}>

                        <FaClock />

                        <span>

                            LOCAL TIME

                        </span>

                    </div>

                    <strong>

                        {currentTime}

                    </strong>

                    <div

                        className={

                            backendOnline

                                ?

                                styles.backendOnline

                                :

                                styles.backendOffline

                        }

                    >

                        <span

                            className={

                                backendOnline

                                    ?

                                    styles.statusDotOnline

                                    :

                                    styles.statusDotOffline

                            }

                        ></span>

                        {

                            analytics.systemHealth?.status

                            ||

                            "OFFLINE"

                        }

                    </div>

                </div>

            </div>

            {/* ========================================= */}

            {/* LIVE BACKGROUND PARTICLES */}

            {/* ========================================= */}

            <span className={styles.particle1}></span>

            <span className={styles.particle2}></span>

            <span className={styles.particle3}></span>

            <span className={styles.particle4}></span>

            <span className={styles.particle5}></span>

            <span className={styles.particle6}></span>

        </header>

    );

}

export default Navbar;