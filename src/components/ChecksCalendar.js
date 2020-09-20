import React, { useRef, useCallback, useState } from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import moment from "moment"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles({
    checksCalendar: {
        margin: " 0 16px 0 0",
    },
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

class ChecksLine extends React.Component {
    constructor() {
        super()

        this.state = {
            checksCount: 0,
            width: 0,
        }
        this.resizeListener = null
    }

    resizeSvg = (node) => {
        if (node !== null) {
            const _width = node.getBoundingClientRect().width
            const _checksCount = Math.floor(_width / 32)
            this.setState({
                width: _width,
                checksCount: _checksCount,
            })

            if (this.resizeListener !== null) {
                window.removeEventListener(this.resizeListener)
            }

            this.resizeListener = window.addEventListener("resize", () => {
                const _width = node.getBoundingClientRect().width
                const _checksCount = Math.floor(_width / 32)
                this.setState({
                    width: _width,
                    checksCount: _checksCount,
                })
            })
        }
    }

    componentWillUnmount() {
        if (this.resizeListener !== null) {
            window.removeEventListener(this.resizeListener)
        }
    }

    render() {
        const { classes, data, name, toggleCheck } = this.props
        const { checksCount, width } = this.state

        return (
            <div className={classes.line}>
                <span className={classes.tag}>{name}</span>
                <svg
                    height="32"
                    className={classes.checksLine}
                    ref={this.resizeSvg}
                >
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
                                onClick={() =>
                                    toggleCheck(name, day, !data[day])
                                }
                            />
                        )
                    })}
                </svg>
            </div>
        )
    }
}

export default function ChecksCalendar({
    data,
    addChecksCategory,
    toggleCheck,
}) {
    const classes = useStyles()
    return (
        <div className={classes.checksCalendar}>
            <Paper className={classes.root} elevation={3}>
                {Object.entries(data).map(([key, value]) => (
                    <ChecksLine
                        name={key}
                        data={value.data}
                        key={key}
                        classes={classes}
                        toggleCheck={toggleCheck}
                    />
                ))}
                <div className={classes.addLine}>
                    <IconButton
                        aria-label="addLine"
                        style={{ flexGrow: "0" }}
                        onClick={() =>
                            addChecksCategory(
                                prompt("Name for the new checks category? ")
                            )
                        }
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </div>
            </Paper>
        </div>
    )
}
