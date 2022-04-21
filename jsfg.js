// Player Setup
var p1Y = 0;
var p1X = 0;

var hbX
var hbY
var hbsX
var hbsY


var camX = 1
var camY = 1
var zoom = 1

var spd = 1;

var d

//Canvas Setup
var box = jQuery('.box');	// reference to the HTML .box element
var board = jQuery('.board');	// reference to the HTML .board element
var boardWidth = board.width();	// the maximum X-Coordinate of the screen
var boardHeight = board.innerHeight(); // the maximum Y-Coordinate of the screen
console.log(boardWidth + ", " + boardHeight)

var c = document.getElementById("CanvasTest");
var ctx = c.getContext("2d");
const context = c.getContext('2d');

var map = {}; // maps all buttons being currently pressed


//Common Func Setup
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function draw(canvas, text, tX, tY) {
        var c = document.getElementById(canvas);
        var ctx = c.getContext("2d");
        ctx.font = "16px MSGothic";
        ctx.strokeText(text, tX, tY);
};

//Key Detection

document.addEventListener('keydown', myKeyPress);

function myKeyPress(e) {
    var keynum;

    if (window.event) { // IE                  
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                 
        keynum = e.which;
    }

};



//Rendering Process
//p1Y - camY / 5
//p1X - camX / 5


function stamp() {
    camera();
    floor();
    //physicsprocess();
    player();
    hitbox();
    textbox();
};

function textbox() {
    //console.log(d);
    draw("CanvasTest", d, 160, 20)
}

function dialogueclear() {
    d = ""

};

function dialogue(input) {
    d = input;
    setTimeout(dialogueclear(), 500)
};

function physicsprocess() {


};

function hitbox() {

    rect(hbX, hbY, hbsX * zoom, hbsY * zoom, "#FF0000")

}

function hitboxclear() {
    hbX = 0
    hbY = 0
    hbsX = 0
    hbsY = 0

}

function camera() {
    camX += (p1X - 220) - camX
    camY += (p1Y - 180) - camY
};

function player() {
    p1Y = 240
    rect(p1X - camX * zoom, p1Y - camY * zoom, 40 * zoom, 80 * zoom);
};

function interact() {


};

function attack() {
    console.log("atk")
    hbX = 30
    hbY = 30
    hbsX = 30
    hbsY = 30
    const myTimeout = setTimeout(hitboxclear, 500);
};


function jump() {
    var jheight = 40
    setInterval()
};

function floor() {
    rect(0 - camX * zoom, 320 - camY * zoom, 480 * zoom, 40 * zoom, "Black")

};

function rect(rX, rY, sX, sY, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(rX, rY, sX, sY);
    ctx.stroke();
};

function elipses(eX, eY, size) {
    ctx.beginPath();
    ctx.ellipse(eX, eY, 12 * size, 12 * size, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
};

function clear() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function draw(text, tX, tY, px) {
    var c = document.getElementById("CanvasTest");
    var ctx = c.getContext("2d");
    ctx.font = px + "px " + "Courier New";
    ctx.strokeText(text, tX, tY);
};

//Process Setup
var lastUpdate = Date.now(); //deltatime handler
var now = Date.now();
var dt = now - lastUpdate;
setInterval(process, dt)

function getpress() {
    onkeydown = onkeyup = function (e) {
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
    }
    if (map[37]) { //Left
        p1X += -1
    } else if (map[39]) { //Right
        p1X += 1
    } else if (map[219]) {
        zoom += 0.01
        console.log(zoom)
    } else if (map[221]) {
        zoom += -0.01
    } else if (map[38]) {
        jump();
    } else if (map[78] && hbsX != 0) {
        attack();
    } else if (map[77]) {
        interact();
    }

};

function process() {
    lastUpdate = Date.now(); //deltatime handler
    now = Date.now();
    dt = now - lastUpdate;
    clear();
    stamp();
    getpress();
    document.getElementById("dt").innerHTML = "deltatime: " + dt + "ms"
    document.getElementById("px").innerHTML = "Player X: " + p1X
    document.getElementById("py").innerHTML = "Player Y: " + p1Y
};

