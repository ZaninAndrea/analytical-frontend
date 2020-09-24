import React, { useRef, useCallback, useState } from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import TimerWidget from "../components/widgets/TimerWidget"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        marginTop: "16px",
        margin: "-16px",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    widget: {
        flexGrow: 0,
        flexBasis: "300px",
        flexShrink: 0,
        height: "300px",
        margin: "16px",
    },
})

export default function WidgetBoard({ data, saveMeditationTime }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper className={classes.widget} elevation={3}>
                <TimerWidget
                    title="Meditazione"
                    saveTime={saveMeditationTime}
                />
            </Paper>
        </div>
    )
}
