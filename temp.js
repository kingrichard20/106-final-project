background(255, 255, 255);
colorMode(HSB);
/**************
  s VARIABLES
***************/

var colorPickerBrightness = 255;

var ShapeMode = {
    None: 0,
    Quad: 1,
    Triangle: 2,
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

var ptsList = []; //all blanks

var palette = [color(255, 0, 255),     //white
color(0, 255, 255),     //red       0-15
color(25, 255, 255),    //orange    20-35
color(50, 255, 255),    //yellow    40-55
color(75, 255, 255),    //green     75-100
color(150, 255, 255),   //blue      120-180
color(200, 255, 255),   //purple    200-225
color(0, 0, 0)];        //black

var shapeList = [];

//constants\\
var bottomButtonHeight = 400 - 14;
var rightEdge = 390; //right edge of palette
var leftEdge = rightEdge - (21 * ceil(palette.length / 2));

var selectedSwatch = 0;

/**************
  e VARIABLES
***************/

/****************
 s BUTTON OBJECT
*****************/

var Button = function (config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 150;
    this.height = config.height || 50;
    this.color = color(0, 0, 255) || color(0, 0, 255);
    this.unclickedColor = config.unclickedcolor || color(0, 0, 255);
    this.clickedColor = config.clickedColor || color(0, 0, 0);
    this.textColor = config.textColor || color(0, 0, 0);
    this.label = config.label || "HERE'S SOME TEXT";
    this.isClicked = config.isClicked || false;
    this.onClick = config.onClick || function () { println("!"); };
};
Button.prototype.draw = function () {
    fill(this.color);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(255, 255, 255);
    textSize(19);
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
        ptsList = ["", "", "", "", "", "", "", ""]; //clear points
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

var quadButton = new Button({
    x: 51, y: bottomButtonHeight,
    width: 100, height: 62,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 200),
    textColor: color(0, 0, 0),
    label: "Quad",
    isClicked: false,
    onClick: function () {
        if (modeShape !== ShapeMode.Quad) {
            modeShape = ShapeMode.Quad;
            ptsList = ["", "", "", "", "", "", "", ""];
            quadButton.reactToClick();
        }
        else {
            modeShape = ShapeMode.None;
            ptsList = []; //clear points
            quadButton.reactToClick();
        }
    }
});
var triButton = new Button({
    x: 156, y: bottomButtonHeight,
    width: 100, height: 62,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 200),
    textColor: color(0, 0, 0),
    label: "Triangle",
    isClicked: false,
    onClick: function () {
        if (modeShape !== ShapeMode.Triangle) {
            modeShape = ShapeMode.Triangle;
            ptsList = ["", "", "", "", "", ""];
            triButton.reactToClick();
        }
        else {
            modeShape = ShapeMode.None;
            ptsList = []; //clear points
            triButton.reactToClick();
        }
    }
});
var ellButton = new Button({
    x: 261, y: bottomButtonHeight,
    width: 100, height: 62,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 200),
    textColor: color(0, 0, 0),
    label: "Ellipse",
    isClicked: false,
    onClick: function () {
        if (modeShape !== ShapeMode.Ellipse) {
            modeShape = ShapeMode.Ellipse;
            ptsList = ["", ""];
            ellButton.reactToClick();
        }
        else {
            modeShape = ShapeMode.None;
            ptsList = []; //clear points
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
var resetButtons = function (clickedButton) {
    if (clickedButton !== quadButton) {
        if (quadButton.isClicked) { quadButton.reactToClick(); }
    }
    if (clickedButton !== triButton) {
        if (triButton.isClicked) { triButton.reactToClick(); }
    }
    if (clickedButton !== ellButton) {
        if (ellButton.isClicked) { ellButton.reactToClick(); }
    }
    if (clickedButton !== complexButton) {
        if (complexButton.isClicked) { complexButton.reactToClick(); }
    }
};
/****************
 e BUTTON OBJECT
*****************/

/*****************
  s SHAPE OBJECTS
******************/

//QUADRALATERALS\\
var QUADR = function (corners, fillColor, strokeColor) {
    this.corners = corners;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
};
QUADR.prototype.draw = function () {
    stroke(this.strokeColor);
    fill(this.fillColor);
    strokeWeight(2);
    quad(this.corners[0], this.corners[1],
        this.corners[2], this.corners[3],
        this.corners[4], this.corners[5],
        this.corners[6], this.corners[7]);
}; //quad draw method

var TRI = function (corners, fillColor, strokeColor) {
    this.corners = corners;
};
TRI.prototype.draw = function () {
    stroke(this.strokeColor);
    fill(this.fillColor);
    strokeWeight(2);
    triangle(this.corners[0], this.corners[1],
        this.corners[2], this.corners[3],
        this.corners[4], this.corners[5]);
}; //triangle draw method

/*****************
  e SHAPE OBJECTS
******************/

mouseClicked = function () {
    if (mouseButton === LEFT) {
        if (scene === SceneType.Drawing) {
            if (modeMenuBottom === MenuBottomType.Default) {
                if (mouseY > 350) {
                    modeShape = ShapeMode.None;
                    resetButtons();
                }
                quadButton.handleMouseClick();
                triButton.handleMouseClick();
                ellButton.handleMouseClick();
                complexButton.handleMouseClick();
            } //Handle bottom buttons

            //      DEFINING SHAPE PREVIEW      \\
            if (mouseX < 350 && mouseX > 50 &&
                mouseY < 350 && mouseY > 52) {
                //quads
                if (modeShape === ShapeMode.Quad) {
                    for (var i = 0; i < 8; i++) {
                        if (ptsList[i] === "") {
                            ptsList[i] = mouseX;
                            ptsList[i + 1] = mouseY;
                            return;
                        }
                    }
                }
                //tris
                else if (modeShape === ShapeMode.Triangle) {
                    for (var i = 0; i < 6; i++) {
                        if (ptsList[i] === "") {
                            ptsList[i] = mouseX;
                            ptsList[i + 1] = mouseY;
                            return;
                        }
                    }
                }
            } //draw shape

            // Pick color from palette \\
            if (mouseX < rightEdge && mouseX > leftEdge &&
                mouseY < 47 && mouseY > 5) {
                if (mouseY < 25) {
                    selectedSwatch = (floor(((rightEdge - mouseX) / (rightEdge - leftEdge)) * ceil(palette.length / 2)));
                } //top row
                else {
                    selectedSwatch = (floor(((rightEdge - mouseX) / (rightEdge - leftEdge)) * ceil(palette.length / 2))) + ceil(palette.length / 2);
                } //bottom row
                //brushColor =  palette[selectedSwatch];
            }
        }
    }
    if (mouseButton === RIGHT) {
        ptsList = []; //clear shape preview
        if (mouseX < rightEdge && mouseX > leftEdge &&
            mouseY < 47 && mouseY > 5) {
            scene = SceneType.InitColorPicker;
        }
    }
    if (scene === SceneType.ColorPickerActive) {
        if (mouseX >= 75 && mouseX <= 330 &&
            mouseY >= 75 && mouseY <= 330) {
            palette[selectedSwatch] = (get(mouseX, mouseY)); //pick color from picker
            scene = SceneType.Drawing;

        } else if (mouseX >= 75 && mouseX <= 330 && mouseY >= 25 && mouseY <= 50) {
            colorPickerBrightness = mouseX - 75;
            scene = SceneType.InitColorPicker;
            return;
        } else {
            scene = SceneType.Drawing;
        }
    }

};

//      DRAW SHAPES      \\
draw = function () {
    if (scene !== SceneType.ColorPickerActive) {
        colorMode(RGB);
        background(255, 255, 255);
        strokeWeight(1);

        for (var k in shapeList) {
            fill(shapeList[k].fillColor);
            quad(shapeList[k].corners[0], shapeList[k].corners[1],
                shapeList[k].corners[2], shapeList[k].corners[3],
                shapeList[k].corners[4], shapeList[k].corners[5],
                shapeList[k].corners[6], shapeList[k].corners[7]);
        } //draw placed shapes
        colorMode(HSB);
        fill(palette[selectedSwatch]);
        if (modeShape === ShapeMode.Quad) {
            if (ptsList[7] === "") {
                if (ptsList[5] === "") {
                    if (ptsList[3] === "") {
                        if (ptsList[1] === "") {
                            quad(
                                mouseX, mouseY,
                                mouseX, mouseY,
                                mouseX, mouseY,
                                mouseX, mouseY);
                        }
                        else {
                            quad(
                                ptsList[0], ptsList[1],
                                mouseX, mouseY,
                                mouseX, mouseY,
                                mouseX, mouseY);
                        }
                    }
                    else {
                        quad(
                            ptsList[0], ptsList[1],
                            ptsList[2], ptsList[3],
                            mouseX, mouseY,
                            mouseX, mouseY);
                    }
                }
                else {
                    quad(
                        ptsList[0], ptsList[1],
                        ptsList[2], ptsList[3],
                        ptsList[4], ptsList[5],
                        mouseX, mouseY);
                }
            }
            else {
                shapeList.push(new QUADR([ptsList[0], ptsList[1],
                ptsList[2], ptsList[3],
                ptsList[4], ptsList[5],
                ptsList[6], ptsList[7]],
                    palette[selectedSwatch],
                    color(0, 0, 0)
                ));
                ptsList = ["", "", "", "", "", "", "", ""];
            }
        } //draw quad preview
        if (modeShape === ShapeMode.Triangle) {
            if (ptsList[5] === "") {
                if (ptsList[3] === "") {
                    if (ptsList[1] === "") {
                        triangle(
                            mouseX, mouseY,
                            mouseX, mouseY,
                            mouseX, mouseY);
                    }
                    else {
                        triangle(
                            ptsList[0], ptsList[1],
                            mouseX, mouseY,
                            mouseX, mouseY);
                    }
                }
                else {
                    triangle(
                        ptsList[0], ptsList[1],
                        ptsList[2], ptsList[3],
                        mouseX, mouseY);
                }
            }
            else {
                shapeList.push(new TRI([ptsList[0], ptsList[1],
                ptsList[2], ptsList[3],
                ptsList[4], ptsList[5]
                ],

                    palette[selectedSwatch]));
                ptsList = ["", "", "", "", "", ""];
            }
        }//draw tri preview
        //BORDER\\
        colorMode(RGB);
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

        if (modeMenuBottom === MenuBottomType.Default) {
            quadButton.draw();
            triButton.draw();
            ellButton.draw();
            complexButton.draw();
        } //draw buttons

        //draw selected color shower thingy
        rectMode(CENTER);
        fill(palette[selectedSwatch]);
        rect(25, 25, 25, 25);
        rectMode(CORNER);

        rectMode(CENTER);
        for (var l in palette) {
            fill(palette[l]);
            rect(380 - (21 * l) + (21 * ceil(palette.length / 2)) * floor((l) / (palette.length / 2)),
                15 + 21 * floor((l) / (palette.length / 2)),
                20, 20);
        }
        if (scene === SceneType.InitColorPicker) {

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
        }

    }
    else {
        strokeWeight(2);
        stroke(0, 0, 0);
        rect(75, 25, 256, 26);

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
