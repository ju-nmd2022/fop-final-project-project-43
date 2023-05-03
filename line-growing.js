let minLength = 10;
let maxLength = 250;
let length = minLength;
let lineGrowing = true;

function draw() {
  background(255, 255, 255);
  push();
  noStroke();
  fill(139, 69, 19);
  rect(0, 200, width, height);
  fill(47, 79, 79);
  ellipse(325, 200, 30, 30);
  pop();

  strokeWeight(3);
  line(325, 215, 325, 215 + length);

  //these code below can use to when catching the fat animals
  //let the speed be slower
  if (lineGrowing) {
    length = length + 3;
    if (length >= maxLength) {
      lineGrowing = false;
    }
  } else {
    length = length - 1;
    if (length <= minLength) {
      lineGrowing = true;
    }
  }
}
