const submitBtn = document.querySelector('#submitBtn');
const movementBtn = document.querySelector('#movementBtn');
const fitnessBtn = document.querySelector('#fitnessBtn');
const lifeBtn = document.querySelector('#lifeBtn');


submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name-input').value;
    const email = document.querySelector('#email-input').value;
    const phone = document.querySelector('#phone-input').value;
    const package = document.querySelector('#package-select').value;
    const message = document.querySelector('#message-input').value;
});

/*ABOUT.JS console.log("hello world");

function handleSubmit(evt) {
  evt.preventDefault();

  alert("Form submitted successfully =^)!");
}

let form = document.querySelector("#contact");

form.addEventListener("submit", handleSubmit);

const img = document.querySelector('#rubberDuck');

img.addEventListener('mouseover', () => {
  alert('You are truly remarkable!');
});


PROFILE.JS
const button = document.querySelector('button')


const colorBtn = document.querySelector('#color')
colorBtn.addEventListener('click', () => {
    alert(`VERDE!`);
  });

const placeBtn = document.querySelector('#place')
placeBtn.addEventListener('click', () => {
    alert(`TUSCAN, ITALY!`);
  });

const ritualBtn = document.querySelector('#ritual')
ritualBtn.addEventListener('click', () => {
    alert(`Dancing u*/