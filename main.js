const ropeElement = document.getElementById("rope");

let degree = 20;
let increaseRotation = true;
let length = 0;
let thrower = false;

let height = 450; //underground height
let width = 1292;
let imgSize = [
  [232, 210],
  [232, 175],
  [237, 177],
  [180, 231],
  [184, 159],
  [169, 165],
];
let animals = new Array();

function randomNum(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}
function checkAnimalOverlapp(x, y, width, height) {
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

    while (checkAnimalOverlapp(left, top, imgSize[i][0], imgSize[i][1])) {
      top = randomNum(280, 450 + 280 - imgSize[i][1]);
      left = randomNum(10, width - imgSize[i][0]);
    }

    animals.push({
      x: left,
      y: top,
      width: imgSize[i][0],
      height: imgSize[i][1],
    }); //create the animals to new array

    const img = document.createElement("img");
    img.src = i + ".png";
    img.className = "animal";

    // Set the "top" and "left" CSS properties using inline styles
    img.style.top = top + "px";
    img.style.left = left + "px";

    // Append the image element to the container
    document.getElementById("container").appendChild(img);
  }
}

createAnimal();

function animateRotation() {
  if (thrower == false) {
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
  } else {
    ropeElement.style.top =
      Math.sin((Math.PI / 180) * degree) * length + 167 + "px";
    ropeElement.style.left =
      Math.cos((Math.PI / 180) * degree) * length + 670 + "px";
    length += 10;
  }
  ropeElement.style.transform = "rotate(" + degree + "deg)";
}

addEventListener("keypress", (event) => {
  if (event.code === "Space") {
    thrower = true;
  }
});

setInterval(animateRotation, 20);
