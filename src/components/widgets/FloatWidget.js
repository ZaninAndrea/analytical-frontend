import React, { useRef, useCallback, useState } from "react"
import { Paper, IconButton, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CheckIcon from "@material-ui/icons/Check"

export default class FloatWidget extends React.Component {
    constructor() {
        super()

        this.state = {
            value: 0,
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        return (
            <div className="floatwidget">
                <TextField
                    type="number"
                    className="float-input"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                />
                <div className="timer-title">{this.props.title}</div>
                <div className="timer-buttons">
                    <IconButton
                        aria-label="home"
                        style={{ color: "black" }}
                        onClick={() => {
                            this.props.saveFloat(this.state.value)
                            this.setState({ value: 0 })
                        }}
                    >
                        <CheckIcon />
                    </IconButton>
                </div>
            </div>
        )
    }
}
