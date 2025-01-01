let pass1 = document.getElementById("password-input-1");
let pass2 = document.getElementById("password-input-2");
let errorMsg = document.getElementById("false"); 
let signUpBtn = document.getElementById("signUpBtn");
let usercount;
let userArray = []
const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

async function init() {
    await checkLogin();
    await loadUserCounter();
}

async function loadUserCounter() {
    let response = await fetch(BASE_URL + "usercount.json");
    let responseToJson = await response.json();  
    usercount = responseToJson;
}

document.getElementById("login-form-container").addEventListener("submit", async function (event){
    event.preventDefault();
})

function signUp() {
    validateSignUpForm();    
}

async function putUsercount(path="", data="") { // Anlegen von Daten 
    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    
    return responseToJson = await response.json();
}

async function postData(path="", data="") { // Anlegen von Daten 
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    
    return responseToJson = await response.json();
}

function showSuccessMsgTasks(name,email) {
    let overlayDiv = document.getElementById('overlay-successfull');
    overlayDiv.classList.add('overlay-suess-contact');
    sessionStorage.setItem('username', name);
    sessionStorage.setItem('email', email);
    setInterval(()=> {
        window.location.href = '../summary/summary.html';
    }, 800);
}


async function loadingSignUsers(name, email, password1) {
    try {
        const response = await fetch(BASE_URL + "users/.json");
        const users = await response.json();
            
        let existingUser = null;
        for (let key in users) {
            if (users[key].email === email) {
                existingUser = { key, ...users[key] };
                break;
            }
        }
        await isExistingUser(existingUser, name, email, password1);
        return true;
    } catch (error) {
        console.error('Fehler:', error);
        return false;
    }
}

async function isExistingUser(existingUser, name, email, password1) {
    if (existingUser) {
        showError('Email is already registered');
        return false;
    } else {
        await createNewUser(name, email, password1);
        return true;
    }
}

function clearErrorMessages() {
    const errorDiv = document.querySelectorAll('.error-message');
    errorDiv.forEach(error => {
        error.classList.add('d-none');
    });
}

function showError(message) {
    const errorDiv = document.getElementById('error-div');
    if (errorDiv !== null) {
        errorDiv.classList.remove('d-none');
        errorDiv.textContent = message;
    }
}

async function validateSignUpForm() {
    let name = document.getElementById('name-input').value;
    let email = document.getElementById('email-input').value;
    let password1 = document.getElementById('password-input-1').value;
    let password2 = document.getElementById('password-input-2').value;
    const checkbox = document.getElementById('privacy-checkbox');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    clearErrorMessages();

    if(validateFunction(name, email, password1, password2, checkbox, emailRegex)) {
        try {
            if(await loadingSignUsers(name, email, password1)) {
                showSuccessMsgTasks(name, email);
            }
        } catch (error) {
            return false;
        }
    }
}

async function updateUser(key, password, name) {
    await fetch(BASE_URL + `users/${key}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ 
            password: password,
            name: name
        })
    });
}

async function createNewUser(name, email, password) {
    let color = getRandomColor();
    await postData(`/users/`, {"name": name, "email": email, "password": password, "id": usercount + 1,"phone": "", "color": `${color}`});
    usercount++;
    await putUsercount(`usercount`, usercount); 
}

function validateFunction(name, email, password1, password2, checkbox, emailRegex) {
    if (name.trim().length < 2) {
        showError('Name must be at least 2 characters long');
        return false;
    }

    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    if (!validatePassword(password1)) {
        return false;
    }

    if (password1 !== password2) {
        showError('Passwords do not match');
        return false;
    }

    if (!checkbox.checked) {
        showError('Please accept the privacy policy');
        return false;
    }
    return true;
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
    console.log(password.length);
    if (!(password.length >= 8) || password.includes(' ')) {
        showError('Password must be at least 8 characters long and must not contain spaces');
        return false;
    }
    
    return true;
}