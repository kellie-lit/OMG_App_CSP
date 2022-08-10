require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const path = require("path");


const { PORT } = process.env || 4030
const {seed, requestAppointment, deleteAppointment} = require('./controller.js')


app.use(express.static(path.join(__dirname, "/../public")))
app.use(express.json())
app.use(cors())

//TABLE
app.post('/seed', seed)


// APPOINTMENTS
app.post('/appt', requestAppointment)
app.delete('/appt/:id', deleteAppointment)

app.listen(PORT, () => console.log(`up on ${PORT}`))