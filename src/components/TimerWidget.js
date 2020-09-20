import React, { useRef, useCallback, useState } from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

function prettifyClock(clock) {
    const seconds = clock % 60
    const minutes = Math.floor(clock / 60)

    const _sec = seconds.toString().padStart(2, "0")
    const _min = minutes.toString().padStart(2, "0")

    return `${_min}:${_sec}`
}

export default class TimerWidget extends React.Component {
    constructor() {
        super()

        this.state = {
            clock: 0,
            phase: "STOPPED",
        }

        this.timeout = null
    }

    updateTimer = () => {
        this.setState(({ clock }) => ({
            clock: clock + 1,
        }))

        this.timeout = setTimeout(() => this.updateTimer(), 1000)
    }

    start = () => {
        this.setState({ clock: 0, phase: "RUNNING" })
        setTimeout(() => this.updateTimer(), 1000)
    }
    pause = () => {
        this.setState({ phase: "PAUSED" })
        clearTimeout(this.timeout)
    }
    resume = () => {
        this.setState({ phase: "RUNNING" })
        setTimeout(() => this.updateTimer(), 1000)
    }

    timerClick = () => {
        if (this.state.phase === "STOPPED") {
            this.start()
        } else if (this.state.phase === "PAUSED") {
            this.resume()
        } else if (this.state.phase === "RUNNING") {
            this.pause()
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        return (
            <div className="timer">
                <div className="timer-clock" onClick={this.timerClick}>
                    {prettifyClock(this.state.clock)}
                </div>
            </div>
        )
    }
}
