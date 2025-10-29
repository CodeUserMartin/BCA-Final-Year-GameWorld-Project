const figures = document.querySelectorAll('.game');
        const gamePlayer = document.getElementById('gamePlayer');
        const gameIframe = document.getElementById('gameIframe');
        const gameNameElement = document.getElementById("currentGameName");

        figures.forEach(figure => {
            figure.addEventListener('click', () => {
                const gameUrl = figure.getAttribute('data-src');
                const gameName = figure.querySelector("figcaption").innerText;
                gameIframe.src = gameUrl;
                gameNameElement.innerText = gameName; 
                gamePlayer.style.display = 'block';
                gamePlayer.scrollIntoView({ behavior: "smooth" });
            });
        });

        function closeGame() {
            // Hide the game player
            const gamePlayer = document.getElementById("gamePlayer");
            gamePlayer.style.display = "none";

            // Clear the iframe source
            document.getElementById("gameIframe").src = "";

            // Smooth scroll back to the top of game section
            const gameSection = document.querySelector(".custom-game-container"); 
            if (gameSection) {
                gameSection.scrollIntoView({ behavior: "smooth" });
            }
        }