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
}
