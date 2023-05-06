let minLength = 10;
let maxLength = 250;
let length = minLength;
let lineGrowing = true;
let angle = 0;
let speed = 0.01;

function draw() {
  background(255, 255, 255);

  let x = 325;
  let y = 215;
  let x2 = 0;
  let y2 = 0;
  if (angle > PI || angle < 0) {
    speed = speed * -1;
  }

  angle = angle + speed;

  x2 = cos(angle) * length;
  y2 = sin(angle) * length;

  strokeWeight(3);
  line(x, y, x + x2, y + y2);

  if (lineGrowing) {
    length = length + 2;
    if (length >= maxLength) {
      lineGrowing = false;
    }
  } else {
    length = length - 2;
    if (length <= minLength) {
      lineGrowing = true;
    }
  }
}
