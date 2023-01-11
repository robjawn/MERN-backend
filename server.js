//Dependencies
require("dotenv").config()
//pull PORT and MONGODB_URL from .env, give default value of 4000
const { PORT = 4000, MONGODB_URL } = process.env
const { application } = require("express")
//import express
const express = require("express")
//create application object
const app = express()
//import mongoose
const mongoose = require("mongoose")
//import middleware
const cors = require("cors")
const morgan = require("morgan")

//DB Connection
//Establish connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
//Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error))

//Models
const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})

const People = mongoose.model("People", PeopleSchema)

//Middleware
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan("dev")) // logging
app.use(express.json()) // parse json bodies


//Routes
//test route
app.get("/", (req, res) => {
    res.send("hello world")
})

//people index route
app.get("/people", async (req, res) => {
    try {
        // send all people
        res.json(await People.find({}))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//people create route
app.post("/people", async (req, res) => {
    try {
        //send all people
        res.json(await People.create(req.body))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//people delete route
app.delete("/people/:id", async (req, res) => {
    try {
        //send all people
        res.json(await People.findByIdAndRemove(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})

//people update route
app.put("/people/:id", async (req, res) => {
    try {
        //send all people
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, { new: true })
        )
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
})


//Listener
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))