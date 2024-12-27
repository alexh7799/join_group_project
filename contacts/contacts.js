const BASE_URL ="https://join-c39f7-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * initializes the contacts page.
 */
function initContacts() {
    checkLogin()
    includeHTML()
    loadingUsers()
}

/**
 * toogle the dropdown menu
 */
function toggleDropdown() {
    let dropdownOptions = document.getElementById("dropdown-options");
    let dropdownArrow = document.getElementById("dropdown-arrow");
    dropdownOptions.classList.toggle("show");
    if (dropdownOptions.classList.contains("show")) {
        dropdownArrow.innerHTML = `<img src="img/assets/icons/arrow-up-dropdown.svg">`;
    } else {
        dropdownArrow.innerHTML = `<img src="img/assets/icons/arrow-dropdown.svg">`;
    }
}

/**
 * Fetches users from the database and sorts them alphabetically by name.
 */
async function loadingUsers() {
    let response = await fetch(BASE_URL + "users/" + ".json");
    let user = await response.json();
    let usersArray = Object.entries(user).map(([key, user]) => ({
        ...user,
        firebaseId: key  // Add Firebase key to user object
    }));

    usersArray.sort((a, b) => a.name.localeCompare(b.name));
    
    let groupedUsers = usersArray.reduce((acc, user) => {
        let firstLetter = user.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(user);
        return acc;
    }, {});
    loadRenderContactList(groupedUsers);
}

/**
 * load the contact list.
 * @param {*} groupedUsers - the grouped users
 */
function loadRenderContactList(groupedUsers) {
    let contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";
    let userGroups = Object.keys(groupedUsers);
    userGroups.forEach(group => {
        contactList.innerHTML += renderContactList(groupedUsers, group);
    });
}

function addContact() {
    let popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.classList.add("showAddContact");
    document.body.style.overflow = 'hidden';
}

function closeAddContact() {
    let popupOverlay = document.getElementById("popup-overlay");
    popupOverlay.classList.remove("showAddContact");
    document.body.style.overflow = 'auto';
}

function createContact() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = "";
    let phone = document.getElementById("phone").value;
    console.log(email);
    console.log(name);
    console.log(password);
    
    postData(`/users/`, {"name": name, "email": email, "password": "", "id": usercount + 1, "phone": phone, "color": getRandomColor()});
    usercount++;
    putUsercount(`usercount`, usercount);   
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
    console.log("posted");
    
    return responseToJson = await response.json();
}

async function deleteUser(id) {
    let url = BASE_URL + "users/" + id + "/" + ".json";
    console.log(url);
    let response = await fetch(url, {
        method: "DELETE"
    });
    let data = await response.json();
    initContacts();
}

function editContact(user) {
    
}

async function updateContact(firebaseId, updatedData) {
    try {
        const url = BASE_URL + "users/" + firebaseId + ".json";
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData)
        });
        
        if (!response.ok) {
            throw new Error('Fehler beim Aktualisieren des Kontakts');
        }
        const data = await response.json();
        console.log('Kontakt erfolgreich aktualisiert:', data);
        initContacts();
        return data;
    } catch (error) {
        console.error('Fehler:', error);
    }
}