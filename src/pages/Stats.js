import { ResponsiveBar } from "@nivo/bar"
import LineChart from "../components/charts/LineChart"
import BarChart from "../components/charts/BarChart"
import React from "react"
import dayjs from "dayjs"
import Select from "@material-ui/core/Select"

function parseBin(bin, label) {
    if (bin.type === "float") {
        return [
            {
                id: label,
                color: "red",
                data: Object.entries(bin.data)
                    .map(([key, value]) => ({
                        x: key,
                        y: parseFloat(value),
                    }))
                    .sort((a, b) =>
                        dayjs(a.x, "YYYY-MM-DD") > dayjs(b.x, "YYYY-MM-DD")
                            ? 1
                            : a === b
                            ? 0
                            : -1
                    ),
            },
        ]
    } else if (bin.type === "bool") {
        let data = Object.entries(bin.data)

        if (data.length > 1) {
            const dates = data.map((x) => dayjs(x[0]))
            const minDate = dates.reduce((acc, curr) =>
                acc < curr ? acc : curr
            )
            const maxDate = dates.reduce((acc, curr) =>
                acc > curr ? acc : curr
            )

            console.log(dates)
            let date = minDate
            while (date <= maxDate) {
                const dateString = date.format("YYYY-MM-DD")
                console.log(dateString)
                if (!bin.data.hasOwnProperty(dateString)) {
                    data.push([dateString, false])
                }
                date = date.add(1, "day")
            }
        }
        return data
            .map(([key, value]) => ({
                id: key,
                y: value ? 1 : 0,
            }))
            .sort((a, b) =>
                dayjs(a.id, "YYYY-MM-DD") > dayjs(b.id, "YYYY-MM-DD")
                    ? 1
                    : a === b
                    ? 0
                    : -1
            )
    } else {
        return []
    }
}

export default class Stats extends React.Component {
    state = {
        bin: null,
    }

    render() {
        const rawData = this.props.data

        let dataBin = this.state.bin
        if (!rawData[dataBin]) dataBin = null

        const data = dataBin ? parseBin(rawData[dataBin], dataBin) : []
        const binType = dataBin ? rawData[dataBin].type : ""

        console.log(data)
        return (
            <div className="stats-page">
                <div className="interface">
                    <Select
                        native
                        value={this.state.bin}
                        onChange={(e) => this.setState({ bin: e.target.value })}
                        inputProps={{
                            name: "Data bin",
                            id: "data-bin-input",
                        }}
                    >
                        <option aria-label="None" value={null} />
                        {Object.keys(this.props.data).map((key) => (
                            <option value={key}>{key}</option>
                        ))}
                    </Select>
                </div>
                <div className="graph">
                    {binType === "float" && (
                        <LineChart data={data} label={dataBin} />
                    )}
                    {binType === "bool" && (
                        <BarChart data={data} label={dataBin} />
                    )}
                </div>
            </div>
        )
    }
}
