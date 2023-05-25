let degree = 20;
let direction = 1;
let height = 550;
let isCaught = false;
let width = window.innerWidth - 150;
let animals = [];
let ropeLength = 90;
const imageSize = 100;
const animalNumbers = 12;

let timer;

// Define the object
let myObject = {
  name: "My Object",
  size: 100,
};

// get max score from local storage
let maxScore = JSON.parse(window.localStorage.getItem("maxScore"));
const maxScoreDisplay = document.querySelector("#max-score");

if (maxScore === null) {
  maxScore = 0;
}

// Display max score
maxScoreDisplay.innerHTML = JSON.stringify(maxScore);

function swing() {
  degree += direction;
  if (degree >= 160 || degree <= 20) {
    direction *= -1;
  }

  let rope = document.getElementById("rope");
  rope.style.transform = "rotate(" + degree + "deg)";
}

function randomNum(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

function createAnimal() {
  for (let i = 0; i < animalNumbers; i++) {
    let left = randomNum(10, width - imageSize);
    let top = randomNum(280, 600 - imageSize);

    while (isOverlap(left, top)) {
      left = randomNum(10, width - imageSize);
      top = randomNum(280, 600 - imageSize);
    }
    const img = document.createElement("img");
    img.src = i + ".png";
    img.classList.add("animal");

    //（Add the object to the animals array）
    animals.push([left, top, myObject]);

    img.style.top = top + "px";
    img.style.left = left + "px";

    //（Use object here)
    img.style.width = myObject.size + "px";
    img.style.height = myObject.size + "px";

    document.querySelector("#container").appendChild(img);
  }
}

function isOverlap(x, y) {
  let isOverlap = false;
  document.querySelectorAll(".animal").forEach((animal) => {
    const animalLeft = parseInt(animal.style.left);
    const animalTop = parseInt(animal.style.top);
    if (
      x + imageSize > animalLeft &&
      x < animalLeft + imageSize &&
      y + imageSize > animalTop &&
      y < animalTop + imageSize
    ) {
      isOverlap = true;
    }
  });

  return isOverlap;
}

function lengthen(r) {
  ropeLength += 3;
  if (ropeLength >= r) {
    clearInterval(timer);
    timer = setInterval("shorten()", 20);
    return;
  }

  rope.style.width = ropeLength + "px";

  let pliers = document.querySelector("#pliers");
  let left = getOffset(pliers).left - 30 * Math.sin((degree * Math.PI) / 180);
  let top = getOffset(pliers).top + 5;

  if (left < 0 || left > width || top < 0 || top > height) {
    clearInterval(timer);
    timer = setInterval("shorten()", 20);
    return;
  }

  for (let i = 0; i < animals.length; i++) {
    if (
      left > animals[i][0] &&
      left < animals[i][0] + imageSize &&
      top > animals[i][1] &&
      top < animals[i][1] + imageSize
    ) {
      clearInterval(timer);
      isCaught = true;
      timer = setInterval("shorten(" + i + ")", 20);
    }
  }
}

function shorten(index) {
  let animalItem = document.querySelectorAll(".animal");

  if (index >= 0) {
    ropeLength -= 2;
  } else {
    ropeLength -= 6;
  }

  if (ropeLength <= 90) {
    isCaught = false;
    clearInterval(timer);
    if (index >= 0) {
      animalItem[index].style.display = "none";
      animals[index] = [9999, 9999];
      addScore();
    }
    timer = setInterval(swing, 20);
    return;
  }

  if (index >= 0) {
    let pliers = document.querySelector("#pliers");
    let left =
      getOffset(pliers).left +
      (35 - imageSize / 2) * Math.sin((degree * Math.PI) / 180);
    let top = getOffset(pliers).top + 5;
    animalItem[index].style.top = top + "px";
    animalItem[index].style.left = left + "px";
  }
  rope.style.width = ropeLength + "px";
}

function catchAnimal() {
  clearInterval(timer);
  let arc = (degree * Math.PI) / 180;
  let r = height / Math.sin(arc); //maximum length
  let len = Math.abs(width / Math.cos(arc));
  if (r > len) {
    r = len;
  }
  timer = setInterval("lengthen(" + r + ")", 1);
}

function getOffset(element) {
  let rect = element.getBoundingClientRect();
  let scrollLeft = document.documentElement.scrollLeft;
  let scrollTop = document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}

document.addEventListener("DOMContentLoaded", function () {
  let gameStarted = true;
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32 && !isCaught) {
      catchAnimal();
      if (gameStarted === true) {
        startTimer();
      }
      gameStarted = false;
    }
  });
  createAnimal();
  timer = setInterval(swing, 20);
});

function addScore() {
  let score = document.querySelector("#score");
  let scoreNow = parseInt(score.innerHTML);
  scoreNow += 1;
  score.innerHTML = scoreNow;
  window.localStorage.setItem("currentScore", JSON.stringify(scoreNow));

  if (scoreNow > maxScore) {
    maxScore = scoreNow;
    window.localStorage.setItem("maxScore", JSON.stringify(maxScore));
    document.querySelector("#max-score").innerHTML = maxScore;
  }

  if (scoreNow === animalNumbers) {
    setTimeout(function () {
      window.location.href = "win.html";
    }, 3000);
  }
}

function startTimer() {
  let time = 60;
  let timer = setInterval(function () {
    time--;
    document.querySelector("#time").innerHTML = "Time left: " + time;
    if (time === 0) {
      clearInterval(timer);
      window.location.href = "loss.html";
    }
  }, 1000);
}
