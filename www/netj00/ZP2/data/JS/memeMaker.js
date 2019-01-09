const canvas = document.getElementById("canvas");
const templates = document.getElementById("templates");
const text1 = document.getElementById("textinput1");
const text2 = document.getElementById("textinput2");
const text3 = document.getElementById("textinput3");
const color1 = document.getElementById("textColor1");
const color2 = document.getElementById("textColor2");
const color3 = document.getElementById("textColor3");
const color4 = document.getElementById("textColor4");
const color5 = document.getElementById("textColor5");
const color6 = document.getElementById("textColor6");
const downloadButton = document.getElementById("downloadButton");
const saveButton = document.getElementById("saveForLaterButton");
const history = document.getElementById("history");


let xmlDoc = null;
let _canvasState = null;

function onLoad() {
    // init
    _canvasState = new CanvasState(canvas);
    downloadButton.addEventListener("click", saveButtonHandler);
    saveButton.addEventListener("click", save);

    // events
    let elements = document.getElementsByClassName("refresh");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", redraw);
        elements[i].addEventListener("keypress", redraw);
    }

    canvas._width = canvas.width;
    canvas._height = canvas.height;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            parser(this);
        }
    };
    xhttp.open("GET", "memeTemplate.xml", true);
    xhttp.send();


    // TODO OPT Separate
    // load localStorage
    let memes = JSON.parse(localStorage.getItem("memes"));
    if (!memes) {
        memes = [];
    }
    // debugger;
    for (let i = 0; i < memes.length; i++) {
        let element = document.createElement("img");
        element.src = memes[i].view;
        element.width = 150;
        element.height = 150;
        element.addEventListener("click", function () {
            let image = new Image();
            image.src = memes[i].bgSrc;
            let width = memes[i].bgWidth;
            let height = memes[i].bgHeight;
            text1.value = memes[i].texts[0].textvalue;
            color1.value = memes[i].texts[0].textcolor1;
            color2.value = memes[i].texts[0].textcolor2;
            let x1 = memes[i].texts[0].textx;
            let y1 = memes[i].texts[0].texty;

            text2.value = memes[i].texts[1].textvalue;
            color3.value = memes[i].texts[1].textcolor1;
            color4.value = memes[i].texts[1].textcolor2;
            let x2 = memes[i].texts[1].textx;
            let y2 = memes[i].texts[1].texty;

            text3.value = memes[i].texts[2].textvalue;
            color5.value = memes[i].texts[2].textcolor1;
            color6.value = memes[i].texts[2].textcolor2;
            let x3 = memes[i].texts[2].textx;
            let y3 = memes[i].texts[2].texty;

            _canvasState.shapes = [];
            _canvasState.clear();
            _canvasState.addShape(new BackgroundShape(width, height, image));
            _canvasState.addShape(new TextShape(x1, y1, 100, 30, text1, color1, color2));
            _canvasState.addShape(new TextShape(x2, y2, 100, 30, text2, color3, color4));
            _canvasState.addShape(new TextShape(x3, y3, 100, 30, text3, color5, color6));
        });
        history.appendChild(element);
    }

}

function parser(xml) {
    xmlDoc = xml.responseXML;
    let x = xmlDoc.getElementsByTagName("meme");
    for (let i = 0; i < x.length; i++) {
        let element = document.createElement("img");
        element.src = x[i].getElementsByTagName("source")[0].childNodes[0].nodeValue;
        element.width = 150;
        element.height = 150;
        element._width = x[i].getElementsByTagName("width")[0].childNodes[0].nodeValue;
        element._height = x[i].getElementsByTagName("height")[0].childNodes[0].nodeValue;
        element.addEventListener("click", function () {
            _canvasState.shapes = [];
            _canvasState.clear();
            _canvasState.addShape(new BackgroundShape(this._width, this._height, this));
            _canvasState.addShape(new TextShape(20, 20, 100, 30, text1, color1, color2));
            _canvasState.addShape(new TextShape(20, 50, 100, 30, text2, color3, color4));
            _canvasState.addShape(new TextShape(20, 80, 100, 30, text3, color5, color6));
        });
        templates.appendChild(element);
    }
}

function saveButtonHandler() {
    _canvasState.selection = null;
    _canvasState.valid = false;
    _canvasState.draw();
    let anchor = document.createElement("a");
    anchor.setAttribute("href", canvas.toDataURL());
    anchor.setAttribute("download", "meme");
    anchor.click();
}


//----------------------------------------------------------------------------------------------------------------------

function TextShape(x, y, w, h, textinput, color1, color2) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.textinput = textinput;
    this.color1 = color1;
    this.color2 = color2;
}

// Draws this shape to a given context
TextShape.prototype.draw = function (ctx) {
    ctx.font = "30px Sans-serif";
    ctx.strokeStyle = this.color2.value;
    ctx.lineWidth = 3;
    ctx.strokeText(this.textinput.value, this.x, this.y + this.h);
    ctx.fillStyle = this.color1.value;
    ctx.fillText(this.textinput.value, this.x, this.y + this.h);

    this.w = ctx.measureText(this.textinput.value).width; // Fix Containers
};

// Determine if a point is inside the shape's bounds
TextShape.prototype.contains = function (mx, my) {
    // All we have to do is make sure the Mouse X,Y fall in the area between
    // the shape's X and (X + Width) and its Y and (Y + Height)
    return (this.x <= mx) && (this.x + this.w >= mx) &&
        (this.y <= my) && (this.y + this.h >= my);
};

function BackgroundShape(w, h, image) {
    this.width = w;
    this.height = h;
    this.image = image;
}

BackgroundShape.prototype.draw = function (ctx) {
    let maxWidth = canvas._width;
    let maxHeight = canvas._height;
    let ratio = 0;

    if (this.width > this.height) {
        ratio = maxWidth / this.width;
        canvas.width = maxWidth;
        canvas.height = this.height * ratio;
    }
    else {
        ratio = maxHeight / this.height;
        canvas.height = maxHeight;
        canvas.width = this.width * ratio;
    }
    ctx.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, canvas.width, canvas.height);
};

BackgroundShape.prototype.contains = function () {
    return false;
};

// https://github.com/simonsarris/Canvas-tutorials/blob/master/shapes.js
function CanvasState(canvas) {
    // **** First some setup! ****
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d");
    // This complicates things a little but but fixes mouse co-ordinate problems
    // when there's a border or padding. See getMouse for more detail
    let stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }
    // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
    // They will mess up mouse coordinates and this fixes that
    let html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    // **** Keep track of state! ****

    this.valid = false; // when set to false, the canvas will redraw everything
    this.shapes = [];  // the collection of things to be drawn
    this.dragging = false; // Keep track of when we are dragging
    // the current selected object. In the future we could turn this into an array for multiple selection
    this.selection = null;
    this.dragoffx = 0; // See mousedown and mousemove events for explanation
    this.dragoffy = 0;

    // **** Then events! ****

    // This is an example of a closure!
    // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
    // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
    // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
    // This is our reference!
    let myState = this;

    //fixes a problem where double clicking causes text to get selected on the canvas
    canvas.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    }, false);
    // Up, down, and move are for dragging
    canvas.addEventListener('mousedown', function (e) {
        let mouse = myState.getMouse(e);
        let mx = mouse.x;
        let my = mouse.y;
        let shapes = myState.shapes;
        let l = shapes.length;
        for (let i = l - 1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {
                var mySel = shapes[i];
                // Keep track of where in the object we clicked
                // so we can move it smoothly (see mousemove)
                myState.dragoffx = mx - mySel.x;
                myState.dragoffy = my - mySel.y;
                myState.dragging = true;
                myState.selection = mySel;
                myState.valid = false;
                return;
            }
        }
        // havent returned means we have failed to select anything.
        // If there was an object selected, we deselect it
        if (myState.selection) {
            myState.selection = null;
            myState.valid = false; // Need to clear the old selection border
        }
    }, true);
    canvas.addEventListener('mousemove', function (e) {
        if (myState.dragging) {
            var mouse = myState.getMouse(e);
            // We don't want to drag the object by its top-left corner, we want to drag it
            // from where we clicked. Thats why we saved the offset and use it here
            myState.selection.x = mouse.x - myState.dragoffx;
            myState.selection.y = mouse.y - myState.dragoffy;
            myState.valid = false; // Something's dragging so we must redraw
        }
    }, true);
    canvas.addEventListener('mouseup', function (e) {
        myState.dragging = false;
    }, true);

    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 40;
    setInterval(function () {
        myState.draw();
    }, myState.interval);
}

CanvasState.prototype.addShape = function (shape) {
    this.shapes.push(shape);
    this.valid = false;
};

CanvasState.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
};

CanvasState.prototype.getShapes = function () {
    return this.shapes
};


// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
CanvasState.prototype.draw = function () {
    // if our state is invalid, redraw and validate!
    if (!this.valid) {
        let ctx = this.ctx;
        let shapes = this.shapes;
        this.clear();

        // ** Add stuff you want drawn in the background all the time here **

        // draw all shapes
        let l = shapes.length;
        for (let i = 0; i < l; i++) {
            let shape = shapes[i];
            // We can skip the drawing of elements that have moved off the screen:
            if (shape.x > this.width || shape.y > this.height ||
                shape.x + shape.w < 0 || shape.y + shape.h < 0) continue;
            shapes[i].draw(ctx);
        }

        // draw selection
        // right now this is just a stroke along the edge of the selected TextShape
        if (this.selection !== null) {
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            let mySel = this.selection;
            ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
        }
        this.valid = true;
    }
};


// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
CanvasState.prototype.getMouse = function (e) {
    let element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {x: mx, y: my};
};

function redraw() {
    _canvasState.valid = false;
    _canvasState.draw();
}

function save() {
    _canvasState.selection = null;
    _canvasState.valid = false;
    _canvasState.draw();
    let memes = JSON.parse(localStorage.getItem("memes"));
    if (!memes) {
        memes = [];
    }
    let object = {};
    let shapes = _canvasState.getShapes();
    object.bgSrc = shapes[0].image.src;
    object.bgWidth = shapes[0].width;
    object.bgHeight = shapes[0].height;

    let texts = [];
    for (let i = 1; i < shapes.length; i++) {
        let textObject = {};
        textObject.textvalue = shapes[i].textinput.value;
        textObject.textcolor1 = shapes[i].color1.value;
        textObject.textcolor2 = shapes[i].color2.value;
        textObject.textx = shapes[i].x;
        textObject.texty = shapes[i].y;
        texts.push(textObject);
    }
    object.view = canvas.toDataURL();
    object.texts = texts;
    if (memes.length >= 5) {
        memes.shift();
    }
    memes.push(object);
    localStorage.setItem("memes", JSON.stringify(memes));
}

// Now go and make something amazing!
onLoad();