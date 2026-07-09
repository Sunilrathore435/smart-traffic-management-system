import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from "recharts";

const data = [
    { day: "Mon", vehicles: 180 },
    { day: "Tue", vehicles: 245 },
    { day: "Wed", vehicles: 210 },
    { day: "Thu", vehicles: 300 },
    { day: "Fri", vehicles: 340 },
    { day: "Sat", vehicles: 275 },
];

function CustomTooltip({ active, payload, label }) {

    if (!active || !payload?.length) return null;

    return (

        <div
            style={{
                background: "#171B2A",
                border: "1px solid rgba(0,229,255,.18)",
                borderRadius: "16px",
                padding: "16px 18px",
                minWidth: "180px",
                boxShadow: "0 15px 35px rgba(0,0,0,.4)"
            }}
        >

            <div
                style={{
                    color: "#00E5FF",
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 10
                }}
            >
                🚗 {label}
            </div>

            <div
                style={{
                    color: "#94A3B8",
                    fontSize: 13
                }}
            >
                Vehicles
            </div>

            <div
                style={{
                    color: "#00E5FF",
                    fontWeight: 700,
                    fontSize: 40,
                    lineHeight: 1.1,
                    margin: "4px 0"
                }}
            >
                {payload[0].value}
            </div>

            <div
                style={{
                    color: "#22C55E",
                    fontSize: 13,
                    marginTop: 10
                }}
            >
                ● Live Traffic
            </div>

        </div>

    );

}

function VehicleFlowChart() {

    return (

        <ResponsiveContainer
            width="100%"
            height={320}
        >

            <BarChart
                data={data}
                barCategoryGap="8%"
                barGap={2}
                margin={{
                    top: 20,
                    right: 15,
                    left: 10,
                    bottom: 0,
                }}
            >

                <defs>

                    <linearGradient
                        id="vehicleGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >

                        <stop
                            offset="0%"
                            stopColor="#48E6FF"
                        />

                        <stop
                            offset="50%"
                            stopColor="#2CC5F7"
                        />

                        <stop
                            offset="100%"
                            stopColor="#2B86FF"
                        />

                    </linearGradient>

                </defs>

                <CartesianGrid
                    vertical={false}
                    stroke="rgba(255,255,255,.035)"
                    strokeDasharray="3 6"
                />

                <XAxis
                    dataKey="day"
                    tick={{
                        fill: "#A7B4C8",
                        fontSize: 14,
                        fontWeight: 500,
                    }}
                    tickLine={false}
                    axisLine={false}
                />

                <YAxis
                    tick={{
                        fill:"#94A3B8",
                        fontSize:14
                    }}
                    tickLine={false}
                    axisLine={false}
                />

                <Tooltip
                    cursor={{
                        fill:"rgba(255,255,255,.03)"
                    }}
                    content={<CustomTooltip />}
                />

                <Bar
                    dataKey="vehicles"
                    barSize={102}
                    radius={[20, 20, 0, 0]}
                    animationDuration={1200}
                >

                    {data.map((_, index) => (

                        <Cell
                            key={index}
                            fill="url(#vehicleGradient)"
                        />

                    ))}

                </Bar>

            </BarChart>

        </ResponsiveContainer>

    );

}

export default VehicleFlowChart;