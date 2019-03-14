const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const message = document.querySelector("#message");
const error = document.querySelector("#error");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  message.textContent = "Loading...";
  fetch(`/weather?address=${search.value}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        message.textContent = "";
        error.textContent = data.error;
      } else {
        message.textContent = `Място: ${data.location} ${
          data.summary
        } Температура: ${data.temperature} Шансове за валежи: ${
          data.precipProbability
        } Максимална температура: ${data.tempHigh}`;
      }
    });
  });
});
