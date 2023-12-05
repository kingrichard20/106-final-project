background(255, 255, 255);
colorMode(HSB);

/**************
   VARIABLES
***************/

var zoom = 1;

var actionHistory = [];

var colorPickerBrightness = 255;

var ShapeMode = {
    None: 0,
    Poly: 1,
    Ellipse: 3,
    Complex: 4
};
var modeShape = ShapeMode.None;

var SceneType = {
    Drawing: 0,
    InitColorPicker: 1,
    ColorPickerActive: 2
};
var scene = SceneType.Drawing;

var MenuBottomType = {
    Default: 0
};
var modeMenuBottom = MenuBottomType.Default;

var brushColor = color(0, 0, 255);

var Stroke = false;

var previewVertices = [];

var layers = [
    {
        shapeList: [],
        hidden: false
    },
    {
        shapeList: [],
        hidden: false
    },
    {
        shapeList: [],
        hidden: false
    },
    {
        shapeList: [],
        hidden: false
    },
    {
        shapeList: [],
        hidden: false
    }
];
var selectedLayer = 4;

var palette = [
    color(255, 0, 255),     //white
    color(0, 255, 255),     //red       0-15
    color(25, 255, 255),    //orange    20-35
    color(50, 255, 255),    //yellow    40-55
    color(75, 255, 255),    //green     75-100
    color(150, 255, 255),   //blue      120-180
    color(200, 255, 255),   //purple    200-225
    color(0, 0, 0)];        //black

var shapeList = [];

var selectedSwatch = 0;

//constants for cleanliness\\
var bottomButtonHeight = 400 - 14;
var paletteRightEdge = 390; //right edge of palette
var paletteLeftEdge = paletteRightEdge - (21 * ceil(palette.length / 2));

/****************
 BUTTON OBJECTS
*****************/

var Button = function (config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.color = this.color || color(0, 0, 255);
    this.unclickedColor = config.unclickedcolor || this.color;
    this.clickedColor = config.clickedColor || color(0, 0, 0);
    this.outlineColor = config.outlineColor || color(0, 0, 0);
    this.textColor = config.textColor || color(0, 0, 0);
    this.textSize = config.textSize || 19;
    this.label = config.label || "HERE'S SOME TEXT";
    this.isClicked = config.isClicked || false;
    this.onClick = config.onClick || function () { println("!"); };
};
Button.prototype.draw = function () {
    colorMode(HSB);
    fill(this.color);
    stroke(this.outlineColor);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, 5);
    textSize(this.textSize);
    textAlign(CENTER, CENTER);
    fill(this.textColor);
    text(this.label, this.x, this.y);
};
Button.prototype.isMouseInside = function () {
    return mouseX > this.x - this.width / 2 &&
        mouseX < this.x + this.width / 2 &&
        mouseY > this.y - this.height / 2 &&
        mouseY < this.y + this.height / 2;
};
Button.prototype.handleMouseClick = function () {
    if (this.isMouseInside()) {
        this.onClick();
    }
};
Button.prototype.reactToClick = function () {
    if (this.isClicked) {
        this.width = this.width / 0.95;
        this.height = this.height / 0.95;
        this.color = this.unclickedColor;
        this.isClicked = false;
    }
    else {
        this.width = this.width * 0.95;
        this.height = this.height * 0.95;
        this.color = this.clickedColor;
        this.isClicked = true;
    }
};

var polyButton = new Button({
    x: 51, y: bottomButtonHeight,
    width: 100, height: 62,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 200),
    textColor: color(0, 0, 0),
    label: "Polygon",
    isClicked: false,
    onClick: function () {
        if (modeShape !== ShapeMode.Poly) {
            modeShape = ShapeMode.Poly;
            previewVertices = [];
            polyButton.reactToClick();
        }
        else {
            modeShape = ShapeMode.None;
            previewVertices = []; //clear points
            polyButton.reactToClick();
        }
    }
});
var ellButton = new Button({
    x: 153, y: bottomButtonHeight,
    width: 100, height: 62,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 200),
    textColor: color(0, 0, 0),
    label: "Ellipse",
    isClicked: false,
    onClick: function () {
        if (modeShape !== ShapeMode.Ellipse) {
            modeShape = ShapeMode.Ellipse;
            previewVertices = [];
            ellButton.reactToClick();
        }
        else {
            modeShape = ShapeMode.None;
            previewVertices = []; //clear points
            ellButton.reactToClick();
        }
    }
});
var complexButton = new Button({
    x: 356, y: bottomButtonHeight,
    width: 83, height: 62,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 200),
    textColor: color(0, 0, 0),
    label: "Complex",
    isClicked: false,
    onClick: function () {
        println("Complex shapes coming soon!");
        complexButton.reactToClick();
    }
});
var resetShapeButtons = function (clickedButton) {
    if (clickedButton !== polyButton && polyButton.isClicked) {
        polyButton.reactToClick();
    }
    if (clickedButton !== ellButton && ellButton.isClicked) {
        ellButton.reactToClick();
    }
    if (clickedButton !== complexButton && complexButton.isClicked) {
        complexButton.reactToClick();
    }
};

var strokeButton = new Button({
    x: 80, y: 27,
    width: 40, height: 40,
    color: color(0,0,0),
    unclickedColor: color(0,0,255),
    clickedColor: color(0,0,200),
    outlineColor: color(23, 128, 201),
    textColor: color(0, 0, 0),
    textSize: 12,
    label: "Stroke",
    isClicked: false,
    onClick: function () {
        if (this.isClicked && Stroke) {
            Stroke = false;
            strokeButton.reactToClick();
            this.textSize = 12;
            this.outlineColor = color(23, 128, 201);
        }
        else if (!this.isClicked && !Stroke) {
            Stroke = true;
            strokeButton.reactToClick();
            this.textSize = 11;
            this.outlineColor = color(0,0,0);
        }
    }
});

/*****************
   SHAPE OBJECTS
******************/

//Polygons\\
var POLY = function (corners, fillColor, outlineColor, outline) {
    this.corners = corners;
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outline = outline;
};
POLY.prototype.draw = function (corners, fillColor, outlineColor, outline) {
    stroke(this.outlineColor);
    fill(this.fillColor);
    if (this.outline){strokeWeight(1);}
    else {noStroke();}
    beginShape();
    for (var q in this.corners) {
        vertex(this.corners[q][0], this.corners[q][1]);
    }
    endShape(CLOSE);
}; //poly draw method

//Ellipses\\
var ELL = function (corners, fillColor, outlineColor, outline) {
    this.corners = corners;
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outline = outline;
};
ELL.prototype.draw = function  (corners, fillColor, outlineColor, outline) {
    stroke(this.outlineColor);
    fill(this.fillColor);
    ellipseMode(CORNER);
    if (this.outline){strokeWeight(1);}
    else {noStroke();}
    ellipse(min(this.corners[0][0], this.corners[1][0]), min(this.corners[0][1], this.corners[1][1]),
            abs(this.corners[1][0] - this.corners[0][0]), 
            abs(this.corners[1][1] - this.corners[0][1]));
}; //ell draw method

var HistoryEntryType = {
    AddShape: 0
};
//HistoryEntry\\
var HistoryEntry = function (type, layer, index){
    this.type = type;
    this.layer = layer;
    this.index = index;
};


/****************************
  Functions for cleanliness
*****************************/

//CLICK functions for DRAWING scene\\
var clickBottomMenu = function(){
    modeShape = ShapeMode.None;
    resetShapeButtons();

    polyButton.handleMouseClick();
    ellButton.handleMouseClick();
    complexButton.handleMouseClick();
};
var clickCanvas = function(){
    if (mouseButton === LEFT){
        if (modeShape === ShapeMode.Poly) {
            previewVertices.push([mouseX, mouseY]);
        }
        if (modeShape === ShapeMode.Ellipse && previewVertices.length === 0) {
            previewVertices.push([mouseX, mouseY]);
        }
    }
    else if (mouseButton === RIGHT){
        if (previewVertices.length > 0) {
            if (modeShape === ShapeMode.Poly){
                layers[selectedLayer].shapeList.push(
                    new POLY(previewVertices, 
                             palette[selectedSwatch], 
                             color(0, 0, 0), 
                             Stroke));
            }
            if (modeShape === ShapeMode.Ellipse){
                previewVertices.push([mouseX, mouseY]);
                layers[selectedLayer].shapeList.push(
                    new ELL(previewVertices, 
                            palette[selectedSwatch], 
                            color(0, 0, 0),
                            Stroke));
            }
            actionHistory.push(new HistoryEntry(
                HistoryEntryType.AddShape,
                selectedLayer,
                layers[selectedLayer].shapeList.length - 1
                ));
            previewVertices = []; //clear shape preview
        }
    }
};
var clickPalette = function(){
    if (mouseButton === LEFT){
        if (mouseY < 25) /* top row */ {
            selectedSwatch = (floor(((paletteRightEdge - mouseX) / (paletteRightEdge - paletteLeftEdge)) * ceil(palette.length / 2)));
        }
        else{ /* bottom row */
            selectedSwatch = (floor(((paletteRightEdge - mouseX) / (paletteRightEdge - paletteLeftEdge)) * ceil(palette.length / 2))) + ceil(palette.length / 2);
        }
    }
    else if (mouseButton === RIGHT){
        scene = SceneType.InitColorPicker;
    }
};
var clickLayers = function(){
    for (var i = 0; i < layers.length; i++) {
        var layerY = 75 + (i * 33);
        if (mouseY >= layerY - 12 && mouseY <= layerY + 12) {
            if (mouseButton === LEFT)   {selectedLayer = i;}
            if (mouseButton === RIGHT)  {layers[i].hidden ^= 1;}
            break;
        }
    }
};
var clickTopMenu = function(){
    strokeButton.handleMouseClick();
};

//DRAW functions for DRAWING scene\\
var drawBorder = function(){
    colorMode(RGB);
    stroke(0, 0, 0);
    strokeWeight(1);
    rectMode(CORNER);
    //right side
    fill(201, 156, 100);
    rect(-50, 0, 100, height, 17);
    //left side
    fill(201, 156, 100);
    rect(350, 0, 100, height, 17);
    //bottom menu
    fill(201, 156, 100);
    rect(0, 350, width, 100, 17);
    //top menu
    fill(201, 156, 100);
    rect(0, -50, width, 100, 17);
};
var drawPreview = function(){
    fill(palette[selectedSwatch]);
    if (Stroke){strokeWeight(1);}
    else if (previewVertices.length <= 1) {
        strokeWeight(1);
        stroke(palette[selectedSwatch]);
    }
    else {noStroke();}
    if (modeShape === ShapeMode.Poly) {
        beginShape();
        for (var r in previewVertices) {
            vertex(previewVertices[r][0], previewVertices[r][1]);
        }
        vertex(mouseX, mouseY);
        endShape(CLOSE);
    }
    if (modeShape === ShapeMode.Ellipse) {
        ellipseMode(CORNER);
        if (previewVertices.length === 0){
            ellipse(mouseX,mouseY,2,2);
        }
        else {
            ellipse (min(previewVertices[0][0],mouseX),
                     min(previewVertices[0][1],mouseY), 
                     abs(mouseX - previewVertices[0][0]), 
                     abs(mouseY - previewVertices[0][1]));
        }
    }
};
var drawShapes = function(){
    colorMode(HSB);
    fill(palette[selectedSwatch]);
    for (var l in layers) {
        if (!layers[l].hidden) {
            for (var shape in layers[l].shapeList) {
                layers[l].shapeList[shape].draw();
            }
        }
    }
};
var drawBottomMenu = function(){
    if (modeMenuBottom === MenuBottomType.Default) {
        polyButton.draw();
        ellButton.draw();
        complexButton.draw();
    }
};
var drawSelectedSwatch = function(){
    rectMode(CENTER);
    fill(palette[selectedSwatch]);
    rect(25, 25, 25, 25);
    rectMode(CORNER);
};
var drawPalette = function(){
    rectMode(CENTER);
    for (var l in palette) {
      fill(palette[l]);
      rect(
        380 - (21 * l) + (21 * ceil(palette.length / 2)) * floor((l) / (palette.length / 2)),
        15 + 21 * floor((l) / (palette.length / 2)),
        20, 
        20);
    }
};
var drawLayersUI = function(){
    colorMode(RGB);
    for (var i = 0; i < layers.length; i++) {
        if (i === selectedLayer) { //Highlight if selected
            strokeWeight(2);
            stroke(39, 176, 217);
        } else {                   //Unhighlight if deselected
            strokeWeight(1);
            stroke(0, 0, 0);
        }

        if (layers[i].hidden) {   //Grey out if hidden
            fill(181, 181, 181);
        } else {                  //White if unhidden
            fill(255, 255, 255);
        }
        rect(375, 75 + (i * 33), 25, 25);
        fill(0, 0, 0);
        text(layers.length - i, 375, 75 + (i * 33));
    }
};

//DRAW functions for COLOR PICKER scene\\
var initializeColorPicker = function(){
    //draw vignette
        rectMode(CORNER);
        fill(color(0, 0, 0), 150);
        rect(0, 0, 400, 400);

        //draw color picker
        rectMode(CORNER);
        fill(0, 0, 0);
        noStroke();
        rect(65, 65, 275, 275, 3);
        colorMode(HSB);
        for (var o = 0; o <= 255; o++) {
            for (var p = 0; p <= 255; p++) {
                stroke(o, p, colorPickerBrightness);
                point(o + 75, p + 75);
            }
        }
        scene = SceneType.ColorPickerActive;

        // Reset stroke color
        stroke(0, 0, 0);
};
var drawVignette = function(){
    strokeWeight(2);
    stroke(0, 0, 0);
    rect(75, 25, 256, 26);
};
var drawBrightnessBar = function(){
    strokeWeight(1);
    for (var i = 0; i < 255; i++) {
        stroke(0, 0, i);
        line(75 + (i * 1), 25, 75 + (i * 1), 50);
    }
        
    var brightnessStrWidth = textWidth(colorPickerBrightness);
    fill(0, 0, 50);
    noStroke();
    rect(350 - (brightnessStrWidth / 2) - 5, 23, brightnessStrWidth + 10, 30);
    fill(0, 0, 225);
    text(colorPickerBrightness, 350, 37);
    stroke(0);
    strokeWeight(1);
};

/******************************
 Interactions & Function Calls
*******************************/

mouseClicked = function () {
    if (scene === SceneType.Drawing) {
        //If clicking bottom menu bottons\\
        if (mouseY > 350 && mouseButton === LEFT) {
            clickBottomMenu();
        }
        //If clicking canvas\\
        if (mouseX < 350 && mouseX > 50 && 
                 mouseY < 350 && mouseY > 52) {
                     clickCanvas();}
        //If clicking palette\\
        if (mouseX < paletteRightEdge   && mouseX > paletteLeftEdge && 
            mouseY < 47                 && mouseY > 5) {
                clickPalette();     
        }
        //If clicking layers UI\\
        if (mouseX >= 375 && mouseX <= 400 && mouseY >= 50 && mouseY <= 75 + (25 + 33) * 4) {
            clickLayers();
        }
        //If clicking top menu\\
        if (mouseX <= paletteLeftEdge && mouseY <= 50){
            clickTopMenu();
        }
    }
    
    if (scene === SceneType.ColorPickerActive) {
        //If clicking on the spectrum\\
        if (mouseX >= 75 && mouseX <= 330 &&
            mouseY >= 75 && mouseY <= 330) {
            palette[selectedSwatch] = (get(mouseX, mouseY)); //pick color from picker
            scene = SceneType.Drawing;
        
        //If clicking on the brightness bar\\
        } else if (mouseX >= 75 && mouseX <= 330 && mouseY >= 25 && mouseY <= 50) {
            colorPickerBrightness = mouseX - 75;
            scene = SceneType.InitColorPicker;
            return;
        
        //If clicking off the picker\\
        } else {
            scene = SceneType.Drawing;
        }
    }
};

draw = function () {
    //The || is there so that the vignette isn't redrawn over itself
    if (scene === SceneType.Drawing || scene === SceneType.InitColorPicker){
        //Refresh canvas\\
        colorMode(RGB);
        background(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        
        drawShapes();
        
        if (modeShape !== ShapeMode.none){drawPreview();}
        
        drawBorder();
        
        drawBottomMenu();
        
        drawSelectedSwatch();
        
        drawPalette();
        
        drawLayersUI();
        
        strokeButton.draw();
    }
    
    if (scene === SceneType.InitColorPicker) {initializeColorPicker();}
    
    if (scene === SceneType.ColorPickerActive) {
        drawVignette();
        
        drawBrightnessBar();
    }
};

mouseMoved = function () {
    if (scene === SceneType.ColorPickerActive) {
        if (mouseX >= 75 && mouseX <= 330 && mouseY >= 75 && mouseY <= 330) {
            stroke(0, 0, (colorPickerBrightness + 125) % 255);
            strokeWeight(7);
            fill(get(mouseX, mouseY));
            ellipse(33, 33, 50, 50);
        }
    }
};

keyPressed = function () {
    if (keyCode === 90 && actionHistory.length > 0){ //z
    // println("Undo!"); <- Works!
    var latestAction = actionHistory.length - 1;
    
    layers[actionHistory[latestAction].layer].shapeList.splice(actionHistory[latestAction].index, 1);
    actionHistory.splice(latestAction, 1);
        // println(actionHistory[].layer);
    }
};





