function Repeller(x, y) {
  this.force = createVector(random(.03), random(.03));
  this.rad  = 5;

  this.loc = createVector(x,y);
}

Repeller.prototype.run = function() {
//  this.render();
}

Repeller.prototype.applyForce = function (f) {
  this.acc.add(f);
}

Repeller.prototype.render = function() {
  push();
  strokeWeight(0);
  fill(255, 0, 0);
  stroke(20);
  ellipse(this.loc.x, this.loc.y, this.rad, this.rad);
  pop();
}
