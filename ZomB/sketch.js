var cnv;

var player;
var boids = [];

var bullets = [];
var time;
var wait = 600;
var reload = false;

var s = 8;
var a = 1.2;
var c = 3.55;

var walls = [];

function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  var x  = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  fill(200, 200, 0);

  loadElements();
  time = millis();
}

function draw() {
  background(180);
  drawSetting();
  runElements();
  checkReload();
};

function loadElements(){
  player = new Attractor();

  for (var i = 0; i < 15; i++) boids.push(new Boid(0));
  for (var i = 0; i < 15; i++) boids.push(new Boid(1));

  walls.push([createVector(300, 100), createVector(300, 300)]);     // [topLeft, bottomRight]
  walls.push([createVector(300, 100), createVector(500, 100)]);
  walls.push([createVector(300, 300), createVector(500, 300)]);
  walls.push([createVector(150, 480), createVector(500, 480)]);

  walls.push([createVector(width-70, 10), createVector(width-70, 80)]);
/// walls.push([createVector(150, 480), createVector(500, 480)]);
//  walls.push([createVector(150, 480), createVector(500, 480)]);
}

function runElements(){
  player.run();
  for (var i = 0; i < boids.length; i++) boids[i].run(boids);
  for (var i = 0; i < bullets.length; i++) bullets[i].run();
}

function checkReload(){
  if (reload === true){
		if (millis() - time >= wait){
			reload = false;
			time = millis();
		}
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
  strokeWeight(4);
  fill(0);

  for (var i = 0; i < walls.length; i++){
    line(walls[i][0].x, walls[i][0].y, walls[i][1].x, walls[i][1].y);
  }
}

function mousePressed() {

	if (reload === false){
		bullets.push(new Bullet(mouseX, mouseY, 1));
		reload = true;
	}
}

window.onresize = function() {
  cnv.size(window.innerWidth, window.innerHeight);
}
