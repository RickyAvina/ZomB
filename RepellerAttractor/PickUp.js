function PickUp(){
  this.pickedUp = false;
  this.radius = 50;
  this.myTimer = millis();
  this.wait = 8000;

  this.loc = createVector(random(150 + this.radius, width - 10 - this.radius), random(10 + this.radius, height - 60 - this.radius));
  this.run = function(){
    this.display();
    this.update();
  }

  this.display = function(){
    if (this.pickedUp === false){
      fill(0,255,0);
      ellipse(this.loc.x, this.loc.y, 50, 50);
    }
  }

  this.update = function(){
    if (this.pickedUp === false){
      if (this.loc.dist(attractors[0].loc) <= 15 + this.radius/2){
        this.pickedUp = true;
        b = Math.floor(Math.random()*3);
      }
    } else {
      if (millis() - this.myTimer >= this.wait){
        this.pickedUp = false;
        this.loc = createVector(random(150 + this.radius, width - 10 - this.radius), random(10 + this.radius, height - 60 - this.radius));
        this.myTimer = millis();
      }
    }
  }
}
