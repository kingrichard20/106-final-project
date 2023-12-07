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
    Line: 4
};
var modeShape = ShapeMode.None;

var SceneType = {
    Drawing: 0,
    InitColorPicker: 1,
    ColorPickerActive: 2,
    Eyedropper: 3,
    InfoScreen: 4
};
var scene = SceneType.Drawing;

var MenuBottomType = {
    Default: 0
};
var modeMenuBottom = MenuBottomType.Default;

var brushColor = color(0, 0, 255);

var outline = false;

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
    color(0, 255, 255),     //red       0-15
    color(25, 255, 255),    //orange    20-35
    color(50, 255, 255),    //yellow    40-55
    color(75, 255, 255),    //green     75-100
    color(150, 255, 255),   //blue      120-180
    color(200, 255, 255),   //purple    200-225
    color(250, 100, 255),   //pink
    color(25, 150, 150),    //brown
    color(125, 255, 255),   //cyan
    color(0, 0, 0),         //black
    color(255, 0, 255),     //white
    0];                     //transparent (keep at the end plz)

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
        this.reactToClick();
        this.onClick();
    }
};
Button.prototype.reactToClick = function () {
    if (this.isClicked) {
        this.width = this.width / 0.95;
        this.height = this.height / 0.95;
        this.color = this.unclickedColor;
    }
    else {
        this.width = this.width * 0.95;
        this.height = this.height * 0.95;
        this.color = this.clickedColor;
    }
    this.isClicked^=1;
};

//Buttom bottons\\
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
        }
        else {
            modeShape = ShapeMode.None;
            previewVertices = []; //clear points
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
        }
        else {
            modeShape = ShapeMode.None;
            previewVertices = []; //clear points
        }
    }
});
var lineButton = new Button({
    x: 246, y: bottomButtonHeight,
    width: 83, height: 62,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 200),
    textColor: color(0, 0, 0),
    label: "Line",
    isClicked: false,
    onClick: function () {
        if (modeShape !== ShapeMode.Line) {
            modeShape = ShapeMode.Line;
            previewVertices = [];
        }
        else {
            modeShape = ShapeMode.None;
            previewVertices = []; //clear points
        }
    }
});
var resetShapeButtons = function (clickedButton) {
    if (clickedButton !== polyButton && polyButton.isClicked) {
        polyButton.reactToClick();
    }
    if (clickedButton !== ellButton && ellButton.isClicked) {
        ellButton.reactToClick();
    }
    if (clickedButton !== lineButton && lineButton.isClicked) {
        lineButton.reactToClick();
    }
};

var infoButton = new Button({
    x: 375, y: 375,
    width: 33, height: 33,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 200),
    textColor: color(0, 0, 0),
    label: "i",
    isClicked: false,
    onClick: function () {
        println("HERE'S SOME INFO");
    }
});

//Top bottons\\
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
        if (this.isClicked &&outline) {
           outline = false;
            this.textSize = 12;
            this.outlineColor = color(23, 128, 201);
        }
        else if (!this.isClicked && !outline) {
           outline = true;
            this.textSize = 11;
            this.outlineColor = color(0,0,0);
        }
    }
});
var eyedropperButton = new Button({
    x: 146, y: 27,
    width: 40, height: 40,
    color: color(0,0,0),
    unclickedColor: color(0,0,255),
    clickedColor: color(0,0,200),
    outlineColor: color(23, 128, 201),
    textColor: color(0, 0, 0),
    textSize: 12,
    label: "Pick",
    isClicked: false,
    onClick: function () {
        scene = scene === SceneType.Eyedropper ? SceneType.Drawing : SceneType.Eyedropper;
    }
});


/*****************
   SHAPE OBJECTS
******************/

//Polygons\\
var POLY = function (vertices, fillColor, outlineColor, outline) {
    this.vertices = vertices;
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outline = outline;
};
POLY.prototype.draw = function (vertices, fillColor, outlineColor, outline) {
    stroke(this.outlineColor);
    if (this.fillColor === 0){noFill();}
    else{fill(this.fillColor);}
    if (this.outline){strokeWeight(1);}
    else {noStroke();}
    beginShape();
    for (var q in this.vertices) {
        vertex(this.vertices[q][0], this.vertices[q][1]);
    }
    endShape(CLOSE);
}; //poly draw method

//Ellipses\\
var ELL = function (vertices, fillColor, outlineColor, outline) {
    this.vertices = vertices;
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outline = outline;
};
ELL.prototype.draw = function  (vertices, fillColor, outlineColor, outline) {
    stroke(this.outlineColor);
    if (this.fillColor === 0){noFill();}
    else{fill(this.fillColor);}
    ellipseMode(CENTER);
    if (this.outline){strokeWeight(1);}
    else {noStroke();}
    ellipse(this.vertices[0][0], this.vertices[0][1],
            abs(this.vertices[1][0] - this.vertices[0][0]) * 2, 
            abs(this.vertices[1][1] - this.vertices[0][1]) * 2);
}; //ell draw method

//Lines\\
var LIN = function (vertices, color){
    this.vertices = vertices;
    this.color = color;
};
LIN.prototype.draw = function() {
    stroke(this.color);
    line(this.vertices[0][0], this.vertices[0][1], this.vertices[1][0], this.vertices[1][1]);
};

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
    lineButton.handleMouseClick();
    
    infoButton.handleMouseClick();
};
var clickCanvas = function(){
    if (mouseButton === LEFT){
        
        if(scene === SceneType.Eyedropper) {
            palette[selectedSwatch] = (get(mouseX, mouseY));
            eyedropperButton.reactToClick();
            scene = SceneType.Drawing;
            return;
        }
        
        if (modeShape === ShapeMode.Poly) {
            previewVertices.push([mouseX, mouseY]);
        }
        if (modeShape === ShapeMode.Ellipse && previewVertices.length === 0) {
            previewVertices.push([mouseX, mouseY]);
        }
        if (modeShape === ShapeMode.Line && previewVertices.length === 0) {
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
                            outline));
            }
            if (modeShape === ShapeMode.Ellipse){
                previewVertices.push([mouseX, mouseY]);
                layers[selectedLayer].shapeList.push(
                    new ELL(previewVertices, 
                            palette[selectedSwatch], 
                            color(0, 0, 0),
                           outline));
            }
            if (modeShape === ShapeMode.Line){
                previewVertices.push([mouseX, mouseY]);
                layers[selectedLayer].shapeList.push(
                    new LIN(previewVertices, 
                            palette[selectedSwatch]
                            ));      
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
        if (palette[(floor(((paletteRightEdge - mouseX) / (paletteRightEdge - paletteLeftEdge)) * ceil(palette.length / 2))) + ceil(palette.length / 2)] !== 0){
        scene = SceneType.InitColorPicker;
        }
        
    }
};
var clickLayers = function(){
    //top = 62
    if (mouseButton === LEFT)   {selectedLayer = floor((mouseY - 64)/25);}
    if (mouseButton === RIGHT)  {layers[floor((mouseY - 64)/25)].hidden ^= 1;}
};
var clickTopMenu = function(){
    strokeButton.handleMouseClick();
    eyedropperButton.handleMouseClick();
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
    if (palette[selectedSwatch] === 0){noFill();}
    else{fill(palette[selectedSwatch]);}
    if (modeShape === ShapeMode.Poly) {
        if (outline){strokeWeight(1);}
        else if (previewVertices.length <= 1) {
        strokeWeight(1);
        stroke(palette[selectedSwatch]);
    }
    else {noStroke();}
        beginShape();
        for (var r in previewVertices) {
            vertex(previewVertices[r][0], previewVertices[r][1]);
        }
        vertex(mouseX, mouseY);
        endShape(CLOSE);
    }
    if (modeShape === ShapeMode.Ellipse) {
        if (outline){
            stroke(0, 0, 0);
            strokeWeight(1);}
        else {noStroke();}
        ellipseMode(CENTER);
        if (previewVertices.length === 0){
            ellipse(mouseX,mouseY,2,2);
        }
        else {
            ellipse (previewVertices[0][0],
                     previewVertices[0][1], 
                     abs(mouseX - previewVertices[0][0]) * 2, 
                     abs(mouseY - previewVertices[0][1]) * 2);
        }
    }
    if (modeShape === ShapeMode.Line){
        if (palette[selectedSwatch] === 0){noStroke();}
        else{
            stroke(palette[selectedSwatch]);
            strokeWeight(1);}
        if (previewVertices.length === 0){
            point(mouseX, mouseY);
        }
        else {
            line(previewVertices[0][0], previewVertices[0][1],
                 mouseX, mouseY);
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
        lineButton.draw();
        
        infoButton.draw();
    }
};
var drawSelectedSwatch = function(){
    rectMode(CENTER);
    if (palette[selectedSwatch] !== 0){
        fill(palette[selectedSwatch]);
    }
    else {
        noStroke();
        fill(0,0,200); //light grey
            rect(25,25,25,25);
        fill(255,0,255); //white
            rect(20,20,12,12);
            rect(32,32,13,13);
        
        stroke(0,0,0);
        noFill();
    }
    rect(25, 25, 25, 25);
    rectMode(CORNER);
};
var drawPalette = function(){
    rectMode(CENTER);
    for (var l in palette) {
      if (palette[l] !== 0){fill(palette[l]);}
      else{fill(0,0,200);}
      rect(
        380 - (21 * l) + (21 * ceil(palette.length / 2)) * floor((l) / (palette.length / 2)),
        15 + 21 * floor((l) / (palette.length / 2)),
        20, 
        20);
    }
    fill(255, 0, 255);
    noStroke();
    rectMode(CORNER);
    rect(
        380 - (21 * palette.length/2) + 21,
        15 + 21 + 1,
        10, 
        9);
    rect(
        380 - (21 * palette.length/2) + 12,
        15 + 21 - 9,
        9, 
        10);
    rectMode(CENTER);
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
        rect(375, 75 + (i * 26), 25, 25);
        fill(0, 0, 0);
        text(layers.length - i, 375, 75 + (i * 26));
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

//Export functions\\
var centerX = 200;
var centerY = 200;
var px = function(n){return n - centerX;}; //for cleanliness
var py = function(n){return n - centerY;};

var exportPicture = function() {
    var result = "";
    var indent = "    ";
    
    result += "var " + "myDrawing" + " = function(x, y, size){";
    result += "\n" + indent + "var p = 100/size;";
    result += "\n\n" + indent + "colorMode(HSB);";
    result += "\n" + indent + "ellipseMode(CENTER);";
    for (var i in layers){ //for every layer
        result  += "\n" + "\n" + indent + "//layer " + i;
        for (var j in layers[i].shapeList){ //for every shape
                if (layers[i].shapeList[j].outline){result += "\n" + indent + "strokeWeight(1);";}
                else {result += "\n" + indent + "noStroke();";}
                if (layers[i].shapeList[j] instanceof POLY){
                        if (layers[i].shapeList[j].fillColor === 0){result += "\n" + indent + "noFill();";}
                        else {
                            result += "\n" + indent + "fill(" + hue(layers[i].shapeList[j].fillColor) + ", " + saturation(layers[i].shapeList[j].fillColor) + ", " + brightness(layers[i].shapeList[j].fillColor) + ");";
                        }
                        result += "\n" + indent + "beginShape();";
                        for (var k in layers[i].shapeList[j].vertices){
                        result += "\n" + indent + "vertex(" + px(layers[i].shapeList[j].vertices[k][0]) + " / p" + " + x" + ", " + py(layers[i].shapeList[j].vertices[k][1]) + " / p" + " + y" + ");";
                        }
                    result += "\n" + indent + "endShape(CLOSE);\n";
                }
                if (layers[i].shapeList[j] instanceof ELL){
                    if (layers[i].shapeList[j].fillColor === 0){result += "\n" + indent + "noFill();";}
                        else {
                            result += "\n" + indent + "fill(" + hue(layers[i].shapeList[j].fillColor) + ", " + saturation(layers[i].shapeList[j].fillColor) + ", " + brightness(layers[i].shapeList[j].fillColor) + ");";
                        }

                result += "\n" + indent + "ellipse(" + 
                px(layers[i].shapeList[j].vertices[0][0]) + " / p" + " + x " + ", " + 
                py(layers[i].shapeList[j].vertices[0][1]) + " / p" + " + y " + ", " + 
                abs(layers[i].shapeList[j].vertices[1][0] - 
                    layers[i].shapeList[j].vertices[0][0]) + " * 2" + " / p" + ", " + 
                abs(layers[i].shapeList[j].vertices[1][1] - 
                    layers[i].shapeList[j].vertices[0][1]) + " * 2" + " / p" + ");";
            }
                if (layers[i].shapeList[j] instanceof LIN){
                result += "\n" + indent + "stroke(" + hue(layers[i].shapeList[j].color) + ", " + saturation(layers[i].shapeList[j].color) + ", " + brightness(layers[i].shapeList[j].color) + ");";
                    result += "\n" + indent + "line(" + layers[i].shapeList[j].vertices[0][0] + ", " + layers[i].shapeList[j].vertices[0][1] + ", " + layers[i].shapeList[j].vertices[1][0] + ", " + layers[i].shapeList[j].vertices[1][1] + ");";
                }
        }
    }
    result += "\n\ncolorMode(RGB);";
    result += "\nellipseMode(CORNER);";
    result += "\n};";
    result += "\n\n\n" + "myDrawing" + "(200,200,100);";
    println(result);
};

/******************************
 Interactions & Function Calls
*******************************/

mouseClicked = function () {
    if (scene === SceneType.Drawing || scene === SceneType.Eyedropper) {
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
        if (mouseX >= 360 && mouseX <= 390 && mouseY >= 64 && mouseY <= 192) {
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
    if (scene === SceneType.Drawing || scene === SceneType.InitColorPicker || scene === SceneType.Eyedropper){
        //Refresh canvas\\
        colorMode(RGB);
        background(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        
        drawShapes();
        
        if (modeShape !== ShapeMode.none && scene !== SceneType.Eyedropper){drawPreview();}
        
        drawBorder();
        
        drawBottomMenu();
        
        drawSelectedSwatch();
        
        drawPalette();
        
        drawLayersUI();
        
        strokeButton.draw();
        
        eyedropperButton.draw();
    }
    
    if(scene === SceneType.Eyedropper && mouseX < 350 && mouseX > 50 && mouseY < 350 && mouseY > 52) {
        stroke(0);
        triangle(mouseX + 2, mouseY - 2, 
                 mouseX + 13, mouseY + -33, 
                 mouseX + 27, mouseY - 10);
        fill(get(mouseX,mouseY));
        ellipseMode(CENTER);
        ellipse(mouseX + 22, mouseY - 22, 33, 33);
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
    var latestAction = actionHistory.length - 1;
    
    layers[actionHistory[latestAction].layer].shapeList.splice(actionHistory[latestAction].index, 1);
    actionHistory.splice(latestAction, 1);
    }
    
    if (keyCode === 69){
        exportPicture();
    }
    
    // m
    if (keyCode === 77){
        for (var i in layers) {
            for (var s in layers[i].shapeList) {
                for (var v in layers[i].shapeList[s].vertices) {
                    var diffX = 200 - mouseX;
                    var diffY = 200 - mouseY;
                    layers[i].shapeList[s].vertices[v][0] += diffX;
                    layers[i].shapeList[s].vertices[v][1] += diffY;
                }
            }
        }
    }
};
