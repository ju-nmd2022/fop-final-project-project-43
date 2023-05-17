const ropeElement = document.getElementById("rope");

let degree = 20;
let increaseRotation = true;
let length = 0;

let height = 450; // underground height
let width = 1292;
let imgSize = [
  [232, 210],
  [232, 175],
  [237, 177],
  [180, 231],
  [184, 159],
  [169, 165],
];
let animals = [];

let ropeLength = 90;
let timer;

function randomNum(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

function checkAnimalOverlap(x, y, width, height) {
  for (let i = 0; i < animals.length; i++) {
    if (
      x + width > animals[i].x &&
      x < animals[i].x + animals[i].width &&
      y + height > animals[i].y &&
      y < animals[i].y + animals[i].height
    )
      return true;
  }
  return false;
}

function createAnimal() {
  for (let i = 0; i < imgSize.length; i++) {
    let top = randomNum(280, 450 + 280 - imgSize[i][1]);
    let left = randomNum(10, width - imgSize[i][0]);

    while (checkAnimalOverlap(left, top, imgSize[i][0], imgSize[i][1])) {
      top = randomNum(280, 450 + 280 - imgSize[i][1]);
      left = randomNum(10, width - imgSize[i][0]);
    }

    animals.push({
      x: left,
      y: top,
      width: imgSize[i][0],
      height: imgSize[i][1],
    });

    const img = document.createElement("img");
    img.src = i + ".png";
    img.className = "animal";
    img.style.top = top + "px";
    img.style.left = left + "px";
    document.getElementById("container").appendChild(img);
  }
}

createAnimal();

function animateRotation() {
  if (increaseRotation) {
    degree += 1;
    if (degree >= 160) {
      increaseRotation = false;
    }
  } else {
    degree -= 1;
    if (degree <= 20) {
      increaseRotation = true;
    }
  }

  ropeElement.style.transform = "rotate(" + degree + "deg)";
}

// setInterval(animateRotation, 20);

timer = setInterval(function () {
  animateRotation();
}, 20);

// Lengthen rope
function lengthen(maxLength) {
  ropeLength += 3;
  if (ropeLength >= maxLength) {
    clearInterval(timer);
    timer = setInterval(function () {
      shorten();
    }, 20);
    return;
  }

  const ropeElement = document.getElementById("rope");
  ropeElement.style.width = ropeLength + "px";

  const pliers = document.getElementById("pliers");
  const left = pliers.offsetLeft + 35 * Math.sin((degree * Math.PI) / 180);
  const top = pliers.offsetTop + 5;

  for (let i = 0; i < animals.length; i++) {
    if (
      left > animals[i].x &&
      left < animals[i].x + animals[i].width &&
      top > animals[i].y &&
      top < animals[i].y + animals[i].height
    ) {
      clearInterval(timer);
      timer = setInterval(function () {
        shorten(i);
      }, 20);
      return;
    }
  }
}

// Shorten rope
function shorten(index) {
  ropeLength -= 3;
  if (ropeLength <= 90) {
    clearInterval(timer);
    if (index >= 0) {
      const animalElement = document.getElementsByClassName("animal")[index];
      animalElement.style.display = "none";
      animals[index] = { x: 9999, y: 9999, width: 0, height: 0 };
    }
    timer = setInterval(function () {
      swing();
    }, 20);
    return;
  }

  if (index >= 0) {
    const pliers = document.getElementById("pliers");
    const left =
      pliers.offsetLeft +
      (35 - animals[index].width / 2) * Math.sin((degree * Math.PI) / 180);
    const top = pliers.offsetTop + 5;

    const animalElement = document.getElementsByClassName("animal")[index];
    animalElement.style.top = top + "px";
    animalElement.style.left = left + "px";
  }
  document.getElementById("rope").style.width = ropeLength + "px";
}

// Tpo limited the rope's growing
function catchAnimal() {
  clearInterval(timer);
  let arc = (degree * Math.PI) / 180;
  let r = height / Math.sin(arc);
  let len = Math.abs(width / Math.cos(arc));
  if (r > len) {
    r = len;
  }

  timer = setInterval(function () {
    lengthen(r);
  }, 20);
}

document.addEventListener("keypress", function (event) {
  if (event.code === "Space") {
    catchAnimal();
  }
});
