const profileForm = document.querySelector('#profile-form')
const firstNameInput = document.querySelector('#first-name')
const phoneInput = document.querySelector('#phone-number')
const emailInput = document.querySelector('#email')
const dateInput = document.querySelector('#date')
const timeInput = document.querySelector('#time')
const package = document.querySelector('#package')

const inputs = [firstNameInput, phoneInput, emailInput, timeInput]

inputs.forEach(input => {
    input.addEventListener('change', (e) => {
        input.value = e.target.value
        console.log(input.value)
    })
})

function getProfileForm() {
    let body = {
        date: dateInput.value,
        service: package.value,
    }
    axios.post('appt', body)
        .then(res => {
            const user = res.data
            console.log(res.data)
            const {
                first_name: firstName,
                phone_number: phoneNumber,
                email: email
            } = user

            firstNameInput.value = ""
            phoneInput.value = ""
            emailInput.value = ""
            timeInput.value = ""
            alert(`O.M.G. WELCOME TO THE FAMILY!!! Our people will be intouch =^)`)
        })
}
function updateInfo() {
    let body = {
        firstName: firstNameInput.value,
        phoneNumber: phoneInput.value,
        email: emailInput.value
    }

    axios.put('/user', body)
        .then(res => console.log(1, res))
        .catch(err => console.log(err))
}

profileForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getProfileForm()
})
