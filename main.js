let degree = 20;
let direction = 1; // positive number to left, negative to right
let height = 450;
let width = 1200;
let animals = [];
let ropeLength = 90;
const imageSize = 100;
const animalNumbers = 5;

const rope = document.querySelector("#rope");

let timer;

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
  for (let i = 0; i < animalNumbers + 1; i++) {
    let left = randomNum(10, width - imageSize);
    let top = randomNum(280, 600 - imageSize);

    while (isOverlap(left, top)) {
      left = randomNum(10, width - imageSize);
      top = randomNum(280, 600 - imageSize);
    }
    const img = document.createElement("img");
    img.src = i + ".png";
    img.classList.add("animal");
    animals.push([left, top]);
    img.style.top = top + "px";
    img.style.left = left + "px";
    document.querySelector("#container").appendChild(img);
  }
}

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
}

function lengthen(maxMumLength) {
  ropeLength += 3;
  if (ropeLength >= maxMumLength) {
    clearInterval(timer);
    timer = setInterval("shorten()", 20);
    return;
  }
  rope.style.width = ropeLength + "px";

  let pliers = document.querySelector("#pliers");
  let left = getOffset(pliers).left - 30 * Math.sin((degree * Math.PI) / 180);
  let top = getOffset(pliers).top + 5;

  for (let i = 0; i < animals.length; i++) {
    if (
      left > animals[i][0] &&
      left < animals[i][0] + imageSize &&
      top > animals[i][1] &&
      top < animals[i][1] + imageSize
    ) {
      clearInterval(timer);
      timer = setInterval("shorten(" + i + ")", 20);
      addScore();
      return;
    }
  }
}

function getOffset(element) {
  let rect = element.getBoundingClientRect();
  let scrollLeft = document.documentElement.scrollLeft;
  let scrollTop = document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
} // confused about this part

function addScore() {
  let score = document.querySelector("#score");
  let scoreNow = parseInt(score.innerHTML);
  scoreNow += 1;
  score.innerHTML = scoreNow;
} // parseInt? transform to the integer

function shorten(index) {
  ropeLength -= 3;
  let animalItem = document.querySelectorAll(".animal");

  if (ropeLength <= 90) {
    clearInterval(timer);
    if (index >= 0) {
      animalItem[index].style.display = "none";
      animals[index] = [9999, 9999];
    }
    timer = setInterval("swing()", 20);
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
  timer = setInterval("lengthen(" + r + ")", 20);
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 32:
        catchAnimal();
        break;
    }
  });
  createAnimal();
  timer = setInterval(swing, 20);
});
