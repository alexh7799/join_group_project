function togglePopUp() {
    let popUp = document.getElementById("profile-pop-up");
    popUp.classList.toggle("into-view");

    let overlayContainer = document.getElementById("overlay-container");
    overlayContainer.style.right = "calc(0px)";
}

function removeOverlay() {
    let popUp = document.getElementById("profile-pop-up");
    popUp.classList.remove("into-view");

    let overlayContainer = document.getElementById("overlay-container");
    overlayContainer.style.right = "calc(-100vw)";
}

function doNotClose(event) {
    event.stopPropagation();
};

function logOut() {
    localStorage.clear();
    sessionStorage.clear();
    location.href='../login/login.html';
}

function loadProfile() {
    let profile = document.getElementById('profile');
    let userName = sessionStorage.getItem("username");
    
}