const profileForm = document.querySelector('#profile-form')
const firstNameInput = document.querySelector('#first-name')
const phoneInput = document.querySelector('#phone-number')
const emailInput = document.querySelector('#email')
const dateInput = document.querySelector('#date')
const package = document.querySelector('#package')

const inputs = [firstNameInput, phoneInput, emailInput]

inputs.forEach(input => {
    input.addEventListener('change', (e) => {
        input.value = e.target.value
        console.log(input.value)
    })
})

function getProfileInfo() {
    let body = {
        date: dateInput.value,
        service: package.value,
    }
    axios.post('/appt', body)
        .then(res => {
            const user = res.data
            console.log(res.data)
            const {
                first_name: firstName,
                phone_number: phoneNumber,
                email
            } = user

            firstNameInput.value = firstName
            phoneInput.value = phoneNumber
            emailInput.value = email
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
    getProfileInfo()
})
