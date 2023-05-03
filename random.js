let minLength = 10;
let maxLength = 150;
let length = random(minLength, maxLength);

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
}

function mousePressed() {
  length = random(minLength, maxLength);
}
