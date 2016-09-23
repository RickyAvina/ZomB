var mover;
var boids = [];
var numBoids = 50;

var attractors = [];
var numAtt = 1;

var repellers = [];
var numRep = 1;

var bullet;
var bullets = [];

var state = -1;
var g = 1;
var w = window.innerWidth *0.8;
var h = window.innerHeight *0.8;


function setup() {
	var cnv = createCanvas(w, h);
	var x = (windowWidth - width)/2;
	var y = (windowHeight - height)/2;
	cnv.position(x, y);
	fill(200, 200, 0);

	Repeller.prototype = new Mover();
	Boid.prototype = new Mover();
	Attractor.prototype = new Mover();

	r1 = new Repeller();
	b1 = new Boid();
	a1 = new Attractor();

	loadBoids();
}

function draw() {
	background(180);
	push();
	noStroke();
	fill(255, 51, 51);
	rect(0, height - 60, width, 60);
	rect(0, 0, width, 10);
	rect(width - 10, 0, 10, height);
	rect(0, 0, 150, height);
	pop();
	fill(80);
	strokeWeight(4);
	rect(150, 10, width - 160, height - 70);

	for (var i = 0; i < boids.length; i++) {
		boids[i].run();
	}
	for (var i = 0; i < attractors.length; i++) {
		attractors[i].run();
	}
	for (var i = 0; i < repellers.length; i++) {
		repellers[i].run();
	}

	for (var i = 0; i < bullets.length; i++){
			bullets[i].run();
	}
}

function changeReppelrForce() {
	r1.force = createVector(random(-1, 1), random(-1, 1));
}
setInterval(changeReppelrForce, 1000);

function loadBoids() {
	for (var i = 0; i < numBoids; i++) {
		boids.push(new Boid());
	}
	for (var i = 0; i < numAtt; i++) {
		attractors.push(new Attractor());
	}
	for (var i = 0; i < numRep; i++) {
		repellers.push(new Repeller());
	}

}

function mousePressed() {
	bullets.push(new Bullet(mouseX, mouseY));
}

function keyPressed(){
	if (keyCode == 32) {
		state *= -1;

		if (g === 1){
			attractors[0].color = color(255,0,0);
		} else {
			attractors[0].color = color(255);
		}
		g *= -1;
	}
}
