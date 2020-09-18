import React from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import HomeIcon from "@material-ui/icons/Home"
import ShowChartIcon from "@material-ui/icons/ShowChart"

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white",
    },
})

export default function Sidebar() {
    const classes = useStyles()
    return (
        <Paper className={classes.root + " sidebar"} square elevation={3}>
            <IconButton aria-label="home" className="sidebar-homeButton">
                <HomeIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="stats" className="sidebar-statsButton">
                <ShowChartIcon fontSize="large" />
            </IconButton>
        </Paper>
    )
}
