let pass1 = document.getElementById("password-input-1");
let pass2 = document.getElementById("password-input-2");
let errorMsg = document.getElementById("false"); 
let signUpBtn = document.getElementById("signUpBtn");
let usercount;
let userArray = []
const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

async function init() {
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
    let name = document.getElementById("name-input").value;
    let email = document.getElementById("email-input").value;
    let password = document.getElementById("password-input-1").value;
    let color = getRandomColor();

    //if(validateUser(email)) {
        postData(`/users/`, {"name": name, "email": email, "password": password, "id": usercount + 1,"phone": "", "color": `${color}`});
        usercount++;
        putUsercount(`usercount`, usercount); 
        showSuccessMsgTasks(name);
    //}
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

function checkPassword() {
    if (pass1.value === pass2.value) {
        errorMsg.style.display = 'none';
        pass2.style.border = '1px solid #D1D1D1';
        document.getElementById("signUpBtn").disabled = false;
    } else {
        errorMsg.style.display = 'block';
        pass2.style.border = '1px solid #FF001F';
        document.getElementById("signUpBtn").disabled = true;
    }
}

pass1.addEventListener('keyup', () => {
    if(pass1.value.length != 0) checkPassword();
})

pass2.addEventListener('keyup', () => {
    if(pass2.value.length != 0) checkPassword();
})

function showSuccessMsgTasks(name) {
    let overlayDiv = document.getElementById('overlay-successfull');
    overlayDiv.classList.add('overlay-suess-contact');
    sessionStorage.setItem('username', name);
    setInterval(()=> {
        window.location.href = '../summary/summary.html';
    }, 800);
}

async function validateUser(email) {
    try {
        await loadingUsers();
        const userExists = usersArray.some(user => user.email === email);
        
        if (userExists) {
            showError('Diese E-Mail ist bereits registriert');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Fehler bei der Validierung:', error);
        return false;
    }
}

async function loadingUsers() {
    try {
        let response = await fetch(BASE_URL + "users/" + ".json");
        let user = await response.json();
        usersArray = Object.entries(user).map(([key, user]) => ({
            ...user,
            firebaseId: key
        }));

    } catch (error) {
        console.error('Fehler:', error);
    }
}