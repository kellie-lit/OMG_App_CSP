require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const path = require("path");


const { SERVER_PORT } = process.env || 4030
const {seed, requestAppointment, deleteAppointment} = require('./controller.js')


app.use(express.static(path.join(__dirname, "/../public")))
app.use(express.json())


//TABLE
app.post('/seed', seed)


// APPOINTMENTS
app.post('/appt', requestAppointment)
app.delete('/appt/:id', deleteAppointment)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))