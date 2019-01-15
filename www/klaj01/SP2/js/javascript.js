var el = document.querySelector("gamefield");
var el1 = document.querySelector("panel_01");
setTimeout(Element, 10000000000000000000000000000);

function onClickFunction() {
  document.location.reload();
}
const winscore = 2;
/* vybrání elementu podle id */
const canvas = document.getElementById("gamefield");
/* "kreslení" v Canvasu */
const ctx = canvas.getContext("2d");
/* Definování míčku */
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  velocityX: 5,
  velocityY: 5,
  speed: 15,
  color: "WHITE"
};
/* User pálka*/
const user = {
  x: 0,
  y: (canvas.height - 100) / 2,
  width: 15,
  height: 100,
  score: 0,
  color: "BLUE"
};

/* AI pálka */
const com = {
  x: canvas.width - 10,
  y: (canvas.height - 100) / 2,
  width: 15,
  height: 100,
  score: 0,
  color: "RED"
};

/* Dělící čára */
const net = {
  x: (canvas.width - 2) / 2,
  y: 0,
  height: 10,
  width: 4,
  color: "#cccccc"
};

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

/* Vytvoření kruhu pro míček*/
function drawArc(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

/* Hrani pomoci myši */
canvas.addEventListener("mousemove", getMousePos);

function getMousePos(evt) {
  let rect = canvas.getBoundingClientRect();

  user.y = evt.clientY - rect.top - user.height / 2;
}

/* restart míčku po skorovani*/
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 15;
}
function endBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.color = "YELLOW";
}

/* Vykreslení dělící čáry */
function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

/* Vykreslení skore*/
function drawText(text, x, y) {
  ctx.fillStyle = "#cccccc";
  ctx.font = "75px Consolas";
  ctx.fillText(text, x, y);
}

function collision(b, p) {
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return (
    p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top
  );
}

function update() {
  /* Změna skore */
  if (ball.x - ball.radius < 0) {
    com.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    resetBall();
  } else if (user.score >= winscore) {
    document.getElementById("score").innerHTML =
      "Winner!" + user.score + ":" + com.score;
    $("#gamefield").remove();
    $(".panel_01").remove();
    endBall();
  } else if (com.score >= winscore) {
    document.getElementById("score").innerHTML =
      "Loser!" + user.score + ":" + com.score;
    $("#gamefield").remove();
    $(".panel_01").remove();
    endBall();
  }

  /* rychlost míčku*/
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  /* Uměla inteligence - rychlost reakce na pohyb micku */
  com.y += (ball.y - (com.y + com.height / 2)) * 0.09;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
  }

  /* kontrola zasahu uživatel/AI */
  let player = ball.x + ball.radius < canvas.width / 2 ? user : com;

  if (collision(ball, player)) {
    let collidePoint = ball.y - (player.y + player.height / 2);
    collidePoint = collidePoint / (player.height / 2);

    let angleRad = (Math.PI / 4) * collidePoint;

    let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    ball.speed += 0.1;
  }
}

function render() {
  /* Vykreslení objektů */
  drawRect(0, 0, canvas.width, canvas.height, "#000");

  drawText(user.score, canvas.width / 4, canvas.height / 5);

  drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5);

  drawNet();

  drawRect(user.x, user.y, user.width, user.height, user.color);

  drawRect(com.x, com.y, com.width, com.height, com.color);

  drawArc(ball.x, ball.y, ball.radius, ball.color);
}

let framePerSecond = 60;

let loop = setInterval(game, 1200 / framePerSecond);

function game() {
  update();
  render();
}
