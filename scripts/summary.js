function generateGreets() {
    let greetingTime = getGreeting();
    let userName = sessionStorage.getItem("userName");
    let content = document.getElementById("greeting-container");
    content.innerHTML =
      userName === "Guest"
        ? `<span class="greet-text">Good ${greetingTime}!</span>`
        : `<span class="greet-text">Good ${greetingTime},</span>
                     <span class="greet-user-name">${userName}</span>`;
  }

function getGreeting() {
    let now = new Date();
    let hours = now.getHours();
    if (hours >= 5 && hours < 12) return "morning";
    if (hours >= 12 && hours < 18) return "afternoon";
    if (hours >= 18 && hours < 24) return "evening";
    return "night";
  }