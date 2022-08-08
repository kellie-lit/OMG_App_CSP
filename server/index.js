require('dotenv').config()
const express = require('express')
const app = express()
const path = require("path");


const { SERVER_PORT } = process.env || 4005
const { seed, getPackages, createConsultation, deleteConsultation } = require('./controller.js')

app.use(express.static(path.join(__dirname, "/../public")))
app.use(express.json())

//DEV
app.post('/seed', seed)

//PACKAGES
app.get('/packages', getPackages)

// 
app.post('/consultations', createConsultation)
app.get('/packages', getPackages)
app.delete('/consultation/:id', deleteConsultation)


app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))