require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const path = require("path");


const { PORT } = process.env || 4030
const { seed, requestAppointment, deleteAppointment } = require('./controller.js')


app.use(express.static(path.join(__dirname, "/../public")))
app.use(express.json())
app.use(cors())
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, "/../public/home.html")))
app.get('/profile', (req, res) => res.sendFile(path.join(__dirname, "/../public/profile.html")))

//TABLE
app.post('/seed', seed)


// APPOINTMENTS
app.post('/appt', requestAppointment)
app.delete('/appt/:id', deleteAppointment)
app.use((req, res) => res.redirect('/home'))
app.listen(PORT, () => console.log(`up on ${PORT}`))