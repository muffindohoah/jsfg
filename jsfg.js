// Player Setup
var p1Y = 240;
var p1X = 0;
var p1sY = 80
var p1Yv
var p1Xv
var gravity = 0.6

var hbX = 0
var hbY = 0
var hbsX = 0
var hbsY = 0

var NPCData = [undefined, 90, 250, 38, 70, "DarkMagenta"]
var EnemyData = [undefined]

var camX = 1
var camY = 1
var zoom = 1

var spd = 1;

var d = "[ M To Interact ]"

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
    npc();
    enemy();
    aiprocess();
    floor();
    //physicsprocess();
    player();
    hitbox();
    textbox();
};

function checkcolission() {
    for (var i = 0; i <= (NPCData.length / 5); i++) {
        console.log(NPCData[1])
        if (p1X - 40 < NPCData[1] && p1X + 40 > NPCData[1])
            return "NPC1" 
    }
};

function textbox() {
    draw("Dialogue", d, 200, 50)
}

function dialogueclear() {
    d = ""

};

function dialogue(input) {
    console.log(d);
    d = input;
    setTimeout(dialogueclear, input.length * 100 + 200)
    console.log(d);
};

function physicsprocess() {


};

function hitbox() {

    rect((p1X - camX) - hbX, (p1Y - camY) - hbY, hbsX * zoom, hbsY * zoom, "#FF0000")

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
    //p1Y = 240

    rect(p1X - camX * zoom, (p1Y - (p1sY - 80)) - camY * zoom, 40 * zoom, p1sY * zoom);
    p1sY = 80
};

function interact() {
    if (checkcolission() == "NPC1") {
        dialogue("hey dawg! home slice!");
    }

};

function attack(dir) {
    console.log("atk" + dir)
    if (dir == 1) {
        hbX = 20
    } else if (dir == 2) {
        hbX = -40
    } else if (dir = 0) {
        hbX = 0
    };
    hbY = -20
    hbsX = 25
    hbsY = 23
    console.log(hbX)
    const myTimeout = setTimeout(hitboxclear, 500);
};

function crouch() {
    p1sY = 60

}

function jump() {
    var jheight = 40
    p1Yv = 10
    p1Xv = 0
    for (var i = 0; i > 50; i++) {

        //p1Yv += gravity;
        p1Y += p1Yv;
        p1X += p1Xv;
    };
};

function npc() {
    for (var i = 0; i <= (NPCData.length / 5); i++) {
        rect(NPCData[1 * i] - camX * zoom, NPCData[2 * i] - camY * zoom, NPCData[3 * i] * zoom, NPCData[4 * i] * zoom, NPCData[5 * i]);
    }

};

function aiprocess() {

};

function spawnenemy() {
var eX
var eY
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

    c = document.getElementById("Dialogue");
    ctx = c.getContext("2d");
    const context = c.getContext('2d');

    ctx.clearRect(0, 0, c.width, c.height);

    c = document.getElementById("CanvasTest");
    ctx = c.getContext("2d");
}

function debug() {
    dialogue("This is a test.")
    console.log(hbX)
    console.log(hbsX)
    console.log(map)
    console.log(NPCData.length)
}

//Process Setup
var lastUpdate = Date.now(); //deltatime handler  && hbsX == undefined
var now = Date.now();
var dt = now - lastUpdate;
setInterval(process, dt)

function getpress() {
    onkeydown = onkeyup = function (e) {
        e = e || event; // to deal with IE map 39 is right, 37 is left
        map[e.keyCode] = e.type == 'keydown';
    }
    if (map[40]) {
        crouch();
        if (map[37]) {
            p1X += -0.5
        } else if (map[39]) {
            p1X += 0.5
        }
    } else if (map[37]) { //Left
        p1X += -1.0
        if (map[78]) {
            attack(1);
        }
    } else if (map[39]) { //Right
        p1X += 1.0
        if (map[78]) {
            attack(2);
        }
    } else if (map[219]) {
        zoom += 0.01
        console.log(zoom)
    } else if (map[221]) {
        zoom += -0.01
    } else if (map[38]) {
        jump();
    } else if (map[78]) {
        attack(0);
    } else if (map[77]) {
        interact();
    } else if (map[68]) {
        debug();
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

