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
      background(0);
      fill(255);
      textAlign(CENTER);
      textSize(72);
      textFont(cfont);
      text("Starry Sky", width/2, -100+height/2);

      textSize(24);
      textFont(ifont);
      text("To venture to the planetarium, click anywhere.", width/2, height/2);
      text("Once inside, move the mouse to watch the stars fly.", width/2, 50+height/2);
      text("Hover over the constellations to learn their names.", width/2, 100+height/2);
      text("Drag the slider to change the size of your own personal constellation.", width/2, 150+height/2);

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

      slider = createSlider(0, 50, 10);
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

      // get array of face marker positions
      var positions = ctracker.getCurrentPosition();
      
      for (var i=0; i<positions.length; i++) {
        // draw star at each position point
        var val = slider.value();
        image(star1, positions[i][0], positions[i][1], val, val);
      }
      push();
      translate(200, 100);
      // draw constellations
      stroke(255);
      strokeWeight(0.5);
      line(100,100,150,80);//cygnus
      line(155,78,175,70);
      line(175,65,165,40);
      line(180,70,200,70);
      line(176,75,175,105);
      if ((mouseX > 300) && (mouseX < 400) && (mouseY > 150) && (mouseY < 205)) {
        text("Cygnus", 150, 80)
      } 
      push();
      translate(1200, 300)
      line(300,300,200,400);//bigdipper
      line(200,405,340,460);
      line(340,455,345,310);
      line(340,305,305,300);
      line(345,300,380,260);
      line(385,255,450,230);
      if ((mouseX > 1600) && (mouseX < 1850) && (mouseY > 660) && (mouseY < 850)) {
        text("Big Dipper", 260, 400)
      } 
      pop();
      
      push();
      translate(500, 0)
      line(230,200,250,180);//cancer
      if ((mouseX > 930) && (mouseX < 950) && (mouseY > 280) && (mouseY < 300)) {
        text("Cancer", 240, 190)
      } 
      
      push();
      translate(0, 500);
      line(80,350,100,350);//orionsbelt
      line(105,350,125,350);
      line(75,355,30,425);
      line(35,427,155,440);
      line(155,435,125,355);
      line(75,345,40,280);
      line(45,275,155,290);
      line(160,295,125,345);
      if ((mouseX > 235) && (mouseX < 355) && (mouseY > 880) && (mouseY < 940)) {
        text("Orion's Belt", 60, 340)
      } 
      pop();
      
      push();
      translate(800, 100);
      line(480,150,440,100);//cepheus
      line(540,90,500,40);
      line(485,150,540,95);
      line(440,95,448,30);
      line(448,25,495,40);
      if ((mouseX > 1440) && (mouseX < 1540) && (mouseY > 225) && (mouseY < 350)) {
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
    }
  }
