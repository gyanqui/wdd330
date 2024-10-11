import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
displayPopup();


let popup = document.getElementById("popup");

function setLastVist() {
    window.localStorage.setItem("lastVisit", JSON.stringify(new Date()));
}


function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup")
}

function displayPopup() {
    if (!lastVisit) {
        openPopup();
    }
    setLastVist();
}

