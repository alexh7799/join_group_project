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

function showContactDetails(userId) {
    let contactDetails = document.getElementById("contact-details");
    let selectedUser = userArray.find(user => user.id == userId);
    if (window.innerWidth <= 826) {
        contactDetails.parentElement.classList.add('mobile-popup');
        document.body.style.overflow = 'hidden'; // Verhindert Scrollen im Hintergrund
    }
    
    contactDetails.innerHTML = renderContactDetails(selectedUser);
}

function closeContactDetails() {
    let contactDetails = document.getElementById("contact-details");
    contactDetails.parentElement.classList.remove('mobile-popup');
    document.body.style.overflow = 'auto';
}

function renderContactDetails(user) {
    let initials = user.name.split(' ').map(name => name.charAt(0).toUpperCase()).join('');
    let capitalizedUserName = user.name.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
    return `
    <div class="contact-header">
        <span class="contact-icon-border center" style="background-color: ${user.color}">${initials}</span>
        <div class="contact-info-div">
            <h2 class="contact-name">${capitalizedUserName}</h2>
            <div class="contact-buttons">
                <button class="contact-btn" onclick="editContact('${user}')">
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