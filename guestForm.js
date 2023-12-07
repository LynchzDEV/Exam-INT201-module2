//65130500008 Jinnawat Vilairat
// import { createGuestList } from "./data/guestdata.js";
const createGuestList = require("./data/guestdata.js");

const guestList = createGuestList();
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList;

  // 1. register event for searching and adding
  function registerEventHandling() {
    const filterInput = document.getElementById("search-input");
    filterInput.addEventListener("keyup", (event) => {
      event.preventDefault();
      searchGuest(event);
    });

    const addBtn = document.getElementById("add-guest-btn");
    addBtn.addEventListener("click", (event) => {
      event.preventDefault();
      addGuest();
    });
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    const displayDiv = document.getElementById("display-area");
    const itemList = document.createElement("p");
    itemList.textContent = `${guestItem.firstname} ${guestItem.lastname}`;

    const removeSpan = document.createElement("span");
    removeSpan.classList = "remove-icon";
    removeSpan.id = `${guestItem.firstname}-${guestItem.lastname}`;
    removeSpan.textContent = " [X]";
    removeSpan.style.color = "red";
    removeSpan.style.cursor = "pointer";

    removeSpan.addEventListener("click", removeGuest);

    itemList.append(removeSpan);
    displayDiv.appendChild(itemList);
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    const displayDiv = document.getElementById("display-area");
    displayDiv.textContent = "";
    guestResult.forEach((guest) => {
      displayGuest(guest);
    });
  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    const filterInput = document.getElementById("search-input");
    const filterGuest = guestList.searchGuests(filterInput.value);
    displayGuests(filterGuest);
  }

  // 5. Function to add a new guest
  function addGuest() {
    const firstnameInput = document.getElementById("firstname-input");
    const lastnameInput = document.getElementById("lastname-input");
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    if (firstname === " " || lastname === " ") {
      firstname = undefined;
      lastname = undefined
    }
    guestList.addNewGuest(firstname, lastname);
    const newGuest = { firstname, lastname };
    firstnameInput.value = "";
    lastnameInput.value = "";
    displayGuest(newGuest);
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    const removeGuestArr = [...event.target.id.split("-")];
    const firstname = removeGuestArr[0];
    const lastname = removeGuestArr[1];
    const guestToRemove = { firstname, lastname };
    guestList.removeGuest(guestToRemove);
    displayGuests(guestList.getAllGuests());
  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest,
  };
}
module.exports = guestForm;
// export { guestForm };
const { registerEventHandling, displayGuests } = guestForm();
// registerEventHandling();
// displayGuests(guestList.getAllGuests());
