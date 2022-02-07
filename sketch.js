//build body
var body = {
  size: 500,
  rgb: {
    r: 252,
    g: 225,
    b: 237
  }
};

//object sizes are multiplied by the scale
scale = body.size / 100;

//initialize vulva
var vulva = {
  posY: -5 * scale, //position relative to centerY
  majora: {
    height: 80 * scale,  //height and width halved for convenience
    startWidth: 40 * scale,
    rgb: {
      r: 255,
      g: 189,
      b: 214
    }
  },
  minora: {
    height: 30 * scale,  //height and width halved for convenience
    startWidth: 3 * scale,
    rgb: {
      r: 234,
      g: 154,
      b: 183
    }
  },
  vagina: {
    height: 7 * scale,  //height and width halved for convenience
    startWidth: 1 * scale,
    rgb: {
      r: 255,
      g: 135,
      b: 183
    }
  }
};

//initialize penis
var penis = {
  head: {
    size: 60 * scale,
    rgb: {
      r: 153,
      g: 51,
      b: 47
    }
  },
  shaft: {
    size: 55 * scale,
    rgb: {
      r: 71,
      g: 43,
      b: 12
    }
  },
  tipSize: 5 * scale,
  posY: 0 * scale //position of tip relative to centerY
};

//global variables to anchor drawings
var centerX;
var centerY;
var penetrationPosY;

function setup() {
  //create canvas
  createCanvas(body.size, body.size);

  //define variables to anchor drawings
  centerX = width / 2;
  centerY = height / 2;
  penetrationPosY = centerY + vulva.posY;
}

function draw() {
  //draw the female bottom portion
  drawBottom();

  //draw the penis
  drawPenis();

  //draw the female top portion
  drawTop();

  //stretch vulva when penis enters
  stretchVulva();
}

// Function to draw the female bottom half
function drawBottom() {
  
  //draw background
  background(body.rgb.r, body.rgb.g, body.rgb.b);

  //draw vulva bottom//
  strokeWeight(0);

  //majora
  noStroke();
  fill(vulva.majora.rgb.r, vulva.majora.rgb.g, vulva.majora.rgb.b);
  arc(centerX, penetrationPosY, vulva.majora.width, vulva.majora.height, 0, PI);

  //minora
  fill(vulva.minora.rgb.r, vulva.minora.rgb.g, vulva.minora.rgb.b);
  triangle(centerX + vulva.minora.width, penetrationPosY, //right
    centerX, centerY + vulva.minora.height + vulva.posY, //bottom
    centerX - vulva.minora.width, penetrationPosY); //left

  //vagina
  fill(vulva.vagina.rgb.r, vulva.vagina.rgb.g, vulva.vagina.rgb.b);
  triangle(centerX + vulva.vagina.width, penetrationPosY, //right
    centerX, centerY + vulva.vagina.height + vulva.posY, //bottom
    centerX - vulva.vagina.width, penetrationPosY); //left
}

// Function to draw the penis
function drawPenis() {

  //move penis with mouse
  penis.posY = winMouseY - centerY - penis.head.size;

  //variable for the center of the penis head
  penis.head.posY = centerY + penis.head.size / 2 + penis.posY;

  //draw penis//

  //shaft
  fill(penis.shaft.rgb.r, penis.shaft.rgb.g, penis.shaft.rgb.b);
  rect(centerX - penis.shaft.size / 2, penis.head.posY, penis.shaft.size, height - penis.head.posY);

  //head
  fill(penis.head.rgb.r, penis.head.rgb.g, penis.head.rgb.b);
  ellipse(centerX, penis.head.posY, penis.head.size);

  //tip
  fill(0);
  ellipse(centerX, centerY + penis.tipSize / 2 + penis.posY, penis.tipSize);
}

// Function to draw the female top half
function drawTop() {

  //draw background skin top
  fill(body.rgb.r, body.rgb.g, body.rgb.b);
  noStroke();
  rect(0, 0, width, penetrationPosY);

  //draw vulva top//
  strokeWeight(0);

  //majora
  fill(vulva.majora.rgb.r, vulva.majora.rgb.g, vulva.majora.rgb.b);
  arc(centerX, penetrationPosY, vulva.majora.width, vulva.majora.height, PI, 0);

  //minora
  fill(vulva.minora.rgb.r, vulva.minora.rgb.g, vulva.minora.rgb.b);
  triangle(centerX, centerY - vulva.minora.height + vulva.posY, //top
    centerX + vulva.minora.width, penetrationPosY, //right
    centerX - vulva.minora.width, penetrationPosY); //left

  //vagina
  fill(vulva.vagina.rgb.r, vulva.vagina.rgb.g, vulva.vagina.rgb.b);
  triangle(centerX, centerY - vulva.vagina.height + vulva.posY, //top
    centerX + vulva.vagina.width, penetrationPosY, //right
    centerX - vulva.vagina.width, penetrationPosY); //left
}

// Function to stretch the vulva when the penis enters
function stretchVulva() {

  //set variables for head collision detection (thanks, Pythagoras!)
  var PytY = dist(centerX, penetrationPosY, centerX, penis.head.posY);
  var PytH = penis.head.size / 2;
  var PytX = sqrt(PytH * PytH - PytY * PytY);

  //stretch vulva when penis enters//
  if (penis.posY < vulva.posY) {
    vulva.vagina.width = PytX + random(0, vulva.vagina.startWidth); //stretch vagina on head
    //stretch vagina on shaft
    if (vulva.vagina.width < penis.shaft.size / 2 + vulva.vagina.startWidth && penis.head.posY < penetrationPosY ||
      penis.head.posY < penetrationPosY - penis.head.size / 2) {
      vulva.vagina.width = penis.shaft.size / 2 + random(0, vulva.vagina.startWidth);
    }
  }
  else {
    vulva.vagina.width = vulva.vagina.startWidth; //unstretch on exit
  }
  vulva.minora.width = vulva.vagina.width + vulva.minora.startWidth - vulva.vagina.startWidth; //stretch minora
  vulva.majora.width = vulva.minora.width + vulva.majora.startWidth - vulva.minora.startWidth; //stretch majora
}
