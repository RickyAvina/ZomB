/*******************************************
*                                          *
*                    TO DO                 *
*                                          *
*        0. Movement with mouse            *
*        1. Give health bars               *
*        2. Tweak Game                     *
*        3. Make everything resizable      *
*        4. Add Animations                 *
*        5. Fix Collisions                 *
*                                          *
********************************************/

var cnv;

var player;
var boids = [];

var survivors;

var attractors = [];

var bullets = [];
var time;
var wait = 600;
var reload = false;

var s = 8;
var a = 1.2;
var c = 3.55;

var walls = [];
var repellers = [];

var score;
var health;

var gameStarted;
var isBeginning;

function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  var x  = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  fill(200, 200, 0);
  gameStarted = false;
  isBeginning = false;
  fill(40, 50, 80);
  rect(0,0, width, height);
  fill(255);
  text("Welcome to ZomB!", width/2 - 80, height/5);

  startGame();
}

function startGame(){
  loadElements();
  time = millis();
}

function reset(){
   walls = [];
   boids = [];
   attractors = [];
   score = 0;
   survivors = 5;
   health = 255;
   gameStarted = true;
}

function draw() {
  background(180);

  if (gameStarted === true){
    drawSetting();
    drawMenuItems();
    runElements();
    checkReload();

    if ((survivors < 1 && score < 5) || (health < 1)){
      endGame(false);
    }

    if (survivors < 1 && score >= 5){
      endGame(true);
    }
  } else {

    background(40, 50, 80);
    fill(255, 240, 240);
    rect(width/2 - 240, height/2 - 240, 480, 480);
    fill(0);
    text("Start Game?", width/2, height/2 - 40);
    fill(0);
    rect(width/2 - 40, height/2 - 30, 80, 120);

    if (mouseIsPressed){
      reset();
      startGame();
    }
  }

  console.log(gameStarted);
}

function endGame(didWin){

  if (didWin == false){
    fill(140, 20, 30);
    rect(0,0,width, height);
    fill(255);
    text("YOU LOSE", width/2, height/5);
  } else {
    fill(40, 50, 80);
    rect(0,0,width, height);
    fill(255);
    text("YOU WIN", width/2, height/2);
  }

    fill(255, 230, 240);
    text("Play again?", width/2 - 30, height/2 + 40);


    if (mouseX >= width/2 - 40 && mouseX <= width/2 - 40 + 220){
      if (mouseY >= height/2 + 80 && mouseY <= height/2 + 80 + 80){
        fill(100, 100, 100);

        if (mouseIsPressed) playAgain();
      }
    }

    rect(width/2 - 40, height/2 + 80, 220, 80);
}

function playAgain(){
  gameStarted = false;
  startGame();
}

function drawMenuItems(){
  fill(0);
  noStroke();
  rect(150, height-10, width-158, 10);
  fill(255-health, health, 0);
  strokeWeight(2);
  stroke(0);
  health = constrain(health, 0.5, 255);
  rect(150, height-10, (255/width-7.03) * health, 10);

  //  noStroke();
  fill(255, 255, 255);
  textSize(32);
  text("Survivors", 10, 30);
  for (var i = 0; i < survivors; i++) rect(40, i * 40 + 60, 70, 30);
}

function loadElements(){
  player = new Attractor(width/2, height/2, false);

  loadAtrractors();
  loadBoids();

  walls.push([createVector(300, 100), createVector(300, 300)]);     // top left wall
  walls.push([createVector(300, 100), createVector(500, 100)]);
  walls.push([createVector(300, 300), createVector(500, 300)]);
  walls.push([createVector(150, 480), createVector(500, 480)]);

  walls.push([createVector(750, 300), createVector(950, 300)]); 	// middle container
  walls.push([createVector(750, 300), createVector(750, 450)]);
  walls.push([createVector(950, 300), createVector(950, 450)]);

  walls.push([createVector(1200, 10), createVector(1200, 300)]);	// right wall
  walls.push([createVector(1200, 500), createVector(1200, height-10)]);

  for (var i = 0; i < walls.length; i++){
    for (var j = walls[i][0].x; j <= walls[i][1].x; j+=10){
      for (var k = walls[i][0].y; k <= walls[i][1].y; k+=10){
        repellers.push(new Repeller(j, k));
      }
    }
  }
}

function loadBoids(){
  for (var i = 0; i < attractors.length; i++) boids.push(new Boid(attractors[i].loc.x + random(-10, 10), attractors[i].loc.y + random(-10, 10), true));
  survivors = boids.length;
  for (var i = 0; i < 20; i++) boids.push(new Boid(random(150 + 15, width - 10 - 15), random(10 + 15, height - 60 - 15), false));

}

function loadAtrractors(){
  attractors.push(new Attractor(190, 190, true));
  attractors.push(new Attractor(380, 190, true));
  attractors.push(new Attractor(850, 400, true));
  attractors.push(new Attractor(1275, 50, true));
  attractors.push(new Attractor(1275, height-50, true));
}

function runElements(){
  for (var i = 0; i < bullets.length; i++) bullets[i].run();
  for (var i = 0; i < boids.length; i++) boids[i].run(boids);
  for (var i = 0; i < attractors.length; i++) attractors[i].run();
  for (var i = 0; i < repellers.length; i++) repellers[i].run();
  player.run();
  checkBoidFree();
}

function checkReload(){
  if (reload === true){
    if (millis() - time >= wait){
      reload = false;
      time = millis();
    }
  }
}

function checkBoidFree(){
  for (var i = boids.length-1; i >= 0; i--){
    if (boids[i].loc.x-boids[i].radius > 152 && boids[i].loc.x+boids[i].radius<352 && boids[i].loc.y+ boids[i].radius > 694 && boids[i].loc.y - boids[i].radius < 874){
      if (boids[i].type == true){
        survivors--;
        boids.splice(i, 1);
        boids.push(new Boid(random(150 + 15, width - 10 - 15), random(10 + 15, height - 60 - 15), false));
        score++;
      }
    }

    if (boids[i].health < 10) if (boids[i].type === true){
      survivors--;
      boids.splice(i,1);
      boids.push(new Boid(random(150 + 15, width - 10 - 15), random(10 + 15, height - 60 - 15), false));
    }
  }
}

function drawSetting(){

  // border
  push();
  noStroke();
  fill(0);
  rect(0, height - 60, width, 70);
  rect(0, 0, width, 10);
  rect(width - 10, 0, 10, height);
  rect(0, 0, 150, height);
  pop();
  fill(80);
  strokeWeight(4);
  rect(150, 10, width - 160, height - 20);
  // end border
  strokeWeight(4);
  fill(0);

  for (var i = 0; i < walls.length; i++) line(walls[i][0].x, walls[i][0].y, walls[i][1].x, walls[i][1].y);

  fill(40, 180, 200);
  strokeWeight(0);
  rect(152, 694, 200, 180);
  //health--;
}

function mousePressed() {

  if (reload === false){
    bullets.push(new Bullet(player.loc.x, player.loc.y + 10, 1));
    bullets.push(new Bullet(player.loc.x + 10, player.loc.y, 1));
    bullets.push(new Bullet(player.loc.x - 10, player.loc.y, 1));
    bullets.push(new Bullet(player.loc.x, player.loc.y - 10, 1));

    reload = true;
  }
}

window.onresize = function() {
  cnv.size(window.innerWidth, window.innerHeight);
}

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.innerHTML = contents;
}
