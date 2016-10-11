function Attractor() {
  this.force = createVector(random(.03), random(.03));
	this.rad  = 30;
	this.acc = createVector(random(.3), random(.3));
	this.vel = createVector(random(-3, 3), random(-3, 3));
	this.loc = createVector(random(150 + this.radius, width - 10 - this.radius), random(10 + this.radius, height - 60 - this.radius));
  this.color = color(255);
}

Attractor.prototype.run = function() {
	this.update(this.force);// default = (0,0)
	this.checkEdges();
	this.render();
}

Attractor.prototype.applyForce = function (f) {
		this.acc.add(f);
}

Attractor.prototype.render = function() {
  push();
  	  strokeWeight(4);
      fill(this.color);
  		stroke(20);
  		ellipse(this.loc.x, this.loc.y, this.rad, this.rad);
  	pop();
}

Attractor.prototype.update = function(force) {
	//setTimeout(changeAttractorAcc, 500);
  this.getInput();
	// this.force = force;
	// this.applyForce(force);
	// this.vel.add(this.acc);
	// this.vel.limit(1);
	// this.loc.add(this.vel);
}

Attractor.prototype.checkEdges = function() {
	if (this.loc.x > width - this.rad) this.loc.x = 150 + this.rad/2;
	if (this.loc.x < 150 + this.rad/2) this.loc.x = width - this.rad/2 - 10;
	if (this.loc.y > height - this.rad) this.loc.y = this.rad;
	if (this.loc.y <  this.rad) this.loc.y = height - this.rad;
}

Attractor.prototype.getInput = function(){
  if(keyIsDown(65)){
    this.loc.x -= 5;
  }
  if(keyIsDown(68)){
    this.loc.x += 5;
  }
  if(keyIsDown(83)){
    this.loc.y += 5;
  }
  if(keyIsDown(87)){
    this.loc.y -= 5;
  }
}
