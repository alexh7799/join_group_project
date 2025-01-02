const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/users/";

let rememberMeValue = false;


/**
 * go to the sign up page
 */
function goToSignUp() {
    window.location.assign("../sign-up/sign-up.html")
}

document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("password-input");

    passwordInput.addEventListener("input", () => {
        if (passwordInput.value) {
            hiddenImg();
            document.getElementById("password-icon").style.pointerEvents = "auto";
        } else {
            lockImg();
        }
    });

    hiddenImg();
    checkLogin();
});


/**
 * guest-login function
 */
function guestLogin() {
    sessionStorage.setItem('username', 'Guest');
    window.location.href = '../summary/summary.html';
}


/**
 * event listener for login button
 */
let container = document.getElementById("login-form-container");
container.addEventListener("submit", async function (event){
    event.preventDefault();
})


/**
 * check if the user in database
 */
async function checkUser() {
    const emailInput = document.getElementById('email-input').value;
    const passwordInput = document.getElementById('password-input').value;
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch(`${BASE_URL}.json`);
        if (!response.ok) throw new Error("Fehler beim Abrufen der Datenbank.");
        const users = await response.json();
        console.log(users);
        let foundUser = null;
        if(emailInput === "" || passwordInput === "") {
            resultDiv.innerHTML = "Please fill in all fields.";
            return;
        }

        for (const key in users) {
            if (users[key].email == emailInput && users[key].password == passwordInput) {
                foundUser = users[key];
                break;
            }
        }

        if (foundUser) {
            sessionStorage.setItem('username', foundUser.name);
            sessionStorage.setItem('email', foundUser.email);
            if (rememberMeValue) {
                localStorage.setItem('username', foundUser.name);
                localStorage.setItem('email', foundUser.email);
                window.location.href = '../summary/summary.html';
            } else {
                window.location.href = '../summary/summary.html';
            }
            
        } else {
            resultDiv.innerHTML = `No matching Account found. <a href="">Join us</a> now!`;
        }
    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = "Fehler bei der Suche.";
    }
};


/**
 * toggle the Remember Me button
 */
function toggleRememberMeBtn() {
    const rememberMeBtn = document.getElementById('remember-me-btn');
    rememberMeBtn.classList.toggle('checked');
    if (rememberMeBtn.className.includes('checked')) {
        rememberMeValue = true;
    } else {
        rememberMeValue = false;
    }
}