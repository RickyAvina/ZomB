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
		if(keyIsDown(65)){
			this.loc.x -= 5;
		}
		if(keyIsDown(68)){
			this.loc.x += 5;
		}
		if(keyIsDown(83)){
			this.loc.y += 5;
		}
		if(keyIsDown(87)){
			this.loc.y -= 5;
		}
	}
}
