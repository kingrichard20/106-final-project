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
