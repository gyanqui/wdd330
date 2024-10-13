import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

var button = document.getElementById("close");
button.addEventListener("click", closePopup);

function setLastVist() {
  window.localStorage.setItem("lastVisit", JSON.stringify(new Date()));
}

function openPopup() {
  let popup = document.getElementById("popup");
  popup.classList.add("open-popup");
}

function closePopup() {
  let popup = document.getElementById("popup");
  popup.classList.remove("open-popup");
}

function displayPopup() {
  let lastVisit = Date.parse(
    JSON.parse(window.localStorage.getItem("lastVisit")),
  );

  if (!lastVisit) {
    openPopup();
  }
  setLastVist();
}

displayPopup();

document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.querySelector("#email");
    const message = document.querySelector("#message");

    document.querySelector("#subscribeNewsletter").addEventListener("click", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();

        if (validEmail(email)) {
            message.textContent = "Thank you for subscribing!";
            message.classList.remove("hidden");
            emailInput.value = "";
            message.style.color = "#525b0f";
        } else {
            message.textContent = "Please enter a valid email address."
            message.classList.remove("hidden");
            message.style.color = "red";
        }
      });

      function validEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(email);
      }
})