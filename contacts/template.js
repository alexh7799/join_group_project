let userArray = []; 

/**
 * render the contact list
 * @param {*} usergroup - the user-group
 * @param {*} alphabet - the current alphabet
 * @returns 
 */
function renderContactList(usergroup, alphabet) {
    let group = `<div class="contact-group">
            <h3 class="group-title">${alphabet}</h3>
            <div class="divider-contact"></div>`;
    usergroup[alphabet].forEach(user => {
        userArray.push(user);
        group += renderContactListItem(user) + `</div>`;    
    });
    return group; 
}

/**
 * render the user item
 * @param {*} user 
 * @returns 
 */
function renderContactListItem(user) {
    let initials = user.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    let capitalizedUserName = user.name.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    return `
        <div class="contact-item" tabindex="0" onclick="showContactDetails('${user.id}')">
                <span class="contact-icon center" style="background-color:${user.color}">${initials}</span>
                <div class="contact-details">
                    <span class="contact-name">${capitalizedUserName}</span>
                    <span class="contact-email">${user.email}</span>
                </div>
            </div>
    `;
}

function renderContactDetails(user) {
    let initials = user.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    let capitalizedUserName = user.name.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    return `
    <div class="contact-header">
        <span class="contact-icon-border center" style="background-color: ${user.color}">${initials}</span>
        <div class="contact-info-div">
            <h2 class="contact-name">${capitalizedUserName}</h2>
            <div class="contact-buttons" id="contact-buttons">
                <button class="contact-btn" onclick="editContact('${userArray.indexOf(user)}')">
                    <img src="../assets/icons/edit.svg">
                    <p>Edit</p>
                </button>
                <button class="contact-btn" onclick="deleteUser('${user.firebaseId}')">
                    <img src="../assets/icons/delete.svg">
                    <p>Delete</p>
                </button>
            </div>
        </div>
    </div>
    <div class="contact-info">
        <div class="contact-info-mag">
            <p>Contact Information</p>
        </div>
        <div class="contact-info-mp">
            <p class="contact-bold">Email</p>
            <p class="contact-info-mail">${user.email}</p>
            <p class="contact-bold">Phone</p>
            <p>${user.phone}</p>
        </div>
    </div>`;
}

function renderEditContact(user) {
    let initials = userArray[user].name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    return `<div class="popup">
    <div class="popup-left">

        <!-- MOBIEL -->
        <div class="close-btn-mobile">
            <button onclick="closeContactForm()">
                <img src="../assets/icons/close-white.svg" alt="">
            </button>
        </div>
        <!-- MOBIEL -->

        <div class="logo">
            <img src="../assets/icons/logo2.svg">
        </div>
        <h1>Edit contact</h1>
    </div>

    <div class="icon-wrapper">
        <span class="add-contact-initials center" style="background-color: ${userArray[user].color};">${initials}</span>
    </div>

    <div class="popup-right">
        <div class="close-btn-wrapper">
            <button onclick="closeContactForm()">
                <img src="../assets/icons/close-default.svg" alt="">
            </button>
        </div>
        <div class="popup-form">
            <div class="form-group">
                <div class="input-icon">
                    <input type="text" id="name" placeholder="Name" required value="${userArray[user].name}">
                    <img src="../assets/icons/person.svg">
                </div>
            </div>
            <div class="form-group">
                <div class="input-icon">
                    <input type="email" id="email" placeholder="Email" required value="${userArray[user].email}">
                    <img src="../assets/icons/mail.svg">
                </div>
            </div>
            <div class="form-group">
                <div class="input-icon">
                    <input type="tel" id="phone" placeholder="Phone" value="${userArray[user].phone}">
                    <img src="../assets/icons/phone.svg">
                </div>
            </div>
             <div class="btn">
                <button class="delete-btn btn-center" onclick="deleteUser('${userArray[user].firebaseId}')">Delete</button>
                <button class="save-btn gap btn-center" onclick="updateUser(${user})">
                    Save
                    <img src="../assets/icons/check-white.svg">
                </button>
            </div> 
        </div>
    </div>
</div>`
}

function renderNewContact() {    
    return `<div class="popup">
            <div class="popup-left">

                <!-- MOBIEL -->
                <div class="close-btn-mobile">
                    <button onclick="closeContactForm()">
                        <img src="../assets/icons/close-white.svg" alt="">
                    </button>
                </div>
                <!-- MOBIEL -->

                <div class="logo">
                    <img src="../assets/icons/logo2.svg">
                </div>
                <h1>Add contact</h1>
                <p class="text-color">Tasks are better with a team!</p>
                <div class="divider-add-contact"></div>
            </div>

            <div class="icon-wrapper">
                <span class="add-contact-icon center" style="background-color: #747474;"><img
                        src="../assets/icons/person-white.svg"></span>
            </div>

            <div class="popup-right">
                <div class="close-btn-wrapper">
                    <button onclick="closeContactForm()">
                        <img src="../assets/icons/close-default.svg" alt="">
                    </button>
                </div>
                <div class="popup-form">
                    <div class="form-group">
                        <div class="input-icon">
                            <input type="text" id="name" placeholder="Name" required>
                            <img src="../assets/icons/person.svg">
                        </div>
                        <div class="error-message" id="error-div-name"> </div>
                    </div>
                    <div class="form-group">
                        <div class="input-icon">
                            <input type="email" id="email" placeholder="Email" required>
                            <img src="../assets/icons/mail.svg">
                        </div>
                        <div class="error-message" id="error-div-email"> </div>
                    </div>
                    <div class="form-group">
                        <div class="input-icon">
                            <input type="tel" id="phone" placeholder="Phone">
                            <img src="../assets/icons/phone.svg">
                        </div>
                        <div class="error-message" id="error-div-tel"> </div>
                    </div>
                    <div class="btn">
                        <button class="cancel-btn btn-center" onclick="closeContactForm()">
                            Cancel
                            <img src="../assets/icons/close-default.svg">
                        </button>
                        <button class="create-btn btn-center gap" onclick="createContact()">
                            Create contact
                            <img src="../assets/icons/check-white.svg">
                        </button>
                    </div>
                </div>
            </div>
        </div>`
}

function renderEditDeletePopup(user) {
    return `<li><button class="contact-btn" onclick="editContact('${userArray.indexOf(user)}', removeEditDel())">
                <img src="../assets/icons/edit.svg">
                <p>Edit</p>
            </button>
            </li>
            <li>
            <button class="contact-btn" onclick="deleteUser('${user.firebaseId}', removeEditDel())">
                <img src="../assets/icons/delete.svg">
                <p>Delete</p>
            </button>
            </li>`
}