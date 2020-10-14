import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import "./App.css"
import merge from "lodash.merge"
import moment from "moment"

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            data: null,
        }
    }

    updateData = () => {
        fetch("https://analytical.caprover.baida.dev/user", {
            method: "GET",
            headers: {
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjY2MzQ0ZmFhNjZjZDY4MjEzOGYyYTYifQ.vT3J-uy79jdsEd_Mv3OidtQ6jwBRGAr3AGN5tmFqlr0",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res })
            })
            .catch(console.error)
    }

    componentDidMount() {
        this.updateData()
    }

    sendDifferentialUpdate = (update) => {
        const newData = merge(this.state.data, update)

        return fetch("https://analytical.caprover.baida.dev/user", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjY2MzQ0ZmFhNjZjZDY4MjEzOGYyYTYifQ.vT3J-uy79jdsEd_Mv3OidtQ6jwBRGAr3AGN5tmFqlr0",
            },
            body: JSON.stringify(newData),
        })
            .then(() => {
                this.updateData()
            })
            .catch((err) => {
                console.error(err)
            })
    }

    addChecksCategory = (name) => {
        return this.sendDifferentialUpdate({
            [name]: { data: {}, checks: true, type: "bool", tolerance: 1 },
        })
    }

    toggleCheck = (category, day, value) => {
        return this.sendDifferentialUpdate({
            [category]: { data: { [day]: value } },
        })
    }

    saveMeditationTime = (seconds) => {
        const day = moment().format("Y-M-D")
        return this.sendDifferentialUpdate({
            Meditation: { data: { [day]: seconds } },
        })
    }
    saveWeight = (weight) => {
        const day = moment().format("Y-M-D")
        return this.sendDifferentialUpdate({
            Weight: { data: { [day]: weight } },
        })
    }
    saveStudyingTime = (time) => {
        const day = moment().format("Y-M-D")
        return this.sendDifferentialUpdate({
            "Studying (h)": { data: { [day]: time } },
        })
    }
    saveWorkingTime = (time) => {
        const day = moment().format("Y-M-D")
        return this.sendDifferentialUpdate({
            "Working (h)": { data: { [day]: time } },
        })
    }
    saveTypingSpeed = (speed) => {
        const day = moment().format("Y-M-D")
        return this.sendDifferentialUpdate({
            "Typing speed": { data: { [day]: speed } },
        })
    }

    render() {
        const { data } = this.state

        if (data === null)
            return (
                <div className="App">
                    <Sidebar />
                    <Home data={{}} />
                </div>
            )

        return (
            <div className="App">
                <Sidebar />
                <Home
                    data={data}
                    addChecksCategory={this.addChecksCategory}
                    toggleCheck={this.toggleCheck}
                    saveMeditationTime={this.saveMeditationTime}
                    saveWeight={this.saveWeight}
                    saveStudyingTime={this.saveStudyingTime}
                    saveWorkingTime={this.saveWorkingTime}
                    saveTypingSpeed={this.saveTypingSpeed}
                />
            </div>
        )
    }
}

export default App
