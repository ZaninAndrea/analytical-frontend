import React, { useRef, useCallback, useState } from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import PauseIcon from "@material-ui/icons/Pause"

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
        this.timeout = setTimeout(() => this.updateTimer(), 1000)
    }
    pause = () => {
        this.setState({ phase: "PAUSED" })
        if (this.timeout !== null) clearTimeout(this.timeout)
    }
    resume = () => {
        this.setState({ phase: "RUNNING" })
        this.timeout = setTimeout(() => this.updateTimer(), 1000)
    }
    stop = () => {
        this.setState({ phase: "STOPPED", clock: 0 })
        if (this.timeout !== null) clearTimeout(this.timeout)
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
        let buttons = <></>

        if (this.state.phase === "STOPPED") {
            buttons = (
                <>
                    <IconButton
                        aria-label="home"
                        style={{ color: "black" }}
                        onClick={this.start}
                        key="playpause"
                    >
                        <PlayArrowIcon />
                    </IconButton>
                </>
            )
        } else if (this.state.phase === "RUNNING") {
            buttons = (
                <>
                    <IconButton
                        aria-label="home"
                        style={{ color: "black" }}
                        onClick={this.pause}
                        key="playpause"
                    >
                        <PauseIcon />
                    </IconButton>
                </>
            )
        } else if (this.state.phase === "PAUSED") {
            buttons = (
                <>
                    <IconButton
                        aria-label="home"
                        style={{ color: "black" }}
                        onClick={() => {
                            this.props.saveTime(this.state.clock)
                            this.stop()
                        }}
                    >
                        <CheckIcon />
                    </IconButton>
                    <IconButton
                        aria-label="home"
                        style={{ color: "black" }}
                        onClick={this.resume}
                        key="playpause"
                    >
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton
                        aria-label="home"
                        style={{ color: "black" }}
                        onClick={this.stop}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            )
        }

        return (
            <div className="timer">
                <div className="timer-title">{this.props.title}</div>
                <div className="timer-clock" onClick={this.timerClick}>
                    {prettifyClock(this.state.clock)}
                </div>
                <div className="timer-buttons">{buttons}</div>
            </div>
        )
    }
}
