import React from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import HomeIcon from "@material-ui/icons/Home"
import ShowChartIcon from "@material-ui/icons/ShowChart"
import { Link, BrowserRouter } from "react-router-dom"

export default class Sidebar extends React.Component {
    render() {
        return (
            <Paper
                className="sidebar"
                style={{
                    background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                    color: "white",
                }}
                square
                elevation={3}
            >
                <IconButton
                    aria-label="home"
                    className="sidebar-homeButton"
                    onClick={() => (window.location.href = "/")}
                >
                    <HomeIcon fontSize="large" />
                </IconButton>
                <IconButton
                    aria-label="stats"
                    className="sidebar-statsButton"
                    onClick={() => (window.location.href = "/stats")}
                >
                    <ShowChartIcon fontSize="large" />
                </IconButton>
            </Paper>
        )
    }
}
