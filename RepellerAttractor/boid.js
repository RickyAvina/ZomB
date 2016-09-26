function Boid() {
	this.radius = 20;
	this.force = createVector(0,0);
	this.force2 = createVector(0,0);
	this.acc = createVector(random(.1, .9), random(-.9, .1));
	this.vel = createVector(random(-3, 3), random(-3, 3));
	this.loc = createVector(random(150 + this.radius, width - 10 - this.radius), random(10 + this.radius, height - 60 - this.radius));

	this.render = function() {
		push();
		noStroke();
		fill(100, 150, 0);
		ellipse(this.loc.x, this.loc.y, this.radius, this.radius);
		pop();

	}

	this.update = function(force) {
		this.force = force;
		this.force2 = force;

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
		this.loc.add(this.vel);
		this.acc.mult(0);
		//bounce off walls
		this.checkEdges = function() {
			if (this.loc.x > width - 10 - this.radius || this.loc.x < 150 + this.radius) this.vel.x *= -1;
			if (this.loc.y > height - 60 - this.radius || this.loc.y < 10 ) this.vel.y *= -1;
		}
	}
}
