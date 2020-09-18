import React, { useRef, useCallback, useState } from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles({
    root: {
        width: "100%",
        padding: "8px",
    },
    checksLine: {
        flexGrow: "1",
        height: "32px",
    },
    tag: {
        flexGrow: "0",
        lineHeight: "32px",
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundImage:
            "-webkit-linear-gradient(left, #D64793 0%,#F6B02D 100%)",
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
    },
    line: {
        display: "flex",
    },
    addLine: {
        height: "44px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
})

function ChecksLine({ name, data }) {
    const classes = useStyles()
    const [checksCount, setChecksCount] = useState(0)
    const [width, setWidth] = useState(0)

    const svgEl = useCallback((node) => {
        if (node !== null) {
            const _width = node.getBoundingClientRect().width
            const _checksCount = Math.floor(_width / 32)
            setWidth(_width)
            setChecksCount(_checksCount)
        }
    }, [])

    return (
        <div className={classes.line}>
            <span className={classes.tag}>{name}</span>
            <svg height="32" className={classes.checksLine} ref={svgEl}>
                {[...Array(checksCount)].map((x, i) => {
                    const day = moment().subtract(i, "day").format("Y-M-D")

                    return (
                        <rect
                            key={i}
                            width="22"
                            height="22"
                            x={(width - (i + 1) * 32).toString()}
                            y="5"
                            fill={!!data[day] ? "blue" : "grey"}
                            rx="4px"
                            onClick={() => alert(day)}
                        />
                    )
                })}
            </svg>
        </div>
    )
}

export default function ChecksCalendar({ data }) {
    const classes = useStyles()
    return (
        <div className="checksCalendar">
            <Paper className={classes.root} elevation={3}>
                {Object.entries(data).map(([key, value]) => (
                    <ChecksLine name={key} data={value.data} key={key} />
                ))}
                <div className={classes.addLine}>
                    <IconButton aria-label="addLine" style={{ flexGrow: "0" }}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </div>
            </Paper>
        </div>
    )
}
