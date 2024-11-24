function initSummary() {
    generateGreets()
}

function generateGreets() {
    let greetingTime = getGreeting();
    let userName = sessionStorage.getItem("userName");
    let content = document.getElementById("greeting");
    content.innerHTML =
      userName === ""
        ? `<p>Good ${greetingTime}!</p>`
        : `<p>Good ${greetingTime},</p>
        <p class="name-summary">${userName}</p>`;
  }

function getGreeting() {
    let now = new Date();
    let hours = now.getHours();
    if (hours >= 5 && hours < 12) return "morning";
    if (hours >= 12 && hours < 18) return "afternoon";
    if (hours >= 18 && hours < 24) return "evening";
    return "night";
}

function goToBoard() {
    window.location.href = 'board.html';
}