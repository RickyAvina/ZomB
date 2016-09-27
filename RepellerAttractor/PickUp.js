function PickUp(){
  this.pickedUp = false;
  this.radius = 50;
  this.location = createVector(random(150 + this.radius, width - 10 - this.radius), random(10 + this.radius, height - 60 - this.radius));

  this.run = function(){
    this.display();
    this.update();
  }

  this.display = function(){
    fill(0,255,0);
    ellipse(this.location.x, this.location.y, 50, 50);
  }

  this.update = function(){
    if (this.location.dist(attractors[0].loc) <= 15 + this.radius/2){
      b = round(random(0,2));
    }
  }
}
