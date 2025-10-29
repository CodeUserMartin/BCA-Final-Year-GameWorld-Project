const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let basket, apples, score, speed, lives, isGameOver;

function initGame() {
    basket = { x: 175, y: 450, width: 60, height: 20 };
    apples = [];
    score = 0;
    speed = 2;
    lives = 3;
    isGameOver = false;
    document.getElementById("popup").style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameLoop();
}

function drawBasket() {
    ctx.fillStyle = "brown";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawApples() {
    ctx.fillStyle = "red";
    apples.forEach(apple => {
        ctx.beginPath();
        ctx.arc(apple.x, apple.y, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateApples() {
    apples.forEach((apple, index) => {
        apple.y += speed;
        if (apple.y > canvas.height) {
            apples.splice(index, 1);
            lives--;
            if (lives <= 0) {
                endGame();
            }
        } else if (
            apple.y + 10 > basket.y &&
            apple.x > basket.x &&
            apple.x < basket.x + basket.width
        ) {
            apples.splice(index, 1);
            score++;
            if (score % 5 === 0) speed += 0.5;
        }
    });
}

function spawnApple() {
    if (!isGameOver) {
        let x = Math.random() * (canvas.width - 20) + 10;
        apples.push({ x: x, y: 0 });
    }
}

function endGame() {
    isGameOver = true;
    document.getElementById("final-score").textContent = `Game Over! Final Score: ${score}`;
    document.getElementById("popup").style.display = "flex";
}

function gameLoop() {
    if (!isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBasket();
        drawApples();
        updateApples();
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Score: " + score, 10, 20);
        ctx.fillText("Lives: " + lives, 270, 20);
        requestAnimationFrame(gameLoop);
    }
}

// Spawn apples every second
setInterval(spawnApple, 1000);
initGame();

// Keyboard controls
document.addEventListener("keydown", function(event) {
    if (!isGameOver) {
        if (event.key === "ArrowLeft" && basket.x > 0) basket.x -= 20;
        if (event.key === "ArrowRight" && basket.x < canvas.width - basket.width) basket.x += 20;
    }
});

// Play again button
document.getElementById("play-again").addEventListener("click", function() {
    initGame();
});
