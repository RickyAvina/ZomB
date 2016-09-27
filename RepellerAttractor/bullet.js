function Bullet(x, y, bulletType) {
  this.loc = createVector(a1.loc.x, a1.loc.y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
   this.rad = 10;
  this.force = createVector(5.0, 0);
  this.reloadSpeed = 0;
  var mouse = createVector(x, y);
  this.force = p5.Vector.sub(mouse, a1.loc);

  this.force.normalize();

  if (bulletType === 0){
    this.rad = 10;
  } else if (bulletType === 1){
    this.rad = 100;
  } else if (bulletType === 2){
    this.rad = height;
  } else {
    this.rad = 15;
  }
}

  Bullet.prototype.run = function() {
  	this.update(this.force);   // default = (0,0)
  	this.render();
  }

  Bullet.prototype.applyForce = function (f) {
  		this.acc.add(f);
  }

  Bullet.prototype.render = function() {
  	  //strokeWeight(4);
      noStroke();
      fill(255,120,240);
  		//stroke(255, 255, 255);
  		ellipse(this.loc.x, this.loc.y, this.rad, this.rad);
      stroke(0);
  }

  Bullet.prototype.update = function(force) {
  	this.force = force;
  	this.applyForce(force);
  	this.vel.add(this.acc);
  	this.vel.limit(20);
  	this.loc.add(this.vel);

    this.death();
  }

  Bullet.prototype.death = function(){
    for (var i = 0; i < boids.length; i++){
      if(this.loc.dist(boids[i].loc) <= 10 + this.rad/2){
        boids.splice(i, 1);
      }
    }
  }
