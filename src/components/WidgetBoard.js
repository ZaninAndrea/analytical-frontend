import React, { useRef, useCallback, useState } from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from "@material-ui/icons/Add"
import TimerWidget from "../components/widgets/TimerWidget"
import FloatWidget from "../components/widgets/FloatWidget"

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        marginTop: "16px",
        margin: "-16px",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    widget: {
        flexGrow: 0,
        flexBasis: "300px",
        flexShrink: 0,
        height: "300px",
        margin: "16px",
    },
})

export default function WidgetBoard({
    data,
    saveMeditationTime,
    saveWeight,
    saveStudyingTime,
    saveWorkingTime,
    saveTypingSpeed,
}) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper className={classes.widget} elevation={3}>
                <TimerWidget title="Meditation" saveTime={saveMeditationTime} />
            </Paper>
            <Paper className={classes.widget} elevation={3}>
                <FloatWidget title="Weight" saveFloat={saveWeight} />
            </Paper>
            <Paper className={classes.widget} elevation={3}>
                <FloatWidget
                    title="Studying (h)"
                    saveFloat={saveStudyingTime}
                />
            </Paper>
            <Paper className={classes.widget} elevation={3}>
                <FloatWidget title="Working (h)" saveFloat={saveWorkingTime} />
            </Paper>
            <Paper className={classes.widget} elevation={3}>
                <FloatWidget title="Typing Speed" saveFloat={saveTypingSpeed} />
            </Paper>
        </div>
    )
}
