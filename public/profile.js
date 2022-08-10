const profileForm = document.querySelector('#profile-form')
const firstNameInput = document.querySelector('#first-name')
const lastNameInput = document.querySelector('#last-name')
const phoneInput = document.querySelector('#phone-number')
const emailInput = document.querySelector('#email')

const inputs = [firstNameInput, lastNameInput, phoneInput, emailInput]

inputs.forEach(input => {
    input.addEventListener('change', (e) => {
        input.value = e.target.value
        console.log(input.value)
    })
})

function getProfileInfo() {
    axios.get('/user')
        .then(res => {
            const user = res.data[0]

            const {
                first_name: firstName,
                last_name: lastName,
                phone_number: phoneNumber,
                email
            } = user

            firstNameInput.value = firstName
            lastNameInput.value = lastName
            phoneInput.value = phoneNumber
            emailInput.value = email
        })
}
function updateInfo() {
    let body = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
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
