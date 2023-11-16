function drawNeck(props) {
    
    fill(0x7e, 0x4f, 0x36);
    
    rect(
        props.x - (props.neck.width / 2), 
        props.head.face.y + props.head.face.h, 
        props.neck.width, 
        props.head.face.h
    );
    
    props.neck.x = props.x - (props.neck.width / 2);
    
    props.neck.endY = props.y - (props.size / 2) + props.head.height;
    
    props.neck.triangleEndY = props.neck.endY + Math.floor(props.neck.width * 0.5);
    
    fill(215, 148, 132);
    triangle(
        props.x - (props.neck.width / 2), 
        props.neck.endY,
        props.x + (props.neck.width / 2), 
        props.neck.endY,
        props.x,
        props.neck.triangleEndY
    );
    
    // debugDrawPoint(
    //     props.x - (props.neck.width / 2), 
    //     props.head.face.y + props.head.face.h, 
    //     color(0, 200, 255)
    // );
}
function drawSideburns(props, faceOffset) {
    fill(41, 36, 30);
    triangle(
        props.x - (props.head.width / 2), props.head.face.y,
        props.head.face.x, props.head.face.y,
        props.head.face.x, props.head.face.y + props.head.face.h
    );
    triangle(
        (props.x + props.head.width / 2), props.head.face.y,
        (props.x + props.head.width / 2) - (faceOffset / 2), props.head.face.y,
        (props.x + props.head.width / 2) - (faceOffset / 2), props.head.face.y + props.head.face.h
    );
}
function drawMandible(props) {
    
    var mandibleHeight = Math.floor(props.head.face.h * 1.66);
    
    strokeWeight(2);
    stroke(41, 36, 30);
    
    fill(0xbe, 0x7b, 0x6b);
    arc(
        props.x, (props.head.face.y + props.head.face.h),
        props.head.face.w, mandibleHeight, 
        0, 180
    );
    
    // debugDrawPoint(props.x, (props.head.face.y + props.head.face.h), color(0, 200, 255));
}
function drawEyebrows(props) {
    fill(0x3d, 0x38, 0x32);
    
    var eyebrowWidth = Math.floor(props.head.face.w * 0.33);
    var eyebrowHeight = Math.floor(eyebrowWidth / 5);
    
    props.head.face.eyebrows.w = eyebrowWidth;
    props.head.face.eyebrows.h = eyebrowHeight;
    
    noStroke();
    rect(
        props.head.face.x + eyebrowHeight, 
        props.head.face.y + eyebrowHeight, 
        eyebrowWidth, eyebrowHeight
    );
    
    rect(
        props.head.face.x + props.head.face.w - eyebrowHeight - eyebrowWidth, 
        props.head.face.y + eyebrowHeight, 
        eyebrowWidth, eyebrowHeight
    );
    
    // debugDrawPoint(props.head.face.x + eyebrowHeight, props.head.face.y, color(0, 200, 255));
    // debugDrawPoint(
    //     props.head.face.x + props.head.face.w - eyebrowHeight - eyebrowWidth, 
    //     props.head.face.y,
    //     color(0, 200, 255)
    // );
    
}
function drawEyes(props) {
    
    noStroke();
    
    var eyebrowW = props.head.face.eyebrows.w;
    var eyebrowH = props.head.face.eyebrows.h;
    
    var eye1X = (props.head.face.x + eyebrowH + eyebrowW / 2) + Math.floor(eyebrowW * 0.125);
    var eye2X = (props.head.face.x + props.head.face.w - eyebrowH - eyebrowW / 2) - Math.floor(eyebrowW * 0.125);
    
    var eyeY = props.head.face.y + props.head.face.eyebrows.h * 3.5;
    
    var eyeW = Math.floor(eyebrowW * 0.75);
    var eyeH = eyebrowH * 2;
    
    fill(255,255,255);
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
    
    props.head.face.nose.y = eyeY + Math.ceil(eyeH / 2);
    props.head.face.nose.w = Math.floor(props.head.face.h  * 0.2);
    props.head.face.nose.h = Math.floor(props.head.face.h  * 0.33);
    
}
function drawNose(props) {
    
    fill(0xec, 0xbb, 0xb7);
    
    // Let's make things easier for a bit.
    
    ellipse(
        props.x, 
        props.head.face.nose.y,
        props.head.face.nose.w,
        props.head.face.nose.w
    );
    rect(
        props.x - (props.head.face.nose.w / 2), 
        props.head.face.nose.y,
        props.head.face.nose.w,
        props.head.face.nose.h
    );
    
    ellipse(
        props.x, 
        props.head.face.nose.y + props.head.face.nose.h,
        props.head.face.nose.w * 2,
        props.head.face.nose.w
    );
    
    // debugDrawPoint(props.x, props.head.face.nose.y, color(0, 200, 255));
    // debugDrawPoint(props.x, props.head.face.nose.y + props.head.face.nose.h , color(0, 200, 255));

}
function drawMouth(props) {
    var mouthY = props.y - (props.head.face.nose.h / 2);
    
    stroke(129, 50, 53);
    fill(0xb3, 0x64, 0x67);
    
    props.head.face.mouth.w = (props.head.width / 2.5);
    props.head.face.mouth.h = (props.head.face.eyebrows.h * 1.5);
    
    props.head.face.mouth.x = props.x - (props.head.face.mouth.w / 2);
    props.head.face.mouth.y = mouthY;
    
    arc(
        props.x, 
        mouthY,
        props.head.face.mouth.w,
        props.head.face.mouth.h * 2, 
        0, 180
    );
    line(
        props.x - (props.head.face.mouth.w / 2), 
        mouthY,
        props.x + (props.head.face.mouth.w / 2), 
        mouthY
    );
    
}
function drawFacialHair(props) {
    
    strokeWeight(2);
    stroke(0x3d, 0x38, 0x32);
       line(
           props.head.face.mouth.x + (props.head.face.mouth.h / 2),
           props.head.face.mouth.y - (props.head.face.mouth.h / 2),
           props.x,
           props.head.face.mouth.y - (props.head.face.mouth.h * 0.75)
        );
        line(
           props.x,
           props.head.face.mouth.y - (props.head.face.mouth.h * 0.75),
           props.head.face.mouth.x + props.head.face.mouth.w - (props.head.face.mouth.h / 2),
           props.head.face.mouth.y - (props.head.face.mouth.h / 2)
        );
    strokeWeight(2);
    
}
function drawFace(props) {
    var faceOffset = props.head.width * 0.125;
    
    var faceX = (props.x - props.head.width / 2) + (faceOffset / 2);
    var faceHeight = (props.head.height - props.head.hairHeight) * 0.5;
    var faceWidth = (props.head.width - faceOffset);
    
    props.head.face.x = faceX;
    props.head.face.w = faceWidth;
    props.head.face.h = faceHeight;
    
    drawSideburns(props, faceOffset);
    
    fill(0xbe, 0x7b, 0x6b);
    rect(faceX, props.head.face.y, faceWidth, faceHeight);
    
    // We have to call this so we can draw my mandible over it.
    drawNeck(props);
}
function drawHair(props) {
    // My hair color.
    fill(0x3d, 0x38, 0x32);
     
    var hairHeight = Math.floor(props.head.height / 3.5);
    var hairlineY = props.y - (props.size / 2) + (hairHeight);
    
    // This function is dumb
    arc(
        props.x,
        hairlineY,
        props.head.width,
        hairHeight * 2,
        -180,
        0
    );
    
    for(var i = -1; i < 2; i += 2) {
        
        triangle(
            props.x + ((props.head.width / 2) * i), 
            hairlineY,
            props.x + ((props.head.width / 3) * i), 
            hairlineY - hairHeight,
            props.x + ((props.head.width / 6) * i), 
            hairlineY
        );
        
        triangle(
            props.x + ((props.head.width / 2) * i), 
            hairlineY,
            props.x + ((props.head.width / 2) * i), 
            hairlineY - hairHeight * 0.66,
            props.x + ((props.head.width / 3) * i), 
            hairlineY
        );
    }
    
    // References!!!
    props.head.face.y = hairlineY;
    props.head.hairHeight =  hairHeight;
}
function drawInitials(props) {

    fill(200, 200, 200);

    textSize(Math.ceil(props.neck.width * 0.75));
    textAlign(CENTER, CENTER);
    
    text("N", props.x - (props.neck.width), props.y + (props.neck.width));
    text("F", props.x + (props.neck.width), props.y + (props.neck.width));
}
function drawShirt(props) {
    noStroke();
    fill(props.shirt.color);
    
    beginShape();
    // Left half.
        vertex(props.x - (props.neck.width / 2), props.neck.endY);
        vertex(props.x - (props.size / 2), props.neck.endY);
        vertex(props.x - (props.size / 2), props.y + (props.size / 2));
        vertex(props.x, props.y + (props.size / 2));
        vertex(props.x, props.neck.triangleEndY);
    // Right half.
        vertex(props.x + (props.neck.width / 2), props.neck.endY);
        vertex(props.x + (props.size / 2), props.neck.endY);
        vertex(props.x + (props.size / 2), props.y + (props.size / 2));
        vertex(props.x, props.y + (props.size / 2));
        vertex(props.x, props.neck.triangleEndY);
    endShape(CLOSE);
    
    if(props.shirt.initials) {
        drawInitials(props);
    }
    
}
function drawBitmoji(args) {
    
    // Many nested objects have x, y, w, and h fields.
    var props = {
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
    
    noStroke();
    
    drawHair(props);
    drawFace(props);
    drawMandible(props);
    drawEyebrows(props);
    drawEyes(props);
    drawNose(props);
    drawMouth(props);
    drawFacialHair(props);
    drawShirt(props);
    
    // DEBUG
    // fill(255, 255, 255, 0);
    // strokeWeight(4);
    // stroke(255, 0, 0);
    // rectMode(CENTER);
    // rect(args.x, args.y, props.size, props.size);
    
    // debugDrawPoint(args.x, args.y, color(255, 0, 255));
    // debugDrawLine(
    //     args.x - props.size / 2,
    //     (args.y - props.size / 2) + props.head.height,
    //     args.x + props.size / 2, 
    //     (args.y - props.size / 2) + props.head.height,
    //     color(0, 255, 0)
    // );
    stroke(0);
}



/*
 *
 *
 *
 * Bitmoji, ignore above ^
 *
 *
 *
 */


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

/**********************
END AUSTIN BITMOJI CODE
***********************/
