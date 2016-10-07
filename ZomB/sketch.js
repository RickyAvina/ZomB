var cnv;

var boids = [];

var s = 4.70;
var a = 1.2;
var c = 3.55;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  var x  = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  fill(200, 200, 0);

  loadElements();
}

function draw() {
  background(180);
  drawSetting();
  runElements();
};

function loadElements(){
  for (var i = 0; i < 30; i++){
    boids.push(new Boid(width/2, height/2));
  }
}

function runElements(){
  for (var i = 0; i < boids.length; i++){
    boids[i].run(boids);
  }
}

function drawSetting(){
  // border
  push();
  noStroke();
  fill(255, 51, 51);
  rect(0, height - 60, width, 70);
  rect(0, 0, width, 10);
  rect(width - 10, 0, 10, height);
  rect(0, 0, 150, height);
  pop();
  fill(80);
  strokeWeight(4);
  rect(150, 10, width - 160, height - 20);
  // end border
  push();
  noStroke();
  fill(122, 89, 250);
  ellipse(width/2 + 100, height - 70, 300, 100);				// base 1
  ellipse(width/2 + 100,  70, 300, 100);				// base 1
  pop();
}

window.onresize = function() {
  cnv.size(window.innerWidth, window.innerHeight);
}
