function Attractor() {
  this.force = createVector(random(.03), random(.03));
  this.rad  = 30;
  this.acc = createVector(0,0);
  this.vel = createVector(0,0);
  this.loc = createVector(random(150 + this.radius, width - 10 - this.radius), random(10 + this.radius, height - 60 - this.radius));
  this.color = color(255);
  this.maxSpeed = 2;
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
  this.getInput();
  this.vel.add(this.acc);
  this.vel.limit(10);
  this.loc.add(this.vel);
  this.acc.mult(0);
}

Attractor.prototype.checkEdges = function() {
  if (this.loc.x > width - this.rad) this.loc.x = 150 + this.rad/2;
  if (this.loc.x < 150 + this.rad/2) this.loc.x = width - this.rad/2 - 10;
  if (this.loc.y > height - this.rad) this.loc.y = this.rad;
  if (this.loc.y <  this.rad) this.loc.y = height - this.rad;
}

Attractor.prototype.getInput = function(read){
  if(keyIsDown(65)){ // left
    if (keyIsDown(83) || keyIsDown(87)){
      this.vel.mult(0.85);
      this.applyForce(createVector(-1.9,0));
    } else {
    this.vel.mult(0.7);
    this.applyForce(createVector(-1.9,0));
  }
  }

  if(keyIsDown(68)){ // right
    if (keyIsDown(83) || keyIsDown(87)){
      this.vel.mult(0.8);
      this.applyForce(createVector(1.9,0));
    } else {
      this.vel.mult(0.7);
      this.applyForce(createVector(1.9,0));
    }
}

if(keyIsDown(83)){ // up
  this.vel.mult(0.7);
  this.applyForce(createVector(0,1.9));
}
if(keyIsDown(87)){  // down
  this.vel.mult(0.7);
  this.applyForce(createVector(0,-1.9));
}

if (!keyIsDown(65) && !keyIsDown(68) && !keyIsDown(83) && !keyIsDown(87)){
  this.vel.mult(0.9);
  print("acc: " + this.acc);
}
}
