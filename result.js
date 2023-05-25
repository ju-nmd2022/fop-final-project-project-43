const scoreDisplay = document.querySelector("#current_score");
const score = window.localStorage.getItem("currentScore");
scoreDisplay.innerHTML = score;
