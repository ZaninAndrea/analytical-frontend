import React, { useState } from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import "./App.css"

function App() {
    const [data, setData] = useState({
        checks: {
            "Github Commit": { data: { "2020-9-18": 5 } },
            Allenamento: { data: { "2020-9-16": "stretch" } },
        },
    })

    return (
        <div className="App">
            <Sidebar />
            <Home data={data} />
        </div>
    )
}

export default App
