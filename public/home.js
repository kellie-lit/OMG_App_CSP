const form = document.querySelector('form')
const datePicker = document.querySelector('#date')
const timePicker = document.querySelector('#time')
const servicePicker = document.querySelector('#service')
let apptList = document.querySelector('#appt-list')

let date = new Date()
datePicker.min = date.toLocaleDateString('en-ca')
datePicker.max = new Date(date.getTime() + (90 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US')

function resetFormValues() {
    timePicker.value = '07:30:00'
    datePicker.value =  date.toLocaleDateString('en-ca')
    servicePicker.value = 'dance', 'fitness', 'life'
}

const possibleTimes = [
    {
        display: '7:30 AM', 
        server: '07:30:00'
    }, 
    {
        display: '8:30 AM', 
        server: '08:30:00'
    }, 
    {
        display: '9:30 AM', 
        server: '09:30:00'
    },
    {
        display: '6:30 PM', 
        server: '18:30:00'
    }, 
    {
        display: '7:30 PM', 
        server: '19:30:00'
    }, 
    {
        display: '8:15 PM', 
        server: '20:15:00'
    },
    {
      display: '9:15 PM', 
      server: '21:15:00'
  },
  {
    display: '10:15 PM', 
    server: '22:15:00'
}
]

for (let i = 0; i < possibleTimes.length; i++) {
    let obj = possibleTimes[i]
    const newOption = document.createElement('option')
    newOption.setAttribute('value', obj.server)
    newOption.textContent = obj.display
    timePicker.appendChild(newOption)
}

function createDisplayDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const reqDate = new Date(date)
    const reqDateDisplay = reqDate.toLocaleDateString('en-US', options)
    const reqTime = reqDate.toLocaleTimeString('en-US')
    const timeDisplay = reqTime.slice(0, -6)
    const timeOfDay = reqTime.slice(-2)
    return `${reqDateDisplay} ${timeDisplay} ${timeOfDay}`
}

function getClientAppointments() {
    axios.get('/appt')
        .then(res => {
            res.data.forEach(appt => {
                const dateDisplayText = createDisplayDate(appt.date)

                const apptElem = 
                `<div class="appt-card">
                    <h2>${dateDisplayText}</h2>
                    <h3>${appt['service_type']}</h3>
                    <p>Approved: ${appt.approved ? 'yes' : 'no'} | Completed: ${appt.completed ? 'yes' : 'no'}</p>
                    <p>${appt.notes}</p>
                </div>`

                apptList.innerHTML += apptElem                
            })
        })
        .catch(err => console.log(err))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let dateTime = `${datePicker.value} ${timePicker.value}:00`
    let dateTimeObj = new Date(dateTime)

    axios.post('/appt', {date: dateTimeObj, service: servicePicker.value})
        .then(() => {
            resetFormValues()
            location.reload()
        })
        .catch(err => console.log('front end error', err))
})

resetFormValues()
getClientAppointments()
