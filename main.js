function NathanBitmoji(args) {

    // Many nested objects have x, y, w, and h fields.
    this.props = {
        // Properties x, y, h, and shirt are already in args but I guess it's good to have them in the same place.
        x: args.x,
        y: args.y,
        size: args.h,
        head: {
            width: Math.floor(args.h / 2),
            height: Math.floor(args.h * 0.66),
            hairHeight: 0,
            face: {
                x: 0,
                w: 0,
                h: 0,
                eyebrows: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                },
                nose: {
                    y: 0,
                    h: 0,
                    w: 0,
                    endW: 0
                },
                mouth: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                }
            }
        },
        mandible: {
            y: 0,
            height: 0
        },
        neck: {
            x: 0,
            width: Math.floor(args.h / 2) * 0.66,
            endY: 0,
            triangleEndY: 0
        },
        shirt: {
            color: args.shirt.color,
            height: Math.floor(args.h * 0.33),
            initials: args.shirt.initials
        }
    };
}
NathanBitmoji.prototype.drawNeck = function () {

    fill(0x7e, 0x4f, 0x36);

    rect(
        this.props.x - (this.props.neck.width / 2),
        this.props.head.face.y + this.props.head.face.h,
        this.props.neck.width,
        this.props.head.face.h
    );

    this.props.neck.x = this.props.x - (this.props.neck.width / 2);

    this.props.neck.endY = this.props.y - (this.props.size / 2) + this.props.head.height;

    this.props.neck.triangleEndY = this.props.neck.endY + Math.floor(this.props.neck.width * 0.5);

    fill(215, 148, 132);
    triangle(
        this.props.x - (this.props.neck.width / 2),
        this.props.neck.endY,
        this.props.x + (this.props.neck.width / 2),
        this.props.neck.endY,
        this.props.x,
        this.props.neck.triangleEndY
    );

    // debugDrawPoint(
    //     this.props.x - (this.props.neck.width / 2), 
    //     this.props.head.face.y + this.props.head.face.h, 
    //     color(0, 200, 255)
    // );
};
NathanBitmoji.prototype.drawSideburns = function (faceOffset) {
    fill(41, 36, 30);
    triangle(
        this.props.x - (this.props.head.width / 2), this.props.head.face.y,
        this.props.head.face.x, this.props.head.face.y,
        this.props.head.face.x, this.props.head.face.y + this.props.head.face.h
    );
    triangle(
        (this.props.x + this.props.head.width / 2), this.props.head.face.y,
        (this.props.x + this.props.head.width / 2) - (faceOffset / 2), this.props.head.face.y,
        (this.props.x + this.props.head.width / 2) - (faceOffset / 2), this.props.head.face.y + this.props.head.face.h
    );
};
NathanBitmoji.prototype.drawMandible = function () {

    var mandibleHeight = Math.floor(this.props.head.face.h * 1.66);

    strokeWeight(2);
    stroke(41, 36, 30);

    fill(0xbe, 0x7b, 0x6b);
    arc(
        this.props.x, (this.props.head.face.y + this.props.head.face.h),
        this.props.head.face.w, mandibleHeight,
        0, 180
    );

    // debugDrawPoint(this.props.x, (this.props.head.face.y + this.props.head.face.h), color(0, 200, 255));
};
NathanBitmoji.prototype.drawEyebrows = function () {
    fill(0x3d, 0x38, 0x32);

    var eyebrowWidth = Math.floor(this.props.head.face.w * 0.33);
    var eyebrowHeight = Math.floor(eyebrowWidth / 5);

    this.props.head.face.eyebrows.w = eyebrowWidth;
    this.props.head.face.eyebrows.h = eyebrowHeight;

    noStroke();
    rect(
        this.props.head.face.x + eyebrowHeight,
        this.props.head.face.y + eyebrowHeight,
        eyebrowWidth, eyebrowHeight
    );

    rect(
        this.props.head.face.x + this.props.head.face.w - eyebrowHeight - eyebrowWidth,
        this.props.head.face.y + eyebrowHeight,
        eyebrowWidth, eyebrowHeight
    );

    // debugDrawPoint(this.props.head.face.x + eyebrowHeight, this.props.head.face.y, color(0, 200, 255));
    // debugDrawPoint(
    //     this.props.head.face.x + this.props.head.face.w - eyebrowHeight - eyebrowWidth, 
    //     this.props.head.face.y,
    //     color(0, 200, 255)
    // );

};
NathanBitmoji.prototype.drawEyes = function () {

    noStroke();

    var eyebrowW = this.props.head.face.eyebrows.w;
    var eyebrowH = this.props.head.face.eyebrows.h;

    var eye1X = (this.props.head.face.x + eyebrowH + eyebrowW / 2) + Math.floor(eyebrowW * 0.125);
    var eye2X = (this.props.head.face.x + this.props.head.face.w - eyebrowH - eyebrowW / 2) - Math.floor(eyebrowW * 0.125);

    var eyeY = this.props.head.face.y + this.props.head.face.eyebrows.h * 3.5;

    var eyeW = Math.floor(eyebrowW * 0.75);
    var eyeH = eyebrowH * 2;

    fill(255, 255, 255);
    ellipse(eye1X, eyeY, eyeW, eyeH);
    ellipse(eye2X, eyeY, eyeW, eyeH);

    fill(59, 27, 11);
    ellipse(
        eye1X,
        eyeY,
        eyeH,
        eyeH
    );
    ellipse(
        eye2X,
        eyeY,
        eyeH,
        eyeH
    );

    this.props.head.face.nose.y = eyeY + Math.ceil(eyeH / 2);
    this.props.head.face.nose.w = Math.floor(this.props.head.face.h * 0.2);
    this.props.head.face.nose.h = Math.floor(this.props.head.face.h * 0.33);

};
NathanBitmoji.prototype.drawNose = function () {

    fill(0xec, 0xbb, 0xb7);

    // Let's make things easier for a bit.

    ellipse(
        this.props.x,
        this.props.head.face.nose.y,
        this.props.head.face.nose.w,
        this.props.head.face.nose.w
    );
    rect(
        this.props.x - (this.props.head.face.nose.w / 2),
        this.props.head.face.nose.y,
        this.props.head.face.nose.w,
        this.props.head.face.nose.h
    );

    ellipse(
        this.props.x,
        this.props.head.face.nose.y + this.props.head.face.nose.h,
        this.props.head.face.nose.w * 2,
        this.props.head.face.nose.w
    );

    // debugDrawPoint(this.props.x, this.props.head.face.nose.y, color(0, 200, 255));
    // debugDrawPoint(this.props.x, this.props.head.face.nose.y + this.props.head.face.nose.h , color(0, 200, 255));

};
NathanBitmoji.prototype.drawMouth = function () {
    var mouthY = this.props.y - (this.props.head.face.nose.h / 2);

    stroke(129, 50, 53);
    fill(0xb3, 0x64, 0x67);

    this.props.head.face.mouth.w = (this.props.head.width / 2.5);
    this.props.head.face.mouth.h = (this.props.head.face.eyebrows.h * 1.5);

    this.props.head.face.mouth.x = this.props.x - (this.props.head.face.mouth.w / 2);
    this.props.head.face.mouth.y = mouthY;

    arc(
        this.props.x,
        mouthY,
        this.props.head.face.mouth.w,
        this.props.head.face.mouth.h * 2,
        0, 180
    );
    line(
        this.props.x - (this.props.head.face.mouth.w / 2),
        mouthY,
        this.props.x + (this.props.head.face.mouth.w / 2),
        mouthY
    );

};
NathanBitmoji.prototype.drawFacialHair = function () {

    strokeWeight(2);
    stroke(0x3d, 0x38, 0x32);
    line(
        this.props.head.face.mouth.x + (this.props.head.face.mouth.h / 2),
        this.props.head.face.mouth.y - (this.props.head.face.mouth.h / 2),
        this.props.x,
        this.props.head.face.mouth.y - (this.props.head.face.mouth.h * 0.75)
    );
    line(
        this.props.x,
        this.props.head.face.mouth.y - (this.props.head.face.mouth.h * 0.75),
        this.props.head.face.mouth.x + this.props.head.face.mouth.w - (this.props.head.face.mouth.h / 2),
        this.props.head.face.mouth.y - (this.props.head.face.mouth.h / 2)
    );
    strokeWeight(2);

};
NathanBitmoji.prototype.drawFace = function () {
    var faceOffset = this.props.head.width * 0.125;

    var faceX = (this.props.x - this.props.head.width / 2) + (faceOffset / 2);
    var faceHeight = (this.props.head.height - this.props.head.hairHeight) * 0.5;
    var faceWidth = (this.props.head.width - faceOffset);

    this.props.head.face.x = faceX;
    this.props.head.face.w = faceWidth;
    this.props.head.face.h = faceHeight;

    this.drawSideburns(faceOffset);

    fill(0xbe, 0x7b, 0x6b);
    rect(faceX, this.props.head.face.y, faceWidth, faceHeight);

    // We have to call this so we can draw my mandible over it.
    this.drawNeck();
};
NathanBitmoji.prototype.drawHair = function () {
    // My hair color.
    fill(0x3d, 0x38, 0x32);

    var hairHeight = Math.floor(this.props.head.height / 3.5);
    var hairlineY = this.props.y - (this.props.size / 2) + (hairHeight);

    // This NathanBitmoji.prototype.is dumb
    arc(
        this.props.x,
        hairlineY,
        this.props.head.width,
        hairHeight * 2,
        -180,
        0
    );

    for (var i = -1; i < 2; i += 2) {

        triangle(
            this.props.x + ((this.props.head.width / 2) * i),
            hairlineY,
            this.props.x + ((this.props.head.width / 3) * i),
            hairlineY - hairHeight,
            this.props.x + ((this.props.head.width / 6) * i),
            hairlineY
        );

        triangle(
            this.props.x + ((this.props.head.width / 2) * i),
            hairlineY,
            this.props.x + ((this.props.head.width / 2) * i),
            hairlineY - hairHeight * 0.66,
            this.props.x + ((this.props.head.width / 3) * i),
            hairlineY
        );
    }

    // References!!!
    this.props.head.face.y = hairlineY;
    this.props.head.hairHeight = hairHeight;
};
NathanBitmoji.prototype.drawInitials = function () {

    fill(200, 200, 200);

    textSize(Math.ceil(this.props.neck.width * 0.75));
    textAlign(CENTER, CENTER);

    text("N", this.props.x - (this.props.neck.width), this.props.y + (this.props.neck.width));
    text("F", this.props.x + (this.props.neck.width), this.props.y + (this.props.neck.width));
};
NathanBitmoji.prototype.drawShirt = function () {
    noStroke();
    fill(this.props.shirt.color);

    beginShape();
    // Left half.
    vertex(this.props.x - (this.props.neck.width / 2), this.props.neck.endY);
    vertex(this.props.x - (this.props.size / 2), this.props.neck.endY);
    vertex(this.props.x - (this.props.size / 2), this.props.y + (this.props.size / 2));
    vertex(this.props.x, this.props.y + (this.props.size / 2));
    vertex(this.props.x, this.props.neck.triangleEndY);
    // Right half.
    vertex(this.props.x + (this.props.neck.width / 2), this.props.neck.endY);
    vertex(this.props.x + (this.props.size / 2), this.props.neck.endY);
    vertex(this.props.x + (this.props.size / 2), this.props.y + (this.props.size / 2));
    vertex(this.props.x, this.props.y + (this.props.size / 2));
    vertex(this.props.x, this.props.neck.triangleEndY);
    endShape(CLOSE);

    if (this.props.shirt.initials) {
        this.drawInitials();
    }

};
NathanBitmoji.prototype.draw = function () {
    noStroke();

    this.drawHair();
    this.drawFace();
    this.drawMandible();
    this.drawEyebrows();
    this.drawEyes();
    this.drawNose();
    this.drawMouth();
    this.drawFacialHair();
    this.drawShirt();

    stroke(0);
};



/*
 *
 *
 *
 * Bitmoji, ignore above ^
 *
 *
 *
 */
var nathan = new NathanBitmoji({ x: 323, y: 325, h: 150, shirt: { color: color(0x4f, 0x5b, 0x67), initials: true } });


/**************************
START AUSTIN BITMOJI CODE
**************************/

//instantiates the bitmoji object type
var bitmoji = function(x,y,h,clothesColorL,clothesColorD,initials){ 
    this.x = x;
    this.y = y;
    this.h = h;
    this.clothesColorL = clothesColorL;
    this.clothesColorD = clothesColorD;
    this.initials = initials;
};

//functions that break up the drawing of the bitmoji
var drawMouth = function(X,Y,H,p){
    //lips
    fill(219,143,130);        //lip color
    arc(X+90/p,Y+113/p,24/p,13/p,0,180);  //lowerlip
    arc(X+85/p,Y+114/p,15/p,6/p,180,360); //upperlip left
    arc(X+95/p,Y+114/p,14/p,4/p,180,360); //upperlip right
    //smile                   //smile color
    stroke(173,112,101);
    strokeWeight(1/p);
    noFill();
    beginShape();             //smile start
    curveVertex(X+152/p,Y+64/p);
    curveVertex(X+104/p,Y+113/p);
    curveVertex(X+75/p,Y+112/p);
    curveVertex(X+118/p,Y+122/p);
    endShape();               //smile end
    noStroke();
};
var drawEye = function(X,Y,eyeX,eyeY,eyeW,eyeH,H,p){
    //eyeW = 15
    //eyeH = 7
    //right eye 
    //sclera
    fill(255, 255, 255);   //white
    ellipse(X+eyeX/p,Y+eyeY/p,eyeW/p,eyeH/p);
    //iris
    fill(100,68,12);       //dark brown
    ellipse(X+eyeX/p,Y+eyeY/p,6/p,8/p);
    //eyelids
    noFill();
    strokeWeight(4/p);
    stroke(249,203,156);  //skin tone light
    arc(X+eyeX/p,Y+eyeY/p,eyeW/p,9/p,0,360);
    noStroke();
};
var drawFace = function(X,Y,H,p){
    fill(249,203,156);  //skin tone light
    
    ellipse(X+85/p,Y+115/p,40/p,40/p); //chin
    
    quad( //left jaw   
        X+72/p,Y+130/p,  
        X+80/p,Y+122/p,  
        X+60/p,Y+103/p,  
        X+51/p,Y+111/p); 
    quad( //right jaw
        X+100/p,Y+125/p, 
        X+118/p,Y+98/p,  
        X+105/p,Y+90/p,  
        X+86/p,Y+115/p); 

    quad( //left temple
        X+52/p,Y+110/p,  
        X+80/p,Y+108/p,  
        X+77/p,Y+77/p,   
        X+45/p,Y+80/p); 
    quad( //right temple
        X+118/p,Y+98/p,  
        X+98/p,Y+98/p,  
        X+105/p,Y+77/p,   
        X+120/p,Y+80/p); 
    
    ellipse(X+85/p,Y+70/p,75/p,71/p); //forehead
};
var drawHair = function(X,Y,hairX,hairY,tone,w,hairH,H,p){
    if (tone === "dark"){
    fill(100, 68, 12);     //dark brown
    }
    if (tone === "light"){
    fill(135, 98, 25);  //light brown
    }
    noStroke();
    ellipse(X+hairX/p,Y+hairY/p,w/p,hairH/p);
};

var drawTorso = function(X,Y,H,p,shirtColor){
    noStroke();
    fill(222,179,135);     //skin tone dark
    rect(X+45/p,Y+110/p,45/p,40/p);
        //shirt
    fill(shirtColor);     //green light
    triangle(X+75/p,Y+150/p,  X+150/p,Y+150/p,  X+102/p,Y+122/p); //right shirt
    triangle(X+75/p,Y+150/p,  X+0/p,Y+150/p,    X+48/p,Y+122/p); //left shirt
};
var drawHead =  function(X,Y,H,p,hatColorL,hatColorD,initials){
    ///back of rim
    fill(hatColorD);        //green dark
    ellipse(X+80/p,Y+70/p,116/p,27/p);
    
    //right hair
    drawHair(X,Y,101,122,"dark",13,20,H,p);
    drawHair(X,Y,108,114,"dark",15,23,H,p);
    drawHair(X,Y,115,107,"light",15,23,H,p);
    drawHair(X,Y,121,103,"dark",13,20,H,p);
    drawHair(X,Y,125,93,"light",15,23,H,p);
    drawHair(X,Y,122,85,"dark",13,20,H,p);
    
    //skin
    drawFace(X,Y,H,p);
    
    //fedora crown
    fill(hatColorL);     //medium green
    quad(X+54/p,Y+23/p,   X+42/p,Y+61/p,   X+125/p,Y+64/p,   X+105/p,Y+23/p);
    ellipse(X+80/p,Y+30/p,56/p,28/p);
    
    drawMouth(X,Y,H,p);
    
    //nose
    fill(222,179,135);             //skin tone dark
    ellipse(X+92/p,Y+97/p,8/p,7/p);            //left nostril
    ellipse(X+97/p,Y+98/p,8/p,7/p);            //tip of nose
    ellipse(X+102/p,Y+97/p,7/p,6/p);           //right nostril
    quad(X+92/p,Y+97/p,  X+102/p,Y+97/p,  X+98/p,Y+80/p,  X+93/p,Y+80/p);//bridge of nose
    
    drawEye(X,Y,77,83,16,8,H,p); //right eye
    drawEye(X,Y,110,85,15,7,H,p); //left eye
    
    //eyebrows
    fill(100,68,12);           //dark brown
    arc(X+76/p,Y+74/p,25/p,7/p,180,376);   //left eyebrow
    //right eyebrow
    arc(X+111/p,Y+76/p,21/p,6/p,164,360);  //left eyebrow
    
    //hairline
    fill(135, 98, 25);         //light brown
    ellipse(X+123/p,Y+74/p,12/p,18/p);
    noFill();
    strokeWeight(10/p);
    stroke(135, 98, 25);         //light brown
    arc(X+85/p,Y+69/p,71/p,16/p,180,360);
    noStroke();
    
    //glasses
    stroke(0, 0, 0);
    strokeWeight(0.01*H);
    line(X+48/p,Y+77/p,X+67/p,Y+80/p);                    //left temple
    noFill();
    quad(X+66/p,Y+87/p,  X+87/p,Y+90/p,  X+92/p,Y+78/p,  X+67/p,Y+75/p);  //left rim
    line(X+90/p,Y+83/p,X+103/p,Y+84/p);                   //bridge
    quad(X+104/p,Y+91/p, X+121/p,Y+92/p, X+125/p,Y+80/p,  X+100/p,Y+78/p);
    noStroke();
    
    //left hair
    drawHair(X,Y,40,83,"light",15,21,H,p);
    drawHair(X,Y,44,80,"dark",13,17,H,p);
    drawHair(X,Y,49,74,"light",15,20,H,p);
    drawHair(X,Y,42,93,"dark",15,21,H,p);
    drawHair(X,Y,48,120,"dark",15,21,H,p);
    drawHair(X,Y,50,106,"dark",15,21,H,p);
    drawHair(X,Y,39,99,"light",15,21,H,p);
    drawHair(X,Y,45,110,"light",15,21,H,p);

    //fedora rim
    noFill();
    strokeWeight(5/p);
    stroke(hatColorD);           //green dark
    arc(X+84/p,Y+64/p,79/p,13/p,180,360);
    
    //initials
    if(initials){
        textSize(30/p);
        fill(255, 255, 255);
        text("A H",X+56/p,Y+51/p);
    }
};

//draw method
bitmoji.prototype.draw = function() {
    var p = 136/this.h;  //p = proportion
    drawTorso(this.x - 88/p,this.y - 97/p,this.h,p,this.clothesColorL);
    drawHead(this.x - 88/p,this.y - 97/p,this.h,p,this.clothesColorL,this.clothesColorD,this.initials);
};

var Austin = new bitmoji(92,342,150,color(255, 0, 0),color(148, 31, 31),false);


background(255, 255, 255);
colorMode(HSB);

/**************
   VARIABLES
***************/

var gridSnap = 0;
var displayGrid = 0;
var displayCoords = 0;

var gridSize = 20;

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
    InfoScreen: 4,
    SplashScreen: 5
};
var scene = SceneType.SplashScreen;

var MenuBottomType = {
    Default: 0
};
var modeMenuBottom = MenuBottomType.Default;

var brushColor = color(0, 0, 255);

var outline = true;

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
    clickedColor: color(0, 0, 255),
    textColor: color(0, 0, 0),
    label: "i",
    isClicked: false,
    onClick: function () {
        scene = SceneType.InfoScreen;
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
        if (this.isClicked && outline) {
           outline = false;
            this.textSize = 12;
        }
        else if (!this.isClicked && !outline) {
           outline = true;
            this.textSize = 11;
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
        if(selectedSwatch !== palette.length -1) {
            scene = scene === SceneType.Eyedropper ? SceneType.Drawing : SceneType.Eyedropper;
        } else {
            this.reactToClick();
        }
    }
});

//Info screen buttons\\
var backButton = new Button({
    x: 375, y: 375,
    width: 33, height: 33,
    unclickedColor: color(0, 0, 255),
    clickedColor: color(0, 0, 255),
    textColor: color(0, 0, 0),
    label: "x",
    isClicked: false,
    onClick: function () {
        scene = SceneType.Drawing;
    }
});

var startButton = new Button ({ 
                        x: 185,     y: 158,
                        width: 100,    height: 62,
                        color: color(0, 0, 0),
                        textColor: color(255, 255, 255),
                        label: "Start",
                        onClick: function(){
                            scene = SceneType.Drawing;
                        }
                        });


/*****************
   SHAPE OBJECTS
******************/

// Base type that polygons, ellipses, and lines inherit from
function Shape(vertices, fillColor, outlineColor, outline) {
    this.vertices = vertices;
    this.fillColor = fillColor;
    this.outlineColor = outlineColor;
    this.outline = outline;
}

//Polygons\\
var POLY = function (vertices, fillColor, outlineColor, outline) {
   Shape.call(this,vertices, fillColor, outlineColor, outline);
};
POLY.prototype.draw = function () {
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
    Shape.call(this,vertices, fillColor, outlineColor, outline);
};
ELL.prototype.draw = function () {
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
var LIN = function (vertices, fillColor, outlineColor, outline){
    Shape.call(this,vertices, fillColor, outlineColor, outline);
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

//Math\\
var roundIfGridSnap = function(coord){
    var output = 0;
    if (coord === "X"){
        var dist = ((round(mouseX/gridSize))*gridSize - mouseX) * gridSnap; 
        output = mouseX + dist;
    }
    else {
        var dist = ((round(mouseY/gridSize))*gridSize - mouseY) * gridSnap;
        output = mouseY + dist;
    }
    return(output);
};

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
        var X = roundIfGridSnap("X");
        var Y = roundIfGridSnap("Y");
        
        if(scene === SceneType.Eyedropper) {
            palette[selectedSwatch] = (get(mouseX, mouseY));
            eyedropperButton.reactToClick();
            scene = SceneType.Drawing;
            return;
        }
        
        if (modeShape === ShapeMode.Poly) {
            previewVertices.push([X, Y]);
        }
        if (modeShape === ShapeMode.Ellipse && previewVertices.length === 0) {
            previewVertices.push([X, Y]);
        }
        if (modeShape === ShapeMode.Line && previewVertices.length === 0) {
            previewVertices.push([X, Y]);
        }
    }
    else if (mouseButton === RIGHT){
        var X = roundIfGridSnap("X");
        var Y = roundIfGridSnap("Y");
        if (previewVertices.length > 0) {
            if (modeShape === ShapeMode.Poly){
                layers[selectedLayer].shapeList.push(
                    new POLY(previewVertices, 
                             palette[selectedSwatch], 
                             color(0, 0, 0), 
                            outline));
            }
            if (modeShape === ShapeMode.Ellipse){
                previewVertices.push([X, Y]);
                layers[selectedLayer].shapeList.push(
                    new ELL(previewVertices, 
                            palette[selectedSwatch], 
                            color(0, 0, 0),
                           outline));
            }
            if (modeShape === ShapeMode.Line){
                previewVertices.push([X, Y]);
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
    if (mouseY < 25) /* top row */ {
        selectedSwatch = (floor(((paletteRightEdge - mouseX) / (paletteRightEdge - paletteLeftEdge)) * ceil(palette.length / 2)));
    } else{ /* bottom row */
    selectedSwatch = (floor(((paletteRightEdge - mouseX) / (paletteRightEdge - paletteLeftEdge)) * ceil(palette.length / 2))) + ceil(palette.length / 2);
    }
    if (mouseButton === RIGHT){
        if (palette[selectedSwatch] !== 0){
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
var drawGrid = function(){
    var gridOffset = (round(50/gridSize))*gridSize - gridSize;
    for (var i = gridOffset; i < 350; i += gridSize){
        if (i > 200 - gridSize && 
            i < 200 + gridSize){
                strokeWeight(2);
                stroke(199, 115, 115, 100);
        }
        else {
                strokeWeight(1);
                stroke(0, 0, 0, 50);
        }
        
        line(i, 0,
             i, 400);
        line(0 , i, 
             400, i);
    }
};
var drawPreview = function(){
    var X = roundIfGridSnap("X");
    var Y = roundIfGridSnap("Y");
    
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
        vertex(X, Y);
        endShape(CLOSE);
    }
    if (modeShape === ShapeMode.Ellipse) {
        if (outline){
            stroke(0, 0, 0);
            strokeWeight(1);}
        else {noStroke();}
        ellipseMode(CENTER);
        if (previewVertices.length === 0){
            ellipse(X,Y,2,2);
        }
        else {
            ellipse (previewVertices[0][0],
                     previewVertices[0][1], 
                     abs(X - previewVertices[0][0]) * 2, 
                     abs(Y - previewVertices[0][1]) * 2);
        }
    }
    if (modeShape === ShapeMode.Line){
        if (palette[selectedSwatch] === 0){noStroke();}
        else{
            stroke(palette[selectedSwatch]);
            strokeWeight(1);}
        if (previewVertices.length === 0){
            point(X, Y);
        }
        else {
            line(previewVertices[0][0], previewVertices[0][1],
                 X, Y);
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
var drawCoords = function(){
    var X = roundIfGridSnap("X");
    var Y = roundIfGridSnap("Y");

    //draw crosshair
    stroke(palette[selectedSwatch], 200);
    line(X, Y+5, X, Y-5);
    line(X+5, Y, X-5, Y);
    
    fill(0, 0, 0);
    var coords = "(" + X + ", " + Y + ")";
    textAlign(LEFT);
    
    //Adjust position of text if too close to edge
    if (X > 280){
        textAlign(RIGHT);
    }
    else if (X < 50){
        textAlign(LEFT);
    }
    if (Y < 75){
        Y += 30;
    }
    Y = constrain(Y, 80, 349);
    X = constrain(X, 50, 330);
    text(coords, X + 10, Y - 10);
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
var drawGridScale = function(){
    rectMode(CORNER);
    colorMode(RGB);
    fill(255, 255, 255);
    rect(10,75,30,30,5);
    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    text(gridSize,25,90);
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
                            result += "\n" + indent + "fill(" + round(hue(layers[i].shapeList[j].fillColor)) + ", " + round(saturation(layers[i].shapeList[j].fillColor)) + ", " + round(brightness(layers[i].shapeList[j].fillColor)) + ");";
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
                            result += "\n" + indent + "fill(" + round(hue(layers[i].shapeList[j].fillColor)) + ", " + round(saturation(layers[i].shapeList[j].fillColor)) + ", " + round(brightness(layers[i].shapeList[j].fillColor)) + ");";
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
                result += "\n" + indent + "stroke(" + round(hue(layers[i].shapeList[j].color)) + ", " + round(saturation(layers[i].shapeList[j].color)) + ", " + round(brightness(layers[i].shapeList[j].color)) + ");";
                    result += "\n" + indent + "line(" + 
                    px(layers[i].shapeList[j].vertices[0][0]) + " / p + x" + ", " + 
                    py(layers[i].shapeList[j].vertices[0][1]) + " / p + y" + ", " + 
                    px(layers[i].shapeList[j].vertices[1][0]) + " / p + x" + ", " + 
                    py(layers[i].shapeList[j].vertices[1][1]) + " / p + y" + ");";
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
    if (scene === SceneType.SplashScreen) {
        startButton.handleMouseClick();
    }
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
        
        return;
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
    
    if (scene === SceneType.InfoScreen) {
        backButton.handleMouseClick();
        return;
    }
};

draw = function () {
    if (scene === SceneType.SplashScreen) {
        colorMode(RGB);
        rectMode(CORNER);
        background(143, 205, 255);
        nathan.draw();
        Austin.draw();
        fill(0, 0, 0);
        textSize(75);
        text("SHAPES", 200, 50);
        startButton.draw();
        return;
    }
    
    //The || is there so that the vignette isn't redrawn over itself
    if (scene === SceneType.Drawing || scene === SceneType.InitColorPicker || scene === SceneType.Eyedropper){
        //Refresh canvas\\
        colorMode(RGB);
        background(255, 255, 255);
        stroke(0, 0, 0);
        strokeWeight(1);
        
        
        drawShapes();
        
        if (modeShape !== ShapeMode.none && scene !== SceneType.Eyedropper){drawPreview();}
        
        if (displayGrid === 1){
            drawGrid();
        }
        
        if (displayCoords === 1){
            drawCoords();
        }
        
        drawBorder();
        
        drawBottomMenu();
        
        drawSelectedSwatch();
        
        drawPalette();
        
        drawLayersUI();
        
        strokeButton.draw();
        
        eyedropperButton.draw();
        
        if (displayGrid === 1){
            drawGridScale();
        }
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
    
    if (scene === SceneType.InfoScreen){
        rectMode(CORNER);
        colorMode(RGB);
        fill(113, 120, 184);
        noStroke();
        rect(0,0,width,height);
        
        //Information title
        textAlign(CENTER);
        fill(255, 255, 255);
        textSize(50);
        text("Information", 200,50);
        
        //Hotkey header
        textSize(30);
        text("Hotkeys",70,205);
        
        //Hotkey text
        textAlign(LEFT);
        textSize(20);
        text("z =   Undo",               25, 230);
        text("e =   Export",             25, 255);
        text("m =  Recenter",            25, 280);
        text("ctrl = Show mouse coords", 25, 330);
        
        text("g =       Toggle grid",   200, 230);
        text("shift =   Snap to Grid",  200, 255);
        text("up/down = scale grid",    200, 280);
        
        
        //Instructions header
        textAlign(CENTER);
        textSize(30);
        text("Instructions", 90, 100);
        
        //Instructions text
        textSize(20);
        textAlign(LEFT);
        text("Select a shape and left-click on the canvas to draw it. Right-click to finish a shape",15,115,410, 300);
        
        backButton.draw();
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
    
    layers[actionHistory[latestAction].layer].shapeList.pop();
    actionHistory.pop();
    }
    
    // e (export)
    if (keyCode === 69){
        exportPicture();
    }
    
    // m (recenter)
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
    
    // g (display grid)
    if (keyCode === 71){
        displayGrid ^= 1;
    }

    // up (increase grid size)
    if (keyCode === 38){
        gridSize++;
    }
    
    if (keyCode === 40){
        gridSize--;
    }
    
    // shift (gridsnap)
    if (keyCode === 16){
        gridSnap ^= 1;
    }
    
    //ctrl (coords)
    if (keyCode === 17){
        displayCoords ^= 1;
    }
};
