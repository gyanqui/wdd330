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
