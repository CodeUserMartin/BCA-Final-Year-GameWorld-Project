
document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello, from: fetch-games.js");

    async function embeddedGameFunc() {

        const embeddcontainer = document.querySelector("#embedded-container");

        try {
            const response = await fetch("http://localhost:4000/api/v4/games")
            const data = await response.json();
            const embeddedGames = data.data.filter(game => game.gameType === "embedded");

            embeddedGames.forEach(game => {
                // console.log("games :", game);

                const figure = document.createElement("figure");
                figure.classList.add("game");
                figure.setAttribute("data-src", game.gameFileName);


                figure.innerHTML = `
                   <img src="http://localhost:4000/${game.gameCoverImage}" alt="${game.gameName}">
                   <figcaption>${game.gameName}</figcaption>
            `;



                // 👇 Save clicked game to localStorage
                figure.addEventListener("click", () => {
                    let pastGames = JSON.parse(localStorage.getItem("pastGames")) || [];

                    const alreadyExists = pastGames.some(g => g.gameFileName === game.gameFileName);

                    let dbURL = "http://localhost:4000";

                    if (!alreadyExists) {
                        pastGames.push({
                            gameName: game.gameName,
                            gameCoverImage: `${dbURL}/${game.gameCoverImage}`,
                            gameFileName: game.gameFileName
                        });
                        localStorage.setItem("pastGames", JSON.stringify(pastGames));
                    }
                    renderPastGames(); // Update the "Past Games" section
                });
                embeddcontainer.appendChild(figure);
            });

        } catch (error) {
            console.error("Failed to fetch embedded games", error);

        }

    }

    async function customGameFunc() {

        const customGameContainer = document.querySelector(".custom-game-container");

        try {
            const response = await fetch("http://localhost:4000/api/v4/games");
            const result = await response.json();
            const customGames = result.data.filter(game => game.gameType === "custom");

            customGames.forEach(game => {

                // console.log("game2: ", game);

                const figure = document.createElement("figure");
                figure.classList.add("game");
                figure.setAttribute("data-src", game.gameFileName);

                figure.innerHTML = `
                   <img src="http://localhost:4000/${game.gameCoverImage}" alt="${game.gameName}">
                   <figcaption>${game.gameName}</figcaption>
                `;

                // ✅ Add this to save played game to localStorage
                figure.addEventListener("click", () => {
                    let pastGames = JSON.parse(localStorage.getItem("pastGames")) || [];

                    const alreadyExists = pastGames.some(g => g.gameFileName === game.gameFileName);

                    let dbURL = "http://localhost:4000";

                    if (!alreadyExists) {
                        pastGames.push({
                            gameName: game.gameName,
                            gameCoverImage: `${dbURL}/${game.gameCoverImage}`,
                            gameFileName: game.gameFileName
                        });
                        localStorage.setItem("pastGames", JSON.stringify(pastGames));
                    }

                    // Redirect to game
                    window.location.href = `http://localhost:4000/game-folder/${game.gameName}/index.html`;
                    renderPastGames();
                });

                customGameContainer.appendChild(figure);
            });

        } catch (err) {
            console.error("Failed to fetch custom games", err);
        }
    }




    function renderPastGames() {
        const pastGames = JSON.parse(localStorage.getItem("pastGames")) || [];
        const container = document.querySelector("#past-games-container"); 
        container.innerHTML = "";

        pastGames.forEach((game) => {
            const card = document.createElement("div");
            card.classList.add("game-card");

            const img = document.createElement("img");
            img.src = game.gameCoverImage;
            img.alt = game.gameName;

            card.appendChild(img);
            container.appendChild(card);
        });
    }




    // Logic for running games

    const gamePlayer = document.getElementById('gamePlayer');
    const gameIframe = document.getElementById('gameIframe');
    const gameNameElement = document.getElementById("currentGameName");

    document.getElementById('embedded-container').addEventListener('click', (event) => {
        const figure = event.target.closest('.game');
        if (!figure) return;

        const gameUrl = figure.getAttribute('data-src');
        const gameName = figure.querySelector("figcaption").innerText;

        gameIframe.src = gameUrl;
        gameNameElement.innerText = gameName;
        gamePlayer.style.display = 'block';
        gamePlayer.scrollIntoView({ behavior: "smooth" });
    });




    embeddedGameFunc();
    customGameFunc();
    renderPastGames();
});


function closeGame() {
    gamePlayer.style.display = "none";
    gameIframe.src = "";

    const gameSection = document.querySelector(".custom-game-container");
    if (gameSection) {
        gameSection.scrollIntoView({ behavior: "smooth" });
    }
}





