var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var help = document.getElementById("help");
var btn = document.getElementById("btn");
var highscore = document.getElementById("highscore");
var allScores = document.getElementById("allScores");
var showHS = document.getElementById("showHS");
var btnShowPos = document.getElementsByClassName("btnShowPos");

//for the ball
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 15;
//for the pad
//top
var x1 = canvas.width / 2;
var y1 = 0;
//bottom
var x3 = canvas.width / 2;
var y3 = canvas.height - ballRadius;
//width and height for top and bottom
var padWidth1 = 100;
var padHeight1 = 15;
//move the pad logic
var rightPressed = false;
var leftPressed = false;
//pad side move
var topSide = false;
var bottomSide = false;
//score
var score = 0;
//lives
var lives = 3;
//hit sound
var audio = new Audio("sounds/hit.mp3");
//bricks
var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 180;
var brickOffsetLeft = 120;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

//show game info
btn.addEventListener("click", function() {
    var xhttp = new XMLHttpRequest();
    var url = "https://api.myjson.com/bins/8k20c";
    //https://api.myjson.com/bins/1c8qvo
    xhttp.open("GET", url);
    xhttp.onload = function() {
        if (xhttp.status >= 200 && xhttp.status < 400) {
            var ourData = JSON.parse(xhttp.responseText);
            renderHTML(ourData);
        } else {
            console.log("We connected to the server, but it returned an error.");
        }
    };

    xhttp.onerror = function() {
        console.log("Connection error");
    }

    xhttp.send();

    btn.classList.add("hide-me");
});

function renderHTML(data) {
    var htmlString = "";

    htmlString += "<p>Welcome to brick cracker! " + data[0].name + " is a remake game of breakout.</p> \
    <p>For controlling the pad, use " + data[0].controls[0] + " and " + data[0].controls[1] + ".</p> \
    <p>For changing the position of the pad, use " + data[0].position[0] + " for moving the pad to top and " + data[0].position[1] + " for moving the pad to bottom.</p> \
    <p>Enjoy the game. Ho Anh Tu, UoE 2019</p>"

    help.insertAdjacentHTML("beforeend", htmlString);
}

//highscore text
function highScore() {
    var player = 0;
    while (localStorage.getItem("score" + player) != null) {
        player++;
    }
    localStorage.setItem("score" + player, score);
    player++;
}

//create each scores in all scores table
var numeros = 1;
for (player = 0; player < localStorage.length; player++) {
    allScores.innerHTML += "<br />" + numeros + ". <button class=btnShowPos value=" + localStorage.getItem("score" + player) + " onclick=getVal(this.value)>" + localStorage.getItem("score" + player) + "</button>";
    numeros++;
}

//compare score(shows text) to other high scores when button is clicked
function getVal(value) {
    var xhttpr = new XMLHttpRequest();
    var url = "https://api.myjson.com/bins/s0b6w";
    xhttpr.open("GET", url);
    xhttpr.onload = function() {
        if (xhttpr.status >= 200 && xhttpr.status < 400) {
            var compareData = JSON.parse(xhttpr.responseText);
            compareScores(compareData);
        } else {
            console.log("We connected to the server, but it returned an error.");
        }
    };

    xhttpr.onerror = function() {
        console.log("Connection error");
    }

    xhttpr.send();

    function compareScores(hscore) {
        var justSomeNumero = 0;
        for (q = 0; q < hscore.length; q++) {
            if (value >= hscore[q].score && justSomeNumero == 0) {
                alert("Your score is "+value + " which is higher than "+hscore[q].name +"\'s score: "+ hscore[q].score + " so your current position is " + (hscore.indexOf(hscore[q])+1) + ". place.");
                justSomeNumero++;
            }

        }

        //compScore.insertAdjacentHTML("beforeend", htmlString3);
    }
}


//show other high scores (from JSON)
var xhr = new XMLHttpRequest();
var url = "https://api.myjson.com/bins/s0b6w";
//https://api.myjson.com/bins/1gbzt0
xhr.open("GET", url);
xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
        var newData = JSON.parse(xhr.responseText);
        showScores(newData);
    } else {
        console.log("We connected to the server, but it returned an error.");
    }
};

xhr.onerror = function() {
    console.log("Connection error");
}

xhr.send();

function showScores(item) {
    var htmlString2 = "";

    htmlString2 += "<p>Here are other scorers: </p>";
    for (i = 0; i < item.length; i++) {
        htmlString2 += (item.indexOf(item[i])+1) + ". " + item[i].name + ": " + item[i].score + "<br />";
    }
    showHS.insertAdjacentHTML("beforeend", htmlString2);
}



//highscore.insertAdjacentHTML("beforeend", "Your highscore: " + localStorage.getItem("score"));

//function draw bricks
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
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

//ball collides with bricks
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y + brickHeight > b.y && y < b.y + brickHeight * 2) {
                    audio.play();
                    dy = -dy;
                    b.status = 0;
                    score += 100;
                    if (score == brickRowCount * brickColumnCount * 100) {
                        alert("YOU WON, YOU BROKE ALL BRICKS! YOUR SCORE IS " + score + "!");
                        highScore();
                        document.location.reload();
                    }
                }
            }
        }
    }
}

//score text
function drawScore() {
    ctx.font = "22px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 11, 22);
}

//lives text
function drawLives() {
    ctx.font = "22px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 85, 22);
}

//pressing keys functions
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } else if (e.keyCode == 87) {
        topSide = true;
    } else if (e.keyCode == 83) {
        bottomSide = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    } else if (e.keyCode !== 87) {
        topSide = false;
    } else if (e.keyCode !== 83) {
        bottomSide = false;
    }
}

//draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#2eb82e";
    ctx.fill();
    ctx.closePath();
}

//draw paddle top
function drawPad1() {
    ctx.beginPath();
    ctx.fillRect(x1, y1, padWidth1, padHeight1);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
//draw paddle bottom
function drawPad3() {
    ctx.beginPath();
    ctx.fillRect(x3, y3, padWidth1, padHeight1);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//game over logic
function gameOver() {
    lives--;
    if (!lives) {
        alert("GAME OVER, YOUR SCORE IS " + score + " AND YOU SMASHED " + (score / 100) + " BRICKS.");
        highScore();
        document.location.reload();
    } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        //x3 = (canvas.width - padWidth1) / 2;
    }
}

//draw everything and logic
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    collisionDetection();
    drawScore();
    drawLives();
    bottomSide = true;
    //if pad is on other side and ball hits the wall
    if (topSide && y > canvas.height - ballRadius) {
        gameOver();
    } else if (bottomSide && y < ballRadius) {
        gameOver();
    }
    //left and right bounce
    if (x + dx + ballRadius >= canvas.width || x + dx < ballRadius) {
        dx = -dx;
    }
    //bottom and top pad hit end logic
    if (topSide) {
        drawPad1();
        if (y + dy < ballRadius + 10) {
            if (x > x1 && x < x1 + padWidth1) {
                dy = -dy;
            } else {
                gameOver();
            }
        } else if (rightPressed && x1 < canvas.width - padWidth1) {
            x1 += 5;
        } else if (leftPressed && x1 > 0) {
            x1 -= 5;
        }
    } else if (bottomSide) {
        drawPad3();
        if (y + dy > canvas.height - ballRadius - 10) {
            if (x > x3 && x < x3 + padWidth1) {
                dy = -dy;
            } else {
                gameOver();
            }
        } else if (rightPressed && x3 < canvas.width - padWidth1) {
            x3 += 5;
        } else if (leftPressed && x3 > 0) {
            x3 -= 5;
        }
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();