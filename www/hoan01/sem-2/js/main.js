var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//for the ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 22;
//for the pad
var x2 = canvas.width/2;
var y2 = canvas.height-22;
var padWidth = 100;
var padHeight = 15;
//move the pad logic
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	} else if(e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	} else if(e.keyCode == 37) {
		leftPressed = false;
	}
}

//draw ball
function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#66CC00";
	ctx.fill();
	ctx.closePath();
}

//draw paddle
function drawPad() {
	ctx.beginPath();
	ctx.fillRect(x2, y2, padWidth, padHeight);
	ctx.fillStyle = "#66CC00";
	ctx.fill();
	ctx.closePath();
}

//draw everything and logic
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPad();
	x+=dx;
	y+=dy;
	if (y + dy < ballRadius) {
		dy=-dy;
	} else if (x+dx + ballRadius >= canvas.width || x+dx < ballRadius) {
		dx=-dx;
	} else if(y + dy > canvas.height-ballRadius) {
	    if(x > x2 && x < x2 + padWidth) {
	        dy = -dy;
	    }
	    else {
	        alert("GAME OVER");
	        document.location.reload();
		    }
	}
	if (rightPressed && padWidth + x2 < canvas.width) {
		x2 += 5;
	} else if (leftPressed && padWidth < canvas.height) {
		x2 -= 5;
	}
} setInterval(draw, 10);