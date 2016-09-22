function Boid() {
	this.force = createVector(0,0);
	this.force2 = createVector(0,0);
	this.acc = createVector(random(.1, .9), random(-.9, .1));
	this.vel = createVector(random(-3, 3), random(-3, 3));
	this.loc = createVector(random(width), random(height));
	this.radius = 20;

	this.render = function() {
		push();
  		fill(55, 80, 250);
  		ellipse(this.loc.x, this.loc.y, this.radius, this.radius);
		pop();
		push();
  		fill(255, 100, 0);
  		noStroke();
  		ellipse(this.loc.x, this.loc.y, 10, 10);
  	pop();

	}

	this.update = function(force) {
		this.force = force; // Incase we want to send f
		this.force2 = force; // Incase we want to send f

		this.fear = random(100, 200);
		//calc force vector
		this.force = p5.Vector.sub(this.loc,r1.loc);
		this.force2 = p5.Vector.sub(this.loc,a1.loc);
		this.force.normalize();
		this.force.mult(.1);
		this.force2.normalize();
		this.force2.mult(.1);
		// If in range of r1--run for your life!

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
	  else if(this.loc.dist(attractors[i].loc) < 150){
			this.applyForce(this.force2);
			this.vel.add(this.force2.mult(state));
			this.vel.limit(random(3,6));
		} else if(this.loc.dist(attractors[i].loc) < 200){
			this.applyForce(this.force2);
			this.vel.add(this.force2.mult(state));
			this.vel.limit(random(1,2));
		}else{
			//this.vel.add(this.force);
			this.vel.limit(1);
		}
	}
		this.loc.add(this.vel);
		this.acc.mult(0);
	//bounce off walls
	this.checkEdges = function() {
		if (this.loc.x > width || this.loc.x < 0) this.vel.x *= -1;
		if (this.loc.y > height || this.loc.y < 0) this.vel.y *= -1;
	}
}
}
