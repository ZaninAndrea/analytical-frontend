import React from "react"
import { Paper, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ChecksCalendar from "../components/ChecksCalendar"

const useStyles = makeStyles({
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        color: "white",
    },
})

export default function Home({ data }) {
    const classes = useStyles()
    return (
        <div className="main">
            <ChecksCalendar data={data.checks} />
        </div>
    )
}
