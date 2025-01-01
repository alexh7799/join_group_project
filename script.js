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
  const isLoginPage = window.location.pathname.includes("join/login/login.html");
  const isSignUp = window.location.pathname.includes("join/sign-up/sign-up.html");
    const sessionUser = sessionStorage.getItem("username");
    const localUser = localStorage.getItem("username");

    // Wenn Remember-Me aktiv (localUser vorhanden)
    if (localUser && !sessionUser) {
      sessionStorage.setItem("username", localUser);
      sessionStorage.setItem("email", localStorage.getItem("email"));
    }

    if (isSignUp && (sessionUser || localUser)) {
      window.location.href = "../summary/summary.html";
      return;
    }
    
    // Wenn auf Login-Seite und eingeloggt, zu Summary weiterleiten
    if (isLoginPage && (sessionUser || localUser)) {
        window.location.href = "../summary/summary.html";
        return;
    }
    
    // Wenn nicht eingeloggt und nicht auf Login-Seite
    if (!sessionUser && !localUser && !isLoginPage && !isSignUp) {
        window.location.href = "../login/login.html";
        return;
    }
}

/**
 * Generate initials for the top right corner in the header section.
 */
function generateInitials() {
  let content = document.getElementById("profile");

  let userName = sessionStorage.getItem("username");
  content.innerHTML = "";
  let nameParts = userName.split(" ");
  if (nameParts.length >= 2) {
    let initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    content.innerHTML = initials;
  } else if (nameParts.length === 1) {
    let initials = nameParts[0][0].toUpperCase();
    content.innerHTML = initials;
  } else {
    content.innerHTML = "G";
  }
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function checkLink() {
  const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('#navigation-container .aside-nav a');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        let href = link.getAttribute('href').replace('../', '');
        if (currentPath.includes("/join/"+ href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}