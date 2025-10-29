const gameContainer = document.getElementById("game-container");
const playerDiv = document.getElementById("player");
const scoreEl = document.getElementById("score");
const popup = document.getElementById("popup");
const finalScoreEl = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again");

let playerX = 190;
let score = 0;
let shapes = [];
let gameInterval;
let spawnInterval;
let gameOver = false;

function createStickman() {
    playerDiv.innerHTML = "";
    const stick = document.createElement("div");
    stick.classList.add("stickman");
    playerDiv.appendChild(stick);
    updatePlayerPosition();
}

function updatePlayerPosition() {
    playerDiv.style.left = `${playerX}px`;
}

function spawnShape() {
    const shape = document.createElement("div");
    shape.classList.add("falling-shape");

    const shapeType = ["shape-circle", "shape-square", "shape-triangle"][
        Math.floor(Math.random() * 3)
    ];
    shape.classList.add(shapeType);

    shape.style.left = Math.floor(Math.random() * 380) + "px";
    shape.style.top = "0px";

    gameContainer.appendChild(shape);
    shapes.push(shape);
}

function moveShapes() {
    shapes.forEach((shape, index) => {
        let top = parseInt(shape.style.top);
        shape.style.top = `${top + 4}px`;

        if (top > 580) {
            // Update score when the player successfully dodges the shape
            score++;
            scoreEl.textContent = `Score: ${score}`;
            shape.remove();
            shapes.splice(index, 1);
        }

        const playerRect = playerDiv.getBoundingClientRect();
        const shapeRect = shape.getBoundingClientRect();

        // If a shape hits the player, it's game over
        if (
            shapeRect.bottom >= playerRect.top &&
            shapeRect.left < playerRect.right &&
            shapeRect.right > playerRect.left
        ) {
            endGame();
        }
    });
}

function gameLoop() {
    if (!gameOver) {
        moveShapes();
    }
}

function startGame() {
    popup.style.display = "none";
    score = 0;
    scoreEl.textContent = "Score: 0";
    shapes.forEach(s => s.remove());
    shapes = [];
    gameOver = false;

    createStickman();
    gameInterval = setInterval(gameLoop, 30);
    spawnInterval = setInterval(spawnShape, 800);
}

function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    popup.style.display = "flex";
    finalScoreEl.textContent = `Game Over! Final Score: ${score}`;
}

document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    const playerWidth = playerDiv.offsetWidth;

    if (e.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
        // Prevent going past the left edge
        if (playerX < 0) playerX = 0;
    } else if (e.key === "ArrowRight" && playerX < gameContainer.offsetWidth - playerWidth) {
        playerX += 20;
        // Prevent going past the right edge
        if (playerX > gameContainer.offsetWidth - playerWidth) {
            playerX = gameContainer.offsetWidth - playerWidth;
        }
    }

    updatePlayerPosition();
});

playAgainBtn.addEventListener("click", () => {
    startGame();
});

startGame();
