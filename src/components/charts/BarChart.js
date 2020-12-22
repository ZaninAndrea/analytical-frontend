import { ResponsiveBar } from "@nivo/bar"
import React from "react"
import dayjs from "dayjs"

export default ({ data, label }) => (
    <ResponsiveBar
        data={data}
        keys={["y"]}
        margin={{ top: 50, right: 0, bottom: 25, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{
            type: "time",
            format: "time:%Y-%m-%d",
            precision: "day",
        }}
        colors={{ scheme: "nivo" }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: label,
            legendPosition: "middle",
            legendOffset: -40,
            tickValues: [0, 1],
            renderTick: (tick) => (
                <g transform={`translate(${tick.x - 35},${tick.y + 5})`}>
                    {tick.value ? <text>YES</text> : <text>NO</text>}
                </g>
            ),
        }}
        axisBottom={{
            format: (d) => dayjs(d, "YYYY-MM-DD").format("DD/MM"),
            // tickValues: [data[0].id, data[1].id],
        }}
        animate={true}
        label={false}
        motionStiffness={90}
        motionDamping={15}
    />
)
