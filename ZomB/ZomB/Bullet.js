function Bullet(x, y, bulletType) {
  this.loc = createVector(player.loc.x, player.loc.y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.rad = 10;
  this.force = createVector(5.0, 0);
  this.reloadSpeed = 0;

  this.c = [0,0,0];
  this.r = 0;
  this.g = 0;
  this.b = 0;
//  this.c = color(0,0,0);

  var mouse = createVector(x, y);
  this.force = p5.Vector.sub(mouse, player.loc);

  this.force.normalize();

  if (bulletType === 0){
    this.rad = 10;
    this.c[0] = 125; this.c[1] = 180; this.c[2] = 240;
  //  this.c = color(125, 180, 240);
  } else if (bulletType === 1){
    this.rad = 20;
    this.c[0] = 210; this.c[1] = 20; this.c[2] = 60;
  //  this.c = color(210, 20, 60);
  } else if (bulletType === 2){
    this.rad = 30;
    this.c[0] = 90; this.c[1] = 40; this.c[2] = 110;
    //this.c = color(90, 40, 110);
  } else {
    this.rad = 15;
    this.c[0] = 0; this.c[1] = 0; this.c[2] = 0;
  }

  //this.c = color(this.r, this.b, this.g);
}

Bullet.prototype.run = function() {
  this.update(this.force);   // default = (0,0)
  this.render();
}

Bullet.prototype.applyForce = function (f) {
  this.acc.add(f);
}

Bullet.prototype.render = function() {
  noStroke();
  fill(this.c[0], this.c[1], this.c[2]);
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
  for (var i = boids.length-1; i >= 0; i--){
    if(this.loc.dist(boids[i].loc) <= 10 + this.rad/2){
      if (boids[i].type == false){
        boids[i].health-=100;
        boids[i].c[0]+=20;
        boids[i].c[1]-=20;

        for (var j = 0; j <= 2; j ++) boids[i].c[j] *= 0.8;
      }

      if (boids[i].health <= 0){
        boids.splice(i, 1);
      }
    }
  }
}
