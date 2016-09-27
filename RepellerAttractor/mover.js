function Mover() {
 this.force = createVector(random(.03), random(.03));
	this.rad  = 30;
	this.acc = createVector(random(.3), random(.3));
	this.vel = createVector(random(-3, 3), random(-3, 3));
	this.loc = createVector(random(width), random(height));
	this.clr = 150;
}

Mover.prototype.run = function() {
	this.update(this.force);
	this.checkEdges();
	this.render();
}

Mover.prototype.applyForce = function (f) {
		this.acc.add(f);
}

Mover.prototype.render = function() {
	push();
	  strokeWeight(4);
    fill(20, 20,20);
		stroke(255, 255, 255);
		ellipse(this.loc.x, this.loc.y, this.rad, this.rad);
	pop();
}

Mover.prototype.update = function(force) {
	this.force = force;
	this.applyForce(force);
	this.vel.add(this.acc);
	this.vel.limit(1);
	this.loc.add(this.vel);
}

Mover.prototype.checkEdges = function() {
  if (this.loc.x > width - 10 - this.rad) this.loc.x = 150 + this.rad;
	if (this.loc.x < 150 + this.rad) this.loc.x = width - 10 - this.rad;
	if (this.loc.y > height - 60 - this.rad) this.loc.y = 10 + this.rad;
	if (this.loc.y < 10 + this.rad) this.loc.y = height - 60 - this.rad;
}
