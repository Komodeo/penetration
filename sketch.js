//build grid
var grid = {
  columns: 1,
  rows: 1,
  boxSize: 500,
  rgb: {
    r: 252,
    g: 225,
    b: 237
  }
};

scale = grid.boxSize / 100;

//define objects
var vulva = {
  posY: -5 * scale,
  minora: {
    height: 35 * scale,  //height and width halved for convenience
    startWidth: 7 * scale,
    rgb: {
      r: 234,
      g: 154,
      b: 183
    }
  },
  vagina: {
    height: 10 * scale,  //height and width halved for convenience
    startWidth: 2 * scale,
    rgb: {
      r: 255,
      g: 135,
      b: 183
    }
  }
};

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
  posY: 0 * scale
};

var vignette = {
  size: 90 * scale,
  strokeSize: 10 * scale,
  rgb: {
    r: 0,
    g: 0,
    b: 0
  }
};

function setup() {
  //create canvas
  createCanvas(grid.columns * grid.boxSize, grid.rows * grid.boxSize);
}

function draw() {
  //draw background
  background(grid.rgb.r, grid.rgb.g, grid.rgb.b);

  //define variables to anchor drawings
  var centerX = width / 2;
  var centerY = height / 2;
  var penetrationPosY = centerY + vulva.posY;
  penis.head.posY = centerY + penis.head.size / 2 + penis.posY;

  //draw vulva bottom//
  strokeWeight(0);
  //minora
  fill(vulva.minora.rgb.r, vulva.minora.rgb.g, vulva.minora.rgb.b);
  beginShape();
  vertex(centerX + vulva.minora.width, penetrationPosY); //right
  vertex(centerX, centerY + vulva.minora.height + vulva.posY); //bottom
  vertex(centerX - vulva.minora.width, penetrationPosY); //left
  endShape(CLOSE);
  //vagina
  fill(vulva.vagina.rgb.r, vulva.vagina.rgb.g, vulva.vagina.rgb.b);
  beginShape();
  vertex(centerX + vulva.vagina.width, penetrationPosY); //right
  vertex(centerX, centerY + vulva.vagina.height + vulva.posY); //bottom
  vertex(centerX - vulva.vagina.width, penetrationPosY); //left
  endShape(CLOSE);

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

  //draw background skin top
  fill(grid.rgb.r, grid.rgb.g, grid.rgb.b);
  noStroke();
  rect(0, 0, width, penetrationPosY);

  //draw majora
  stroke(0);
  strokeWeight(1);
  noFill();
  bezier(centerX - vulva.minora.width, centerY + vulva.posY, 
    centerX, centerY + vulva.posY - vulva.minora.height - 100, 
    centerX, centerY + vulva.posY - vulva.minora.height - 100, 
    centerX + vulva.minora.width, centerY + vulva.posY);

  //draw vulva top//
  strokeWeight(0);
  //minora
  fill(vulva.minora.rgb.r, vulva.minora.rgb.g, vulva.minora.rgb.b);
  beginShape();
  vertex(centerX, centerY - vulva.minora.height + vulva.posY); //top
  vertex(centerX + vulva.minora.width, penetrationPosY); //right
  vertex(centerX - vulva.minora.width, penetrationPosY); //left
  endShape(CLOSE);
  //vagina
  fill(vulva.vagina.rgb.r, vulva.vagina.rgb.g, vulva.vagina.rgb.b);
  beginShape();
  vertex(centerX, centerY - vulva.vagina.height + vulva.posY); //top
  vertex(centerX + vulva.vagina.width, penetrationPosY); //right
  vertex(centerX - vulva.vagina.width, penetrationPosY); //left
  endShape(CLOSE);

  //set variables for head collision detection
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
    vulva.vagina.width = vulva.vagina.startWidth;
  }
  vulva.minora.width = vulva.vagina.width + vulva.minora.startWidth - vulva.vagina.startWidth; //stretch minora

  //move penis with mouse
  penis.posY = winMouseY - centerY - (penis.head.size);
}



