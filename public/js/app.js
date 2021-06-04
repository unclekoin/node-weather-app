const content = document.getElementById('content');
const icon = content.querySelector('.weather__icon')

const weatherForm = document.getElementById('weather-form');
const weatherInput = document.getElementById('weather-input');
const messageOne = document.querySelector('.weather__message-one');
const messageTwo = document.querySelector('.weather__message-two');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = weatherInput.value;
  weatherInput.value = '';

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${ location }`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          icon.innerHTML = `<img src="${data.icon}" alt="">`
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      })
    })
})


