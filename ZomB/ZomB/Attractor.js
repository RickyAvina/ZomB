function Attractor(x, y, isSpecial) {
  this.force = createVector(random(.03), random(.03));
  this.special = isSpecial;
  this.rad  = 30;
  this.acc = createVector(0,0);
  this.vel = createVector(0,0);
  this.loc = createVector(x,y);
  if (isSpecial === true){
    this.color = color(200, 40, 255);
  } else {
    this.color = color(20, 240, 220);
  }
  this.maxSpeed = 2;
  this.keys = [false, false, false, false];      // left, right, up, down
  this.isHit = false;
}

Attractor.prototype.run = function() {
  this.update(this.force);// default = (0,0)
  this.checkEdges();

  if (this.special == false){
     this.getInput();
     this.render();
     this.repel();
   }
}

Attractor.prototype.applyForce = function (f) {
  this.acc.add(f);
}

Attractor.prototype.render = function() {
  push();
  strokeWeight(0);
  fill(this.color);
  stroke(20);
  ellipse(this.loc.x, this.loc.y, this.rad, this.rad);
  pop();
}

Attractor.prototype.update = function(force) {
  this.vel.add(this.acc);
  this.vel.limit(7);
  this.loc.add(this.vel);
  this.acc.mult(0);
}

Attractor.prototype.checkEdges = function() {

   if (this.loc.x > width - this.rad + 2) this.loc.x = width-this.rad + 2;
   if (this.loc.x < 138 + this.rad) this.loc.x = 138 + this.rad;
   if (this.loc.y > height - this.rad + 2) this.loc.y = height - this.rad + 2;
   if (this.loc.y < this.rad - 2) this.loc.y = this.rad - 2;
}

Attractor.prototype.getInput = function(read){
  var easing = 0.8;

  var targetX = mouseX;
  var dx = targetX - this.loc.x;

  var targetY = mouseY;
  var dy = targetY - this.loc.y;

  this.applyForce(createVector(easing*dx, easing*dy));
}

Attractor.prototype.repel = function(){
  for (var i = 0; i < repellers.length; i++){
    var force = p5.Vector.sub(this.loc, repellers[i].loc);
    force.normalize();

    force.mult(200);

    if (this.loc.dist(repellers[i].loc) < 20){
      this.applyForce(force);
      this.vel.add(this.force);
      this.vel.limit(700);
    }
  }
}
