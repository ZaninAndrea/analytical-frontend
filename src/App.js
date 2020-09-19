import React from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import "./App.css"

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            data: null,
        }
    }

    updateData = () => {
        fetch("https://analytical-self.herokuapp.com/user", {
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

    addChecksCategory = (name) => {
        fetch("https://analytical-self.herokuapp.com/user", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjY2MzQ0ZmFhNjZjZDY4MjEzOGYyYTYifQ.vT3J-uy79jdsEd_Mv3OidtQ6jwBRGAr3AGN5tmFqlr0",
            },
            body: JSON.stringify({
                ...this.state.data,
                checks: { ...this.state.data.checks, [name]: { data: {} } },
            }),
        })
            .then(() => {
                this.updateData()
            })
            .catch((err) => {
                console.error(err)
            })
    }
    toggleCheck = (category, day, value) => {
        fetch("https://analytical-self.herokuapp.com/user", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjY2MzQ0ZmFhNjZjZDY4MjEzOGYyYTYifQ.vT3J-uy79jdsEd_Mv3OidtQ6jwBRGAr3AGN5tmFqlr0",
            },
            body: JSON.stringify({
                ...this.state.data,
                checks: {
                    ...this.state.data.checks,
                    [category]: {
                        ...this.state.data.checks[category],
                        data: {
                            ...this.state.data.checks[category].data,
                            [day]: value,
                        },
                    },
                },
            }),
        })
            .then(() => {
                this.updateData()
            })
            .catch((err) => {
                console.error(err)
            })
    }

    render() {
        const { data } = this.state

        if (data === null)
            return (
                <div className="App">
                    <Sidebar />
                    <Home data={{ checks: {} }} />
                </div>
            )

        return (
            <div className="App">
                <Sidebar />
                <Home
                    data={data}
                    addChecksCategory={this.addChecksCategory}
                    toggleCheck={this.toggleCheck}
                />
            </div>
        )
    }
}

export default App
