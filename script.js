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

function checkLogin() {
  let userName = sessionStorage.getItem("username");
    if (userName == null) {
        window.location.href = "../login/login.html"
    }
}

// function generateInitials() {
//   let content = document.getElementById("profile");

//   let userName = sessionStorage.getItem("userName");
//   content.innerHTML = "";

//   if (userName) {
//     let nameParts = userName.split(" ");
//     if (nameParts.length >= 2) {
//       let initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
//       content.innerHTML = initials;
//     } else if (nameParts.length === 1) {
//       let initials = nameParts[0][0].toUpperCase();
//       content.innerHTML = initials;
//     } else {
//       content.innerHTML = "G";
//     }
//   } else {
//     content.innerHTML = "G";
//   }
// }

// /**
//  * Ensures that the includeHTML is fully loaded before attempting to access user-logo.
//  */
// function awaitGenerateInitials() {
//   const interval = setInterval(() => {
//     const userLogo = document.getElementById("profile");
//     const helpUser = document.querySelector(".header_help_icon_container");
//     const sidebarUser = document.querySelector(".sidebar_links_center");

//     if (userLogo) {
//       clearInterval(interval);
//       const userName = sessionStorage.getItem("userName");

//       if (!userName) {
//         userLogo.style.display = "none";
//         if (helpUser) helpUser.style.display = "none";
//         if (sidebarUser) sidebarUser.style.display = "none";
//       } else {
//         generateInitials();
//         userLogo.style.display = "flex";
//       }
//     }
//   }, 10);
// }

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}