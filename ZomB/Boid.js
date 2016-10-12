function Boid(x, y) {
  this.acc = createVector(0, 0);
  this.vel = p5.Vector.random2D();
  this.loc = createVector(x, y);
  this.radius = 10;
  this.maxSpeed = 3;    // Maximum speed
  this.maxForce = 0.05; // Maximum steering force
}

function Boid(){
  this.acc = createVector(0, 0);
  this.vel = p5.Vector.random2D();
  this.radius = 15;
  this.loc = createVector(random(150 + this.radius, width - 10 - this.radius), random(10 + this.radius, height - 60 - this.radius));
  this.maxSpeed = 3;    // Maximum speed
  this.maxForce = 0.05; // Maximum steering force
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

// Forces go into acc
Boid.prototype.applyForce = function(force) {
  this.acc.add(force);
}

// We accumulate a new acc each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids); // Separation
  var ali = this.align(boids);    // Alignment
  var coh = this.cohesion(boids); // Cohesion
  // Use sliders weight these forces

  sep.mult(s);
  ali.mult(a);
  coh.mult(c);
  // Add the force vectors to acc
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  this.repel();
  this.vel.add(this.acc);
  //this.vel.limit(this.maxSpeed);
  this.loc.add(this.vel);
  this.acc.mult(0);
}

Boid.prototype.repel = function(){
  var force = p5.Vector.sub(this.loc, player.loc);
  force.normalize();
  force.mult(-0.6);

  if (this.loc.dist(player.loc) < 700){
    this.applyForce(force);
    this.vel.add(this.force);
    this.vel.limit(random(2, 3));
}
  // } else if {
  //     console.log("OUT OF RANGE");
  //     this.applyForce(force*0.6);
  //     this.vel.add(force);
  //   //  constrain(this.vel, 0.1, random(0.1, 0.8));
  // }
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS vel
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.loc); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxSpeed);
  // Steering = Desired minus vel
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce); // Limit to maximum steering force
  return steer;
}

// Draw boid as a circle
Boid.prototype.render = function() {
  push();
  noStroke();
  fill(100, 150, 0);
  ellipse(this.loc.x, this.loc.y, this.radius*2, this.radius*2);
  pop();
}

Boid.prototype.borders = function() {
  if ((this.loc.x - 154 < this.radius) || (this.loc.x + 10 > width-this.radius)) this.vel.x *= -0.9;
  if ((this.loc.y - 10 < this.radius) || (this.loc.y + 10 > height-this.radius-1)) this.vel.y*= -0.9;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 55.0;
  var steer = createVector(0, 0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.loc, boids[i].loc);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.loc, boids[i].loc);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - vel
    steer.normalize();
    steer.mult(this.maxSpeed);
    steer.sub(this.vel);
    steer.limit(this.maxForce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average vel
Boid.prototype.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.loc, boids[i].loc);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].vel);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxSpeed);
    var steer = p5.Vector.sub(sum, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.loc, boids[i].loc);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].loc); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}
