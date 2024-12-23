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