background(255, 255, 255);

//land
push();
noStroke();
fill(139, 69, 19);
rect(0, 200, width, height);

//humam
fill(47, 79, 79);
ellipse(325, 200, 30, 30);
pop();

// strokeWeight(3);
// line(325, 215, 325, 280);

let minLength = 50;
let maxLength = 150;

let length = random(minLength, maxLength);

strokeWeight(3);
line(325, 215, 325, 215 + length);

function mousePress() {
  strokeWeight(3);
  line(325, 215, 325, 215 + length);
}
