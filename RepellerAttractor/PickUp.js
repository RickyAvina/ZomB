function PickUp(){
  this.location = createVector(random(width), random(height));
  this.pickedUp = false;
  this.radius = 50;

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
