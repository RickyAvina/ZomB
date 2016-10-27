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

var survivors = 5;

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
var health = 255;

var repeller;

function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  var x  = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  fill(200, 200, 0);
  score = 0;
  loadElements();
  time = millis();
  repeller  = new Repeller(width/2, height/2);
}

function draw() {
  background(180);
  drawSetting();
  drawMenuItems();
  runElements();
  checkReload();
  //  endGame();
  //  noLoop();

  repeller.run();

}

function endGame(){
  console.log("AYY");
  fill(40, 50, 80);
  rect(0,0,width, height);

  // readSingleFile("file:///H://score.json");
  //httpGet("H:\\score.txt", Object, "text");
  loadJSON("file:///H://score.json");

  var sendableScore = [];
  sendableScore.push({
    player: "Henry",
    score: 4
  });

  save(sendableScore, "score.txt");
  console.log(sendableScore[0].score);



  //var data = loadJSON("score.json");

  // data.push({
  //   player: "Henry",
  //   score: 4
  // });

  // var json = {
  //   player: "Ricky".
  //   score: 4
  // };
  //
  // json.player = "ricky";
  // json.score = boids.length;
  //
  // var newJSON = {
  //
  // }
  // saveJSON(json, "data/score.json");
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
    for (var j = walls[i][0].x; j <= walls[i][1].x; j+=5){
      for (var k = walls[i][0].y; k <= walls[i][1].y; k+=5){
      repellers.push(new Repeller(j, k));
      }
    }
  }
}

function loadBoids(){
  for (var i = 0; i < attractors.length; i++){
    boids.push(new Boid(attractors[i].loc.x + random(-10, 10), attractors[i].loc.y + random(-10, 10), true));
  }

  survivors = boids.length;

  for (var i = 0; i < 20; i++){
    boids.push(new Boid(random(150 + 15, width - 10 - 15), random(10 + 15, height - 60 - 15), false));
  }
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
        score++;
      }
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
    bullets.push(new Bullet(mouseX, mouseY, 1));
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
