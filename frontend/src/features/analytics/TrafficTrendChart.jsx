import { useEffect, useState } from "react";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

import AnalyticsEngine from "../traffic/AnalyticsEngine";

import styles from "./TrafficTrendChart.module.css";

function TrafficTrendChart() {

    const [data, setData] = useState(
        AnalyticsEngine.getTrafficHistory()
    );

    useEffect(() => {

        const update = () => {

            setData(
                AnalyticsEngine.getTrafficHistory()
            );

        };

        AnalyticsEngine.subscribe(update);

        update();

        return () => {

            AnalyticsEngine.unsubscribe(update);

        };

    }, []);

    return (

        <section className={styles.card}>

            <header className={styles.header}>

                <h2>

                    📈 Traffic Trend

                </h2>

                <span>

                    Live Vehicle Flow

                </span>

            </header>

            <ResponsiveContainer
                width="100%"
                height={340}
            >

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="traffic"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#00E5FF"
                                stopOpacity={0.9}
                            />

                            <stop
                                offset="95%"
                                stopColor="#00E5FF"
                                stopOpacity={0}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid

                        strokeDasharray="4 4"

                        stroke="rgba(255,255,255,.05)"

                    />

                    <XAxis

                        dataKey="time"

                        tick={{

                            fill:"#94A3B8",

                            fontSize:12

                        }}

                        tickLine={false}

                        axisLine={false}

                    />

                    <YAxis

                        tick={{

                            fill:"#94A3B8"

                        }}

                        tickLine={false}

                        axisLine={false}

                    />

                    <Tooltip

                        contentStyle={{

                            background:"#181C2B",

                            border:"1px solid #00E5FF",

                            borderRadius:16,

                            color:"#fff"

                        }}

                    />

                    <Area

                        type="monotone"

                        dataKey="vehicles"

                        stroke="#00E5FF"

                        strokeWidth={3}

                        fill="url(#traffic)"

                        animationDuration={600}

                    />

                </AreaChart>

            </ResponsiveContainer>

        </section>

    );

}

export default TrafficTrendChart;