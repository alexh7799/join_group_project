function initPrivacyPolicy() {
    includeHTML();
    checkLink();
    notLogin();
}

function notLogin() {
    let sidebar = document.getElementById('navigation-container');
    let profile = document.getElementById('profile');
    let info = document.getElementById('info');
    let asideNav = document.getElementById('aside-nav');
    if (sessionStorage.getItem("username") == null) {
        sidebar.classList.add('no-login-sidebar-none');
        profile.classList.add('no-login-none');
        info.classList.add('no-login-none');
        asideNav.classList.add('no-login-none');
    } else {
        sidebar.classList.remove('no-login-sidebar-none');
        profile.classList.remove('no-login-none');
        info.classList.remove('no-login-none');
        asideNav.classList.remove('no-login-none');
        generateInitials();
    }
}