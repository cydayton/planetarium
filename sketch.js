var ctracker;
var slider;
var cfont;
var ifont;
statstars = [];
var statstar;


var mgr;

function setup()
{
    createCanvas(windowWidth, windowHeight);

    mgr = new SceneManager();

    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene(Intro);
    mgr.addScene(Planetarium);

    mgr.showNextScene();

    cfont = loadFont('assets/weather.otf');
    ifont = loadFont('assets/courier.ttf');
}

function draw()
{
    mgr.draw();
}

function mousePressed()
{
    mgr.handleEvent("mousePressed");
}

function keyPressed()
{
    mgr.handleEvent("keyPressed");
}

// Intro scene constructor function
function Intro(){
  class StatStar {
    constructor() {
      this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);      
        this.pz = this.z;
    }
    update() {
      this.z = this.z - speed;
      if (this.z < 1) {
        this.z = width/2;
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.pz = this.z;
      }
    }
  
    show() {
      fill(255);
      noStroke();
      
      var sx = map(this.x/this.z, 0, 1, 0, width);
      var sy = map(this.y/this.z, 0, 1, 0, height);
      var r = map(this.z, 0, width, 12, 0);
      image(star1, sx, sy, r, r);    
      
      var px = map(this.x/this.pz, 0, 1, 0, width);
      var py = map(this.y/this.pz, 0, 1, 0, height);
      this.pz = this.z;
      
      stroke(255);
      line(px, py, sx, sy);
    }}

    this.setup = function() {
      var cnv = createCanvas(windowWidth, windowHeight);

      star1 = loadImage('assets/star1.png')

      statstar = new StatStar();
      // Create an array of 1600 star objects
      for (var i = 0; i < 1600; i++) {
          statstars[i] = new StatStar();
      }
    }

    this.draw = function() {
      cursor(ARROW);
      background(0);
      fill(255);
      textAlign(CENTER);
      textSize(72);
      textFont(cfont);
      text("Starry Sky", width/2, -100+height/2);

      textSize(24);
      textFont(ifont);
      text("Move your cursor to change the speed of the flying stars.", width/2, height/2);
      text("To venture inside the planetarium, click anywhere in the sky...", width/2, 50+height/2);
      text("Allow camera access to create your own personal constellation!", width/2, 100+height/2);
      text("Once inside, hover over the constellations to learn their names.", width/2, 150+height/2);

      textSize(14);
      text("A project by Camaren Dayton", width/2, 250+height/2);

      speed = map(mouseX, 0, width, 2, 10);
      translate(width/2, height/2);
      
      for (var i = 0; i < statstars.length; i++) {
        statstars[i].update();
          statstars[i].show();
    }

    this.mousePressed = function() {
        // switch the scene
        this.sceneManager.showScene(Planetarium);
    }

}
}

// Main scene constructor function
function Planetarium(){
  var stars = [];
  var poslocs = [];
  var speed;
  class Star {
      constructor() {
        this.x = random(-width, width);
          this.y = random(-height, height);
          this.z = random(width);      
          this.pz = this.z;
      }
      update() {
        this.z = this.z - speed;
        if (this.z < 1) {
          this.z = width/2;
          this.x = random(-width, width);
          this.y = random(-height, height);
          this.pz = this.z;
        }
      }
    
      show() {
        fill(255);
        noStroke();
        
        var sx = map(this.x/this.z, 0, 1, 0, width);
        var sy = map(this.y/this.z, 0, 1, 0, height);
        var r = map(this.z, 0, width, 12, 0);
        image(star1, sx, sy, r, r);    
        
        var px = map(this.x/this.pz, 0, 1, 0, width);
        var py = map(this.y/this.pz, 0, 1, 0, height);
        this.pz = this.z;
        
        stroke(255);
        line(px, py, sx, sy);
      }
  }

    this.setup = function() {
      // setup camera capture
      var videoInput = createCapture();
      videoInput.size(windowWidth, windowHeight);
      videoInput.position(0, 0);
      
      // setup canvas
      var cnv = createCanvas(windowWidth, windowHeight);
      cnv.position(0, 0);

      // setup tracker
      ctracker = new clm.tracker();
      ctracker.init(pModel);
      ctracker.start(videoInput.elt);

      slider = createSlider(1, 50, 10);
      slider.position(0, height-20);

      noStroke();

      star = new Star();
      // Create an array of 1600 star objects
      for (var i = 0; i < 1600; i++) {
          stars[i] = new Star();
      }
    }

    this.draw = function() {
      background(0, 15, 36);
      // back arrow
      push();
      beginShape();
      stroke(150, 255, 255);
      vertex(30, 15);
      vertex(15, 30);
      vertex(30, 45);
      vertex(15, 30);
      vertex(30, 15);
      endShape();
      beginShape();
      vertex(25, 30);
      vertex(60, 30);
      vertex(25, 30);
      endShape();
      pop();
      if((mouseX<120) && (mouseX>15) && (mouseY<45) && (mouseY>15)){
        cursor(HAND);
      } else{cursor(ARROW);}

      // get array of face marker positions
      var positions = ctracker.getCurrentPosition();
      
      for (var i=0; i<positions.length; i++) {
        // draw star at each position point
        var val = slider.value();
        image(star1, positions[i][0], positions[i][1], val, val);
      }

      // draw constellations
      stroke(255);
      strokeWeight(1);

      push();
      translate(windowWidth/10, windowHeight/8);
      line(100,100,150,80);//cygnus
      line(155,78,175,70);
      line(175,65,165,40);
      line(180,70,200,70);
      line(176,75,175,105);
      if ((mouseX > 100 + windowWidth/10) && (mouseX < 420 + windowWidth/10) && (mouseY > 50 + windowHeight/8) && (mouseY < 100 + windowHeight/8)) {
        text("Cygnus", 150, 80)
      } 
      pop();

      push();
      translate(3*windowWidth/4, 5*windowHeight/8)
      line(0, 10, 80, 30); //big dipper
      line(85, 35, 115, 65);
      line(120, 70, 155, 100);
      line(160, 105, 290, 150);
      line(155, 110, 145, 165);
      line(150, 170, 250, 220);
      line(255, 220, 295, 155);
      if ((mouseX > 3*windowWidth/4) && (mouseX < 300 + 3*windowWidth/4) && (mouseY > 5*windowHeight/8) && (mouseY < 200 + 5*windowHeight/8)) {
        text("Big Dipper", 100, 100)
      } 
      pop();
      
      push();
      translate(windowWidth/3, windowHeight/3)
      line(50,0,70,20);//cancer
      if ((mouseX > 50 + windowWidth/3) && (mouseX < 70 + windowWidth/3) && (mouseY > windowHeight/3) && (mouseY < 20 + windowHeight/3)) {
        text("Cancer", 60, 10)
      } 
      pop();
      
      push();
      translate(windowWidth/12, windowHeight/5);
      line(80,350,100,350);//orionsbelt
      line(105,350,125,350);
      line(75,355,30,425);
      line(35,427,155,440);
      line(155,435,125,355);
      line(75,345,40,280);
      line(45,275,155,290);
      line(160,295,125,345);
      if ((mouseX > 40 + windowWidth/12) && (mouseX < 150 + windowWidth/12) && (mouseY > 280 + windowHeight/5) && (mouseY < 440 + windowHeight/5)) {
        text("Orion's Belt", 60, 340)
      } 
      pop();
      
      push();
      translate(windowWidth/3, 80);
      line(480,150,440,100);//cepheus
      line(540,90,500,40);
      line(485,150,540,95);
      line(440,95,448,30);
      line(448,25,495,40);
      if ((mouseX > 440 + windowWidth/3) && (mouseX < 540 + windowWidth/3) && (mouseY > 30 + 80) && (mouseY < 150 + 80)) {
        text("Cepheus", 460, 80)
      } 
      pop();

      // move stars on canvas
      speed = map(mouseX, 0, width, 2, 10);
      translate(width/2, height/2);
      
      for (var i = 0; i < stars.length; i++) {
        stars[i].update();
          stars[i].show();
      }

      this.keyPressed = function() {
        // switch the scene
        if (keyCode === LEFT_ARROW) {
          this.sceneManager.showScene(Intro);
        }
      }
      this.mousePressed = function() {
        if((mouseX<120) && (mouseX>15) && (mouseY<45) && (mouseY>15)){
        // switch the scene
        this.sceneManager.showScene(Intro);
      }
    }
    }
  }


