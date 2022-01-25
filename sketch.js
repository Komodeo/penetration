//build grid
var grid = {
  columns: 5,
  rows: 12,
  boxSize: 50,
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
  majora: {
    height: 40 * scale,
    width: 10 * scale,
    rgb: {
      r: 234,
      g: 154,
      b: 183
    }
  },
  minora: {
    height: 10 * scale,
    width: 2 * scale,
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
  background(grid.rgb.r, grid.rgb.g, grid.rgb.b);
}

function draw() {
  //set number of rows and columns based on mouse position
  grid.columns = Math.ceil(winMouseX / grid.boxSize);
  grid.rows = Math.ceil(winMouseY / grid.boxSize);
  //create canvas
  createCanvas(grid.columns * grid.boxSize, grid.rows * grid.boxSize);
  background(grid.rgb.r, grid.rgb.g, grid.rgb.b);

  //draw a box for each grid column
  for (var column = 0; column < grid.columns; column++) {
    //draw a box for each grid row
    for (var row = 0; row < grid.rows; row++) {
      //define variables to anchor drawings
      var centerX = grid.boxSize / 2 + column * grid.boxSize;
      var centerY = grid.boxSize / 2 + row * grid.boxSize;

      strokeWeight(0);
      //position vulva
      //majora
      fill(vulva.majora.rgb.r, vulva.majora.rgb.g, vulva.majora.rgb.b);
      beginShape();
      vertex(centerX, centerY - vulva.majora.height + vulva.posY);
      vertex(centerX + vulva.majora.width, centerY + vulva.posY);
      vertex(centerX, centerY + vulva.majora.height + vulva.posY);
      vertex(centerX - vulva.majora.width, centerY + vulva.posY);
      endShape(CLOSE);
      //minora
      fill(vulva.minora.rgb.r, vulva.minora.rgb.g, vulva.minora.rgb.b);
      beginShape();
      vertex(centerX, centerY - vulva.minora.height + vulva.posY);
      vertex(centerX + vulva.minora.width, centerY + vulva.posY);
      vertex(centerX, centerY + vulva.minora.height + vulva.posY);
      vertex(centerX - vulva.minora.width, centerY + vulva.posY);
      endShape(CLOSE);

      //penis
      fill(penis.head.rgb.r, penis.head.rgb.g, penis.head.rgb.b);
      ellipse(centerX, centerY + penis.head.size / 2 + penis.posY, penis.head.size);
      fill(0);
      ellipse(centerX, centerY + penis.tipSize / 2 + penis.posY, penis.tipSize);

      //vignette
      strokeWeight(vignette.strokeSize);
      //set colors based on column and row
      vignette.rgb.r = map(1 - (column / (grid.columns - 0.999)), 0, 1, 0, 255); //red decreases from left to right
      vignette.rgb.g = map(1 - (row / (grid.rows - 0.999)), 0, 1, 0, 255); //green decreases from top to bottom
      vignette.rgb.b = map(column / grid.columns, 0, 1, 0, 255); //blue increases from left to right
      stroke(vignette.rgb.r, vignette.rgb.g, vignette.rgb.b);
      noFill();
      ellipse(centerX, centerY, vignette.size);
    }
  }

}



