const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const birdWidth = 30;
const birdHeight = 30;
let birdX = 50;
let birdY = canvas.height / 2;
let birdSpeed = 0;
let gravity = 0.5;
let jumpPower = -10;

const pipeWidth = 50;
const pipeGap = 150;
let pipes = [];
let score = 0;
let gameOver = false;

const popup = document.getElementById("popup");
const finalScoreEl = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again");

function drawBird() {
    ctx.beginPath();
    ctx.rect(birdX, birdY, birdWidth, birdHeight);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.closePath();
}

function drawPipes() {
    pipes.forEach((pipe, index) => {
        ctx.beginPath();
        ctx.rect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.rect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
        ctx.fillStyle = "#32CD32";
        ctx.fill();
        ctx.closePath();

        // Move pipes
        pipe.x -= 2;

        // Remove off-screen pipes
        if (pipe.x + pipeWidth < 0) {
            pipes.splice(index, 1);
            score++;
        }

        // Check for collisions with pipes
        if (
            birdX + birdWidth > pipe.x &&
            birdX < pipe.x + pipeWidth &&
            (birdY < pipe.topHeight || birdY + birdHeight > canvas.height - pipe.bottomHeight)
        ) {
            gameOver = true;
            popup.style.display = "flex";
            finalScoreEl.textContent = `Game Over! Final Score: ${score}`;
        }
    });
}

function createPipe() {
    if (!gameOver) {
        const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({
            x: canvas.width,
            topHeight: pipeHeight,
            bottomHeight: canvas.height - pipeHeight - pipeGap,
        });
    }
}

function moveBird() {
    birdSpeed += gravity;
    birdY += birdSpeed;

    if (birdY + birdHeight > canvas.height || birdY < 0) {
        gameOver = true;
        popup.style.display = "flex";
        finalScoreEl.textContent = `Game Over! Final Score: ${score}`;
    }
}

function gameLoop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBird();
        drawPipes();
        moveBird();
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("Score: " + score, 10, 20);
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === " " && !gameOver) {
        birdSpeed = jumpPower;
    }
});

playAgainBtn.addEventListener("click", () => {
    gameOver = false;
    score = 0;
    birdY = canvas.height / 2;
    birdSpeed = 0;
    pipes = [];
    popup.style.display = "none";
    gameLoop();
});

setInterval(createPipe, 2000);
gameLoop();
