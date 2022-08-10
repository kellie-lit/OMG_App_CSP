require('dotenv').config();
const express = require('express');
const app = express();
const path = require("path");


const { SERVER_PORT } = process.env || 5500
const {seed, getUserInfo, updateUserInfo, getUserAppt, requestAppointment} = require('./controller.js')


app.use(express.static(path.join(__dirname, "/../public")))
app.use(express.json())


//TABLE
app.post('/seed', seed)

// USER
app.get('/user', getUserInfo)
app.put('/user', updateUserInfo)

// APPOINTMENTS
app.get('/appt', getUserAppt)
app.post('/appt', requestAppointment)
app.delete('/appt/:id', deleteAppointment)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))