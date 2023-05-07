const ropeElement = document.getElementById("rope");
const pliersElement = document.getElementById("pliers");

let degree = 20;
let increaseRotation = true;

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
  pliersElement.style.transform = "rotate(" + +"deg)";
}

setInterval(animateRotation, 20);
