const BASE_URL = "https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/users/";

let rememberMeValue = false;


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

    function hiddenImg() {
        let passwordSVG = document.getElementById("password-icon");

        passwordSVG.innerHTML = `
            <svg style="cursor: pointer;" onclick="changeType()" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_69960_5191" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                <rect x="0.144531" y="0.80835" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_69960_5191)">
                <path d="M16.2443 14.1084L14.7943 12.6584C14.9443 11.8751 14.7193 11.1418 14.1193 10.4584C13.5193 9.77511 12.7443 9.50845 11.7943 9.65845L10.3443 8.20845C10.6277 8.07511 10.9152 7.97511 11.2068 7.90845C11.4985 7.84178 11.811 7.80845 12.1443 7.80845C13.3943 7.80845 14.4568 8.24595 15.3318 9.12095C16.2068 9.99595 16.6443 11.0584 16.6443 12.3084C16.6443 12.6418 16.611 12.9543 16.5443 13.2459C16.4777 13.5376 16.3777 13.8251 16.2443 14.1084ZM19.4443 17.2584L17.9943 15.8584C18.6277 15.3751 19.1902 14.8459 19.6818 14.2709C20.1735 13.6959 20.5943 13.0418 20.9443 12.3084C20.111 10.6251 18.9152 9.28761 17.3568 8.29595C15.7985 7.30428 14.061 6.80845 12.1443 6.80845C11.661 6.80845 11.186 6.84178 10.7193 6.90845C10.2527 6.97511 9.79434 7.07511 9.34434 7.20845L7.79434 5.65845C8.47767 5.37511 9.17767 5.16261 9.89434 5.02095C10.611 4.87928 11.361 4.80845 12.1443 4.80845C14.5277 4.80845 16.6693 5.43761 18.5693 6.69595C20.4693 7.95428 21.8943 9.59178 22.8443 11.6084C22.8943 11.6918 22.9277 11.7959 22.9443 11.9209C22.961 12.0459 22.9693 12.1751 22.9693 12.3084C22.9693 12.4418 22.9568 12.5709 22.9318 12.6959C22.9068 12.8209 22.8777 12.9251 22.8443 13.0084C22.461 13.8584 21.9818 14.6418 21.4068 15.3584C20.8318 16.0751 20.1777 16.7084 19.4443 17.2584ZM19.2443 22.7084L15.7443 19.2584C15.161 19.4418 14.5735 19.5793 13.9818 19.6709C13.3902 19.7626 12.7777 19.8084 12.1443 19.8084C9.761 19.8084 7.61934 19.1793 5.71934 17.9209C3.81934 16.6626 2.39434 15.0251 1.44434 13.0084C1.39434 12.9251 1.361 12.8209 1.34434 12.6959C1.32767 12.5709 1.31934 12.4418 1.31934 12.3084C1.31934 12.1751 1.32767 12.0501 1.34434 11.9334C1.361 11.8168 1.39434 11.7168 1.44434 11.6334C1.79434 10.8834 2.211 10.1918 2.69434 9.55845C3.17767 8.92511 3.711 8.34178 4.29434 7.80845L2.21934 5.70845C2.036 5.52511 1.94434 5.29595 1.94434 5.02095C1.94434 4.74595 2.04434 4.50845 2.24434 4.30845C2.42767 4.12511 2.661 4.03345 2.94434 4.03345C3.22767 4.03345 3.461 4.12511 3.64434 4.30845L20.6443 21.3084C20.8277 21.4918 20.9235 21.7209 20.9318 21.9959C20.9402 22.2709 20.8443 22.5084 20.6443 22.7084C20.461 22.8918 20.2277 22.9834 19.9443 22.9834C19.661 22.9834 19.4277 22.8918 19.2443 22.7084ZM5.69434 9.20845C5.211 9.64178 4.76934 10.1168 4.36934 10.6334C3.96934 11.1501 3.62767 11.7084 3.34434 12.3084C4.17767 13.9918 5.3735 15.3293 6.93184 16.3209C8.49017 17.3126 10.2277 17.8084 12.1443 17.8084C12.4777 17.8084 12.8027 17.7876 13.1193 17.7459C13.436 17.7043 13.761 17.6584 14.0943 17.6084L13.1943 16.6584C13.011 16.7084 12.836 16.7459 12.6693 16.7709C12.5027 16.7959 12.3277 16.8084 12.1443 16.8084C10.8943 16.8084 9.83184 16.3709 8.95684 15.4959C8.08184 14.6209 7.64434 13.5584 7.64434 12.3084C7.64434 12.1251 7.65684 11.9501 7.68184 11.7834C7.70684 11.6168 7.74434 11.4418 7.79434 11.2584L5.69434 9.20845Z" fill="#A8A8A8"/>
                </g>
            </svg>
        `;
    }
    checkLogin();
});

function lockImg() {
    let passwordSVG = document.getElementById("password-icon");

    passwordSVG.style.pointerEvents = "none";
    passwordSVG.innerHTML = `
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_253431_5115" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
            <rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_253431_5115)">
            <path d="M6 22.5C5.45 22.5 4.97917 22.3042 4.5875 21.9125C4.19583 21.5208 4 21.05 4 20.5V10.5C4 9.95 4.19583 9.47917 4.5875 9.0875C4.97917 8.69583 5.45 8.5 6 8.5H7V6.5C7 5.11667 7.4875 3.9375 8.4625 2.9625C9.4375 1.9875 10.6167 1.5 12 1.5C13.3833 1.5 14.5625 1.9875 15.5375 2.9625C16.5125 3.9375 17 5.11667 17 6.5V8.5H18C18.55 8.5 19.0208 8.69583 19.4125 9.0875C19.8042 9.47917 20 9.95 20 10.5V20.5C20 21.05 19.8042 21.5208 19.4125 21.9125C19.0208 22.3042 18.55 22.5 18 22.5H6ZM6 20.5H18V10.5H6V20.5ZM12 17.5C12.55 17.5 13.0208 17.3042 13.4125 16.9125C13.8042 16.5208 14 16.05 14 15.5C14 14.95 13.8042 14.4792 13.4125 14.0875C13.0208 13.6958 12.55 13.5 12 13.5C11.45 13.5 10.9792 13.6958 10.5875 14.0875C10.1958 14.4792 10 14.95 10 15.5C10 16.05 10.1958 16.5208 10.5875 16.9125C10.9792 17.3042 11.45 17.5 12 17.5ZM9 8.5H15V6.5C15 5.66667 14.7083 4.95833 14.125 4.375C13.5417 3.79167 12.8333 3.5 12 3.5C11.1667 3.5 10.4583 3.79167 9.875 4.375C9.29167 4.95833 9 5.66667 9 6.5V8.5Z" fill="#A8A8A8"/>
            </g>
        </svg>
    `;
}

function changeType() {
    const passwordInput = document.getElementById("password-input");
    let passwordSVG = document.getElementById("password-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordSVG.innerHTML = `
            <svg style="cursor: pointer;" onclick="changeType()" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_69960_5197" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                <rect x="0.144531" y="0.80835" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_69960_5197)">
                <path d="M12.1443 16.8083C13.3943 16.8083 14.4568 16.3708 15.3318 15.4958C16.2068 14.6208 16.6443 13.5583 16.6443 12.3083C16.6443 11.0583 16.2068 9.99585 15.3318 9.12085C14.4568 8.24585 13.3943 7.80835 12.1443 7.80835C10.8943 7.80835 9.83184 8.24585 8.95684 9.12085C8.08184 9.99585 7.64434 11.0583 7.64434 12.3083C7.64434 13.5583 8.08184 14.6208 8.95684 15.4958C9.83184 16.3708 10.8943 16.8083 12.1443 16.8083ZM12.1443 15.0083C11.3943 15.0083 10.7568 14.7458 10.2318 14.2208C9.70684 13.6959 9.44434 13.0583 9.44434 12.3083C9.44434 11.5583 9.70684 10.9208 10.2318 10.3958C10.7568 9.87085 11.3943 9.60835 12.1443 9.60835C12.8943 9.60835 13.5318 9.87085 14.0568 10.3958C14.5818 10.9208 14.8443 11.5583 14.8443 12.3083C14.8443 13.0583 14.5818 13.6959 14.0568 14.2208C13.5318 14.7458 12.8943 15.0083 12.1443 15.0083ZM12.1443 19.8083C9.82767 19.8083 7.711 19.1959 5.79434 17.9708C3.87767 16.7458 2.42767 15.0917 1.44434 13.0083C1.39434 12.925 1.361 12.8209 1.34434 12.6958C1.32767 12.5708 1.31934 12.4417 1.31934 12.3083C1.31934 12.175 1.32767 12.0458 1.34434 11.9208C1.361 11.7958 1.39434 11.6917 1.44434 11.6083C2.42767 9.52502 3.87767 7.87085 5.79434 6.64585C7.711 5.42085 9.82767 4.80835 12.1443 4.80835C14.461 4.80835 16.5777 5.42085 18.4943 6.64585C20.411 7.87085 21.861 9.52502 22.8443 11.6083C22.8943 11.6917 22.9277 11.7958 22.9443 11.9208C22.961 12.0458 22.9693 12.175 22.9693 12.3083C22.9693 12.4417 22.961 12.5708 22.9443 12.6958C22.9277 12.8209 22.8943 12.925 22.8443 13.0083C21.861 15.0917 20.411 16.7458 18.4943 17.9708C16.5777 19.1959 14.461 19.8083 12.1443 19.8083ZM12.1443 17.8083C14.0277 17.8083 15.7568 17.3125 17.3318 16.3208C18.9068 15.3292 20.111 13.9917 20.9443 12.3083C20.111 10.625 18.9068 9.28752 17.3318 8.29585C15.7568 7.30418 14.0277 6.80835 12.1443 6.80835C10.261 6.80835 8.53184 7.30418 6.95684 8.29585C5.38184 9.28752 4.17767 10.625 3.34434 12.3083C4.17767 13.9917 5.38184 15.3292 6.95684 16.3208C8.53184 17.3125 10.261 17.8083 12.1443 17.8083Z" fill="#A8A8A8"/>
                </g>
            </svg>
        `;
    } else {
        passwordInput.type = "password";
        passwordSVG.innerHTML = `
            <svg style="cursor: pointer;" onclick="changeType()" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_69960_5191" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                <rect x="0.144531" y="0.80835" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_69960_5191)">
                <path d="M16.2443 14.1084L14.7943 12.6584C14.9443 11.8751 14.7193 11.1418 14.1193 10.4584C13.5193 9.77511 12.7443 9.50845 11.7943 9.65845L10.3443 8.20845C10.6277 8.07511 10.9152 7.97511 11.2068 7.90845C11.4985 7.84178 11.811 7.80845 12.1443 7.80845C13.3943 7.80845 14.4568 8.24595 15.3318 9.12095C16.2068 9.99595 16.6443 11.0584 16.6443 12.3084C16.6443 12.6418 16.611 12.9543 16.5443 13.2459C16.4777 13.5376 16.3777 13.8251 16.2443 14.1084ZM19.4443 17.2584L17.9943 15.8584C18.6277 15.3751 19.1902 14.8459 19.6818 14.2709C20.1735 13.6959 20.5943 13.0418 20.9443 12.3084C20.111 10.6251 18.9152 9.28761 17.3568 8.29595C15.7985 7.30428 14.061 6.80845 12.1443 6.80845C11.661 6.80845 11.186 6.84178 10.7193 6.90845C10.2527 6.97511 9.79434 7.07511 9.34434 7.20845L7.79434 5.65845C8.47767 5.37511 9.17767 5.16261 9.89434 5.02095C10.611 4.87928 11.361 4.80845 12.1443 4.80845C14.5277 4.80845 16.6693 5.43761 18.5693 6.69595C20.4693 7.95428 21.8943 9.59178 22.8443 11.6084C22.8943 11.6918 22.9277 11.7959 22.9443 11.9209C22.961 12.0459 22.9693 12.1751 22.9693 12.3084C22.9693 12.4418 22.9568 12.5709 22.9318 12.6959C22.9068 12.8209 22.8777 12.9251 22.8443 13.0084C22.461 13.8584 21.9818 14.6418 21.4068 15.3584C20.8318 16.0751 20.1777 16.7084 19.4443 17.2584ZM19.2443 22.7084L15.7443 19.2584C15.161 19.4418 14.5735 19.5793 13.9818 19.6709C13.3902 19.7626 12.7777 19.8084 12.1443 19.8084C9.761 19.8084 7.61934 19.1793 5.71934 17.9209C3.81934 16.6626 2.39434 15.0251 1.44434 13.0084C1.39434 12.9251 1.361 12.8209 1.34434 12.6959C1.32767 12.5709 1.31934 12.4418 1.31934 12.3084C1.31934 12.1751 1.32767 12.0501 1.34434 11.9334C1.361 11.8168 1.39434 11.7168 1.44434 11.6334C1.79434 10.8834 2.211 10.1918 2.69434 9.55845C3.17767 8.92511 3.711 8.34178 4.29434 7.80845L2.21934 5.70845C2.036 5.52511 1.94434 5.29595 1.94434 5.02095C1.94434 4.74595 2.04434 4.50845 2.24434 4.30845C2.42767 4.12511 2.661 4.03345 2.94434 4.03345C3.22767 4.03345 3.461 4.12511 3.64434 4.30845L20.6443 21.3084C20.8277 21.4918 20.9235 21.7209 20.9318 21.9959C20.9402 22.2709 20.8443 22.5084 20.6443 22.7084C20.461 22.8918 20.2277 22.9834 19.9443 22.9834C19.661 22.9834 19.4277 22.8918 19.2443 22.7084ZM5.69434 9.20845C5.211 9.64178 4.76934 10.1168 4.36934 10.6334C3.96934 11.1501 3.62767 11.7084 3.34434 12.3084C4.17767 13.9918 5.3735 15.3293 6.93184 16.3209C8.49017 17.3126 10.2277 17.8084 12.1443 17.8084C12.4777 17.8084 12.8027 17.7876 13.1193 17.7459C13.436 17.7043 13.761 17.6584 14.0943 17.6084L13.1943 16.6584C13.011 16.7084 12.836 16.7459 12.6693 16.7709C12.5027 16.7959 12.3277 16.8084 12.1443 16.8084C10.8943 16.8084 9.83184 16.3709 8.95684 15.4959C8.08184 14.6209 7.64434 13.5584 7.64434 12.3084C7.64434 12.1251 7.65684 11.9501 7.68184 11.7834C7.70684 11.6168 7.74434 11.4418 7.79434 11.2584L5.69434 9.20845Z" fill="#A8A8A8"/>
                </g>
            </svg>
        `;
    }
}

function guestLogin() {
    sessionStorage.setItem('username', 'Guest');
    window.location.href = '../summary/summary.html';
}

let container = document.getElementById("login-form-container");
container.addEventListener("submit", async function (event){
    event.preventDefault();
})

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

function toggleRememberMeBtn() {
    const rememberMeBtn = document.getElementById('remember-me-btn');
    rememberMeBtn.classList.toggle('checked');
    if (rememberMeBtn.className.includes('checked')) {
        rememberMeValue = true;
    } else {
        rememberMeValue = false;
    }
}