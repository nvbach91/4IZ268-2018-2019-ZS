var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//for the ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 15;
//for the pad
//top
var x1 = canvas.width/2;
var y1 = 0;
//right
var x2 = canvas.width-15;
//bottom
var x3 = canvas.width/2;
var y3 = canvas.height-ballRadius;
//width and height for top and bottom
var padWidth1 = 100;
var padHeight1 = 15;
//move the pad logic
var rightPressed = false;
var leftPressed = false;
//pad side move
var topSide = false;
var bottomSide = false;

//bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 200;
var brickOffsetLeft = 120;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//function draw bricks
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	} else if(e.keyCode == 37) {
		leftPressed = true;
	} else if(e.keyCode == 87) {
		topSide = true;
	} else if(e.keyCode == 83) {
		bottomSide = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	} else if(e.keyCode == 37) {
		leftPressed = false;
	} else if(e.keyCode !== 87) {
		topSide = false;
	} else if(e.keyCode !== 83) {
		bottomSide = false;
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

//draw paddle top
function drawPad1() {
	ctx.beginPath();
	ctx.fillRect(x1, y1, padWidth1, padHeight1);
	ctx.fillStyle = "#66CC00";
	ctx.fill();
	ctx.closePath();
}
//draw paddle bottom
function drawPad3() {
	ctx.beginPath();
	ctx.fillRect(x3, y3, padWidth1, padHeight1);
	ctx.fillStyle = "#66CC00";
	ctx.fill();
	ctx.closePath();
}

//draw everything and logic
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	collisionDetection();
	bottomSide = true;
	//if pad is on other side and ball hits the wall
	if (topSide && y > canvas.height - ballRadius) {
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
	} else if (bottomSide && y < ballRadius) {
		alert("GAME OVER");
		document.location.reload();
		clearInterval(interval);
	}
	//left and right bounce
	if (x+dx + ballRadius >= canvas.width || x+dx < ballRadius) {
		dx=-dx;
	}
	//bottom and top pad hit end logic
	if (topSide) {
		drawPad1();
		if (rightPressed && padWidth1 + x2 > canvas.width) {
			x1 += 5;
		} else if (leftPressed && padWidth1 < canvas.height) {
			x1 -= 5;
		} else if(y + dy < ballRadius) {
		    if(x > x1 && x < x1 + padWidth1) {
		        dy = -dy;
		    }
		    else {
		        alert("GAME OVER");
		        document.location.reload();
		        clearInterval(interval); // Needed for Chrome to end game
		    }
		}
	} else if (bottomSide) {
		drawPad3();
		if (rightPressed && padWidth1 + x2 > canvas.width) {
			x3 += 5;
		} else if (leftPressed && padWidth1 < canvas.height) {
			x3 -= 5;
		} else if(y + dy > canvas.height - ballRadius) {
		    if(x > x3 && x < x3 + padWidth1) {
		        dy = -dy;
		    }
		    else {
		        alert("GAME OVER");
		        document.location.reload();
		        clearInterval(interval); // Needed for Chrome to end game
		    }
		}
	}

	x+=dx;
	y+=dy;
}

var interval = setInterval(draw, 10);