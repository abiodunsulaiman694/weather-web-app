console.log("Loading up...");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;
  messageOne.innerHTML = "Loading...";
  fetch(`http://localhost:3001/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.innerHTML = data.error;
        messageTwo.innerHTML = "";
      } else {
        messageOne.innerHTML = `${data.location}`;
        messageTwo.innerHTML = `${data.forecast}`;
        search.value = "";
      }
    });
  });
});
