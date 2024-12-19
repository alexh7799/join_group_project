/**
 * go back to the last page
 */
function goBack() {
  window.history.back();
}

function includeHTML() {
  let navigation = document.getElementById("navigation-container");
  navigation.innerHTML = initNav();
  let header = document.getElementById("header-container");
  header.innerHTML = initHeader();
  let popUp = document.getElementById("overlay-container");
  popUp.innerHTML = initProfilePopUp();
}