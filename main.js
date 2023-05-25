let degree = 20;
let direction = 1; // positive number to left, negative to right
let height = 550;
let isCaught = false;
let width = window.innerWidth - 150; // 100 is a margin preventing animals from going out of the screen
let animals = [];
let ropeLength = 90;
const imageSize = 100;
const animalNumbers = 12;

let timer;

// Clean up previous max score from local storage
window.localStorage.removeItem("maxScore");

// Get max score from local storage
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
} // get random number for img position

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

    animals.push([left, top]); // push img x,y into animal array
    img.style.top = top + "px";
    img.style.left = left + "px";

    document.querySelector("#container").appendChild(img);
  }
} //For example：<img src="0.png" class="animal" style="top: 346px; left: 627px;">

function isOverlap(x, y) {
  // check if animal collides with other animals
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
} // This part was get help from Karl
function addScore() {
  let score = document.querySelector("#score");
  let scoreNow = parseInt(score.innerHTML); // parseInt transform to the integer
  scoreNow += 1;
  score.innerHTML = scoreNow;
  window.localStorage.setItem("currentScore", scoreNow);
  if (scoreNow > maxScore) {
    maxScore = scoreNow;
    window.localStorage.setItem("maxScore", maxScore);
    document.querySelector("#max-score").innerHTML = maxScore;
  }
  if (scoreNow === animalNumbers) {
    setTimeout(function () {
      window.location.href = "win.html";
    }, 3000); // add small delay to show after catching the last animal
  }
}

function lengthen(maxMumLength) {
  ropeLength += 3;
  if (ropeLength >= maxMumLength) {
    clearInterval(timer);
    timer = setInterval("shorten()", 20);
    return;
  } // For caculate the max length is combined with function"catchAnimal" below

  rope.style.width = ropeLength + "px";

  let pliers = document.querySelector("#pliers");
  let left = getOffset(pliers).left - 30 * Math.sin((degree * Math.PI) / 180);
  let top = getOffset(pliers).top + 5;

  // shorten if outside of the screen
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

      console.log("hello");
      return;
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
  let r = height / Math.sin(arc);
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
//This function is get help from a friend, is to check position of an element on the screen
// We get x (left) and top (y) of the element.
// Taking into account any scrolling that may have occurred.

document.addEventListener("DOMContentLoaded", function () {
  let gameStarted = true;
  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32 && !isCaught) {
      // "!isCaught" evaluates to the boolean value true if isCaught is false
      //and it evaluates to false if isCaught is true. (Got help from Niklas)
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

// The coding was get idea and images for pliers element from this web:
// https://www.bilibili.com/video/BV1bx4y1P7kY/?spm_id_from=333.337.search-card.all.click&vd_source=108732e66ea4d2cef361d78ab79d1795

// Especially the rope animation part, and the angle with lenghthen and shorten part, they are all get datas from this video

// In order to make sure code working, I didn't change code from the pliers part, for example catchAnimal function(line 42- 51)
// Also didn't change all the stuffs about sin and cos part, for example: line 86,87

// The animal image from here：https://zh.pngtree.com/freepng/cartoon-animal-lion-king_3727158.html
