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
    this.color = color(255, 0, 0);
  }
  this.maxSpeed = 2;
  this.keys = [false, false, false, false];      // left, right, up, down
  this.isHit = false;
}

Attractor.prototype.run = function() {
  this.update(this.force);// default = (0,0)
  this.checkEdges();

  if (this.special == false) this.getInput();
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
  var lefts = [];
  var rights = [];
  var ups = [];
  var downs = [];

  for (var i = 0; i < walls.length; i++){
    lefts.push(collidePointLine(this.loc.x-this.rad/2, this.loc.y, walls[i][0].x, walls[i][0].y, walls[i][1].x, walls[i][1].y));
    rights.push(collidePointLine(this.loc.x+this.rad/2, this.loc.y, walls[i][0].x, walls[i][0].y, walls[i][1].x, walls[i][1].y));
    ups.push(collidePointLine(this.loc.x, this.loc.y-this.rad/2, walls[i][0].x, walls[i][0].y, walls[i][1].x, walls[i][1].y));
    downs.push(collidePointLine(this.loc.x, this.loc.y+this.rad/2, walls[i][0].x, walls[i][0].y, walls[i][1].x, walls[i][1].y));
  }

  for (var i = 0; i < lefts.length; i++) {
    if (lefts[i] == true){
      this.keys[0] = true;
      break;
    } else {
      this.keys[0] = false;
    }
  }

  for (var i = 0; i < rights.length; i++) {
    if (rights[i] == true){
      this.keys[1] = true;
      break;
    } else {
      this.keys[1] = false;
    }
  }

  for (var i = 0; i < ups.length; i++) {
    if (ups[i] == true){
      this.keys[2] = true;
      break;
    } else {
      this.keys[2] = false;
    }
  }

  for (var i = 0; i < downs.length; i++) {
    if (downs[i] == true){
      this.keys[3] = true;
      break;
    } else {
      this.keys[3] = false;
    }
  }

  if (keyIsDown(65)){  // left
    if (this.keys[0]==true){
      this.vel.mult(0);
    } else {
      this.vel.mult(0.7);
      this.applyForce(createVector(-1.9,0));
    }
  }

  if (keyIsDown(68)){  // right
    if (this.keys[1]==true){
      this.vel.mult(0);
    } else {
      this.vel.mult(0.7);
      this.applyForce(createVector(1.9,0));
    }
  }

  if (keyIsDown(87)){  // up
    if (this.keys[2]==true){
      this.vel.mult(0);
    } else {
      this.vel.mult(0.7);
      this.applyForce(createVector(0, -1.9));
    }
  }

  if (keyIsDown(83)){  // down
    if (this.keys[3]==true){
      this.vel.mult(0);
    } else {
      this.vel.mult(0.7);
      this.applyForce(createVector(0, 1.9));
    }
  }

  if (!keyIsDown(65) && !keyIsDown(68) && !keyIsDown(83) && !keyIsDown(87)){
    this.vel.mult(0.9);
  }
}
