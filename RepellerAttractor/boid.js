function Boid() {
	this.radius = 20;
	this.force = createVector(0,0);
	this.force2 = createVector(0,0);
	this.acc = createVector(random(.1, .9), random(-.9, .1));
	this.vel = p5.Vector.random2D();
	this.loc = createVector(random(150 + this.radius, width - 10 - this.radius), random(10 + this.radius, height - 60 - this.radius));
	this.maxSpeed = 3;    // Maximum speed
	this.maxForce = 0.05; // Maximum steering force

  this.run = function(boids) {
		this.flock(boids);
		this.update();
		this.checkEdges();
		this.render();
	}

	this.render = function() {
		push();
		noStroke();
		fill(100, 150, 0);
		ellipse(this.loc.x, this.loc.y, this.radius, this.radius);
		pop();
	}

	this.update = function() {
		//this.force = force;
	//	this.force2 = force;

		this.fear = random(100, 200);
		this.force = p5.Vector.sub(this.loc,r1.loc);
		this.force2 = p5.Vector.sub(this.loc,a1.loc);
		this.force.normalize();
		this.force.mult(.1);
		this.force2.normalize();
		this.force2.mult(.1);

		for (var i = 0; i < repellers.length; i++){
			if(this.loc.dist(repellers[i].loc) < 50){
				this.applyForce(this.force);
				this.vel.add(this.force);
				this.vel.limit(random(3,6));
			} else if(this.loc.dist(repellers[i].loc) < 90){
				this.applyForce(this.force);
				this.vel.add(this.force);
				this.vel.limit(random(1,2));
			}
			else if(this.loc.dist(attractors[i].loc) < 300){
				this.applyForce(this.force2);
				this.vel.add(this.force2.mult(state));
				this.vel.limit(random(2.1, 3.4));
			} else if(this.loc.dist(attractors[i].loc) < 500){
				this.applyForce(this.force2);
				this.vel.add(this.force2.mult(state));
				this.vel.limit(random(0.5, 1.2));
			}else{
				//this.vel.add(this.force);
				this.vel.limit(1);
			}
		}

  //  console.log(boids[0].acc);
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.loc.add(this.vel);
		this.acc.mult(0);
		//bounce off walls
		this.checkEdges = function() {
			if (this.loc.x > width - 10 - this.radius || this.loc.x < 150 + this.radius) this.vel.x *= -1;
			if (this.loc.y > height - 10 - this.radius/2 || this.loc.y < this.radius) this.vel.y *= -1;
		}
	}

	// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
this.seek = function(target) {
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxSpeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce); // Limit to maximum steering force

//	console.log(steer);

  return steer;
}

	this.flock = function(boids) {
		var sep = this.separate(boids); // Separation
		var ali = this.align(boids);    // Alignment
		var coh = this.cohesion(boids); // Cohesion
		// Use sliders weight these forces

		sep.mult(s);
		ali.mult(a);
		coh.mult(c);

	//	console.log(sep);
		// Add the force vectors to acceleration
		this.applyForce(sep);
		this.applyForce(ali);
		this.applyForce(coh);
	}

	// Separation
	// Method checks for nearby boids and steers away
	this.separate = function(boids) {
		var desiredseparation = 55.0;
		var steer = createVector(0, 0);
		var count = 0;
		// For every boid in the system, check if it's too close
		for (var i = 0; i < boids.length; i++) {
			var d = p5.Vector.dist(this.loc, boids[i].loc);
		//	console.log(d);
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
			// Implement Reynolds: Steering = Desired - Velocity
			steer.normalize();
			steer.mult(this.maxSpeed);
		//	console.log(steer);

			steer.sub(this.vel);
			steer.limit(this.maxForce);
		}
		return steer;
	}

	// Alignment
	// For every nearby boid in the system, calculate the average vel
	this.align = function(boids) {
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
		//	console.log(steer);

			return steer;

		} else {
			return createVector(0, 0);
		}

	}

	// Cohesion
	// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
	this.cohesion = function(boids) {
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
}
