const path = require("path");
const express = require("express");
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Shreyash Adlinge"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Shreyash Adlinge"
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Shreyash Adlinge",
        errorMessage: "Help article not found"
    })
})


app.use("/help", (req, res) => {
    res.render("help", {
        helpText: "This was helpful",
        title: "Help",
        name: "Shreyash Adlinge"
    })
})


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided"
        })
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Shreyash Adlinge",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Serving on " + port)
})