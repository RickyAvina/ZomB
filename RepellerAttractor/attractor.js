function Attractor() {
	this.color = color(255);

	this.render = function() {
    push();
  	  strokeWeight(4);
      fill(this.color);
  		stroke(20);
  		ellipse(this.loc.x, this.loc.y, this.rad, this.rad);
  	pop();
}

	this.update = function(){
		if(keyIsDown(LEFT_ARROW)){
			this.loc.x -= 5;
		}
		if(keyIsDown(RIGHT_ARROW)){
			this.loc.x += 5;
		}
		if(keyIsDown(DOWN_ARROW)){
			this.loc.y += 5;
		}
		if(keyIsDown(UP_ARROW)){
			this.loc.y -= 5;
		}
	}
}
