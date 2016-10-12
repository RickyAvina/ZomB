var s;
var scl = 20;
var food;
var lsd;
var turnRight = false;
var turnLeft = false;
var turnUp = false;
var turnDown = false;
var FrameRate = 10;
var gameStarted = false;
var keyK = false;
var score = 0;
var m;
var time;
var wait = 500;
var x = Math.round((window.innerWidth/scl)/10)*scl*10;
var y = Math.round((window.innerHeight/scl)/10)*scl*10;

function setup(){
  createCanvas(x*0.8 , y-200);
  createGame();
  time = millis();
}

function createGame(){
  if (gameStarted == true){
    score = 0;

    s = new Snake();
    frameRate(FrameRate);
    pickLocation("food");
    pickLocation("lsd");
  }
}

function pickLocation(type){
  if (type === "food"){
    var cols = floor(width/scl);
    var rows = floor(height/scl);

    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);

    for(var i = 0; i < s.tail.length; i++){
      if ((food.x == s.tail[i].x) && (food.y == s.tail[i].y)){
        pickLocation("food");
      }
    }
  } else if (type==="lsd"){
    var cols = floor(width/scl);
    var rows = floor(height/scl);

    lsd = createVector(floor(random(cols)), floor(random(rows)));
    lsd.mult(scl);

    for(var i = 0; i < s.tail.length; i++){
      if ((lsd.x == s.tail[i].x) && (lsd.y == s.tail[i].y)){
        pickLocation("lsd");
      }
    }
  }
}

function draw(){
  background(90, 0, 180);

  if (gameStarted == false){
    fill(255);
    rect(width/2 - 60, height*2/3 - 20, 120, 40);
    fill(0);
    textSize(24);
    textWidth(100);
    textStyle(BOLD);
    text("Start", width/2, y*2/3 - 126);
    textAlign("center");

    textSize(60);
    textStyle(BOLD);
    text("Snake Game", width/2, y/3);
    textAlign("center");

    textSize(20);
    textStyle(BOLD);
    text("(Use WASD)", width/2, y*(2/3)-80);
    textAlign("center");

    if (mouseX > width/2 - 60 && mouseX < width/2 + 60
      && mouseY > height*2/3 -20 && mouseY < height*2/3 + 20){
        fill(140);
        rect(width/2 - 60, height*2/3 - 20, 120, 40);
        fill(0);
        textSize(24);
        textWidth(100);
        textStyle(BOLD);
        text("Start", width/2, y*2/3 - 126);
        textAlign("center");
        if (mouseIsPressed){
          fill(0);
          rect(width/2 - 60, height*2/3 - 20, 120, 40);
          fill(0);
          textSize(24);
          textWidth(100);
          textStyle(BOLD);
          text("Start", width/2, y*2/3 - 126);
          textAlign("center");
          gameStarted = true;
          createGame();
        }
      }
    } else {

      if (s.isDead == true){
        fill(90, 0, 180);
        rect(0,0,width,height);

        fill (255);
        textSize(60);
        textStyle(BOLD);
        text("Game Over", width/2, height/3);
        textAlign("center");
        fill(150);
        textSize(40);
        textStyle(BOLD);
        text("Score: " + round(score), width/2, height*2/3 - 60);
        textAlign("center");
        fill(255);
        textSize(24);
        textStyle(BOLD);
        text("(Click Anywhere To Play Again)", width/2, height*2/3);
        textAlign("center");


        if (mouseIsPressed){
          gameStarted = false;
        }
      } else {

        s.update();
        s.show();

        if (s.eat(food)){
          score += 100;
          pickLocation("food");
        }

        if (s.eat(lsd)){
          score+=1000;
          pickLocation("lsd");
        }

        fill(180, 0, 0);
        rect(food.x, food.y, scl, scl);

        fill(90, 0, 180);
        noStroke();
        rect(lsd.x, lsd.y, scl, scl);

        if (score>0){
          if (millis() - time >= wait){
            score-=1;
            time=millis()
          }
        }

        fill(200);
        textSize(48);
        textFont("Helvetica");
        text(round(score), width/2, 40);
      }
    }

  }

  function keyPressed(){

    if (keyCode == 87 && turnDown == false && keyK == false){
      s.dir(0, -1);
      turnUp = true;
      turnDown = false;
      turnLeft = false;
      turnRight = false;
      keyK = true;
    }else if (keyCode == 83 && turnUp == false && keyK == false){
      s.dir(0, 1);
      turnUp = false;
      turnDown = true;
      turnLeft = false;
      turnRight = false;
      keyK = true;
    }else if (keyCode == 68 && turnLeft == false && keyK == false){
      s.dir(1, 0);
      turnUp = false;
      turnDown = false;
      turnLeft = false;
      turnRight = true;
      keyK = true;
    }else if (keyCode == 65 && turnRight == false && keyK == false){
      s.dir(-1, 0);
      turnUp = false;
      turnDown = false;
      turnLeft = true;
      turnRight = false;
      keyK = true;
    }
  }

  function keyReleased(){
    keyK = false;
  }
