var cnv;

var w = window.innerWidth *0.8;
var h = window.innerHeight *0.8;

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

var time;
var wait = 600;
var reload = false;

var pickUp;

var bulletTypes = [0,1,2];
var b;

var s;
var a;
var c;

s = 0.01;
a = 0.01;
c = 0.01;

function setup() {
	cnv = createCanvas(windowWidth,windowHeight);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
	fill(200, 200, 0);

	b = 0;
	//attractor = new Mover(false);
	Repeller.prototype = new Mover();
	Boid.prototype = new Mover();
	Attractor.prototype = new Mover();
	//Boid.prototype.constructor = Boid;
	r1 = new Repeller();
	b1 = new Boid(); // this must come after inherittance to receive
	a1 = new Attractor();

	// pickUps.push(new PickUp());
	pickUp = new PickUp();

	loadBoids();
	time = millis();
}

function draw() {
	background(180);
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

	pickUp.run();

	for (var i = 0; i < boids.length; i++) {
		boids[i].run();
	}
	for (var i = 0; i < attractors.length; i++) {
		attractors[i].run();
		//a1.run();
	}
	for (var i = 0; i < repellers.length; i++) {
		//	repellers[i].run();
		//r1.run();
	}

	for (var i = 0; i < bullets.length; i++){
		bullets[i].run();
	}

	if (reload === true){
		if (millis() - time >= wait){
			reload = false;
			time = millis();
		}
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

	var bulletType = bulletTypes[b];

	if (reload === false){
		bullets.push(new Bullet(mouseX, mouseY, bulletType));
		reload = true;
	}
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

window.onresize = function() {
	cnv.size(window.innerWidth, window.innerHeight);
	for (var i = 0; i < boids.length; i++){
			boids[i].loc = createVector(random(150 + boids[i].radius, width - 10 - boids[i].radius), random(10 + boids[i].radius, height - 60 - boids[i].radius));
	}
}
