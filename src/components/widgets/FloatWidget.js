import React, { useRef, useCallback, useState } from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

export default class TimerWidget extends React.Component {
    constructor() {
        super()
    }

    componentWillUnmount() {
        clearTimeout(this.timeout)
    }

    render() {
        return <div className="float"></div>
    }
}
