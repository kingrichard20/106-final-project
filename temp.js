background(255, 255, 255);
colorMode(HSB);
/**************
  s VARIABLES
***************/

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

var ptsList = []; //all blanks

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
var paletteRightEdge = 390; //right edge of palette
var paletteLeftEdge = paletteRightEdge - (21 * ceil(palette.length / 2));

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
        ptsList = []; //clear points
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
            ptsList = [];
            polyButton.reactToClick();
        }
        else {
            modeShape = ShapeMode.None;
            ptsList = []; //clear points
            polyButton.reactToClick();
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
    if (clickedButton !== polyButton) {
        if (polyButton.isClicked) { polyButton.reactToClick(); }
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

var POLY = function (corners, fillColor, strokeColor) {
    this.corners = corners;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
};
POLY.prototype.draw = function (corners, fillColor, strokeColor) {
    stroke(this.strokeColor);
    fill(this.fillColor);
    strokeWeight(1);
    beginShape();
    for (var q in this.corners) {
        vertex(this.corners[q][0], this.corners[q][1]);
    }
    endShape(CLOSE);
}; //poly draw method

/*****************
  e SHAPE OBJECTS
******************/

mouseClicked = function () {
    if (scene === SceneType.Drawing) {
        if (mouseButton === LEFT) {
            if (mouseY > 350) {
                modeShape = ShapeMode.None;
                resetButtons();

                //Handle bottom menu buttons
                polyButton.handleMouseClick();
                triButton.handleMouseClick();
                ellButton.handleMouseClick();
                complexButton.handleMouseClick();
            }

            //      DEFINING SHAPE PREVIEW      \\
            if (mouseX < 350 && mouseX > 50 &&
                mouseY < 350 && mouseY > 52) {
                if (modeShape === ShapeMode.Poly) {
                    ptsList.push([mouseX, mouseY]);
                }
            } //draw shape

            // Pick color from palette \\
            if (mouseX < paletteRightEdge && mouseX > paletteLeftEdge &&
                mouseY < 47 && mouseY > 5) {
                if (mouseY < 25) {
                    selectedSwatch = (floor(((paletteRightEdge - mouseX) / (paletteRightEdge - paletteLeftEdge)) * ceil(palette.length / 2)));
                } //top row
                else {
                    selectedSwatch = (floor(((paletteRightEdge - mouseX) / (paletteRightEdge - paletteLeftEdge)) * ceil(palette.length / 2))) + ceil(palette.length / 2);
                } //bottom row
                //brushColor =  palette[selectedSwatch];
            }

            if (mouseX >= 375 && mouseX <= 400 && mouseY >= 50 && mouseY <= 75 + (25 + 33) * 4) {
                for (var i = 0; i < layers.length; i++) {
                    var layerY = 75 + (i * 33);
                    if (mouseY >= layerY - 12 && mouseY <= layerY + 12) {
                        selectedLayer = i;
                        break;
                    }
                }
            }

        }




        if (mouseButton === RIGHT) {
            if (ptsList.length > 0) {
                layers[selectedLayer].shapeList.push(new POLY(ptsList, palette[selectedSwatch], color(0, 0, 0)));
                ptsList = []; //clear shape preview
                // return;
            }
            if (mouseX < paletteRightEdge && mouseX > paletteLeftEdge && mouseY < 47 && mouseY > 5) {
                scene = SceneType.InitColorPicker;
            }

            if (mouseX >= 375 && mouseX <= 400 && mouseY >= 50 && mouseY <= 75 + (25 + 33) * 4) {
                for (var i = 0; i < layers.length; i++) {
                    var layerY = 75 + (i * 33);
                    if (mouseY >= layerY - 12 && mouseY <= layerY + 12) {
                        layers[i].hidden ^= 1;
                        break;
                    }
                }
            }

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
        stroke(0, 0, 0);
        strokeWeight(1);

        colorMode(HSB);
        fill(palette[selectedSwatch]);
        for (var l in layers) {
            if (!layers[l].hidden) {
                for (var shape in layers[l].shapeList) {
                    layers[l].shapeList[shape].draw();
                }
            }
        }

        //DRAW POLYGON PREVIEW\\
        fill(palette[selectedSwatch]);
        if (modeShape === ShapeMode.Poly) {
            beginShape();
            for (var r in ptsList) {
                vertex(ptsList[r][0], ptsList[r][1]);
            }
            vertex(mouseX, mouseY);
            endShape(CLOSE);
        }

        //BORDER\\
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

        if (modeMenuBottom === MenuBottomType.Default) {
            polyButton.draw();
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

        for (var i = 0; i < layers.length; i++) {

            if (i === selectedLayer) {
                strokeWeight(2);
                stroke(39, 176, 217);
            } else {
                strokeWeight(1);
                stroke(0, 0, 0);
            }

            if (layers[i].hidden) {
                fill(181, 181, 181);
            } else {
                fill(255, 255, 255);
            }
            rect(375, 75 + (i * 33), 25, 25);
            fill(0, 0, 0);
            text(layers.length - i, 375, 75 + (i * 33));

        }
        stroke(0, 0, 0);
        strokeWeight(1);

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
