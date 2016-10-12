function Snake() {
  this.x = width/2;
  this.y = height/2;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];
  this.isDead = false;
  this.j = 0;

  this.dir = function(x, y){
    this.xspeed = x;
    this.yspeed = y;
  }

  this.update = function() {
  if(this.total == this.tail.length){
    for(var i = 0; i < this.tail.length-1; i++){
      this.tail[i] = this.tail[i+1];
    }
  }
    this.tail[this.total-1] = createVector(this.x, this.y);
    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

    if ((this.x < 0  || this.x > width-scl) || (this.y < 0
      || this.y > height-scl)){
        this.isDead = true;
      }

    if (this.tail.length > 3){
      for (var i = 0; i < this.tail.length-1; i++){
           var d = dist(this.tail[this.tail.length-1].x + scl/2, this.tail[this.tail.length-1].y +scl/2, this.tail[i].x + scl/2, this.tail[i].y + scl/2);

           if (d < scl){
             this.isDead = true;
           }
      }
  }
    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);
  }

  this.eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1){
      this.total++;
      return true;
    }
      return false;
  }

  this.show = function(){
    fill(255);
    for(var i = 0; i < this.tail.length; i++){
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}
