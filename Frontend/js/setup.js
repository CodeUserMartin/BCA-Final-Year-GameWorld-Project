console.log("Hello World");



// Getting Avatars from the backend
const getAvatars = async () => {

    try {
        const response = await fetch("http://localhost:4000/api/v3/avatars")

        if (!response.ok) {
            alert("Error feching avatars");
        }

        const avatars = await response.json();


        const avatarContainerel = document.getElementById("avatar-container");
        avatarContainerel.innerHTML = "";

        avatars.forEach(avatar => {

            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.src = avatar.url;
            img.alt = avatar.name;
            img.title = avatar.name
                .replace(/_/g, " ")  // Replace underscores with spaces
                .replace(/\s*\(.\)$/, ""); // Remove gender suffix like "(F)" or "(M)"
            img.dataset.avatar = avatar.name;

            figure.appendChild(img)
            avatarContainerel.append(figure);

            // Avatar selected
            img.addEventListener("click", () => {
                const allFigures = avatarContainerel.querySelectorAll("figure");

                // Remove 'selected' from all
                allFigures.forEach(fig => fig.classList.remove("selected"));

                // Add 'selected' to the clicked one
                figure.classList.add("selected");

                // Log the actual selected avatar name
                console.log("Selected Avatar:", img.dataset.avatar);
            });

        });


    } catch (error) {
        console.error("Error fetching avatars!!", error);
    }

}

getAvatars();


// Theme
const themeContaienrEl = document.getElementById("theme-container");
const allThemes = themeContaienrEl.querySelectorAll(".box");

allThemes.forEach(theme => {
    theme.addEventListener("click", () => {

        // Remove 'selected' class from all
        allThemes.forEach(t => { t.classList.remove("selected") });

        // Add 'selected' class to clicked one
        theme.classList.add("selected");


        // Log the selected Theme
        console.log("Selected Theme", theme.dataset.theme);
    });
});




// Username Availibility check


const usernameInput = document.getElementById("username");
const usernameStatusIcon = document.getElementById("username-status-icon")


let isUsernameAvailable = false;

usernameInput.addEventListener("input", async () => {

    const username = usernameInput.value;

    if (!username) {
        usernameStatusIcon.textContent = "";
        isUsernameAvailable = false;
        return;
    }

    try {

        let response = await fetch(`http://localhost:4000/api/v2/profile/check-username?username=${username}`, {
            method: 'GET',
            credentials: 'include',
        });

        const data = await response.json();

        if (data.available) {
            usernameStatusIcon.textContent = "✔️";
            usernameStatusIcon.style.color = "green";
            isUsernameAvailable = true;
        }
        else {
            usernameStatusIcon.textContent = "❌";
            usernameStatusIcon.style.color = "red";
            isUsernameAvailable = false;
        }

    } catch (error) {
        console.error("Username check failed", error);
        usernameStatusIcon.textContent = "⚠️";
        usernameStatusIcon.style.color = "orange";
        isUsernameAvailable = false;
    }
})



// Sending Profile data to the backend


const profileData = async () => {

    // Username
    const username = document.getElementById("username").value;

    // Avatar
    const selectedAvatarFigure = document.querySelector("#avatar-container figure.selected");
    const avatar = selectedAvatarFigure ? selectedAvatarFigure.querySelector("img").dataset.avatar : null;

    // Theme
    const selectedThemeEl = document.querySelector("#theme-container .box.selected");
    const theme = selectedThemeEl ? selectedThemeEl.dataset.theme : null;

    try {


        if (!username || !avatar || !theme) {
            alert("All field are required!");
            return;
        }

        const profileField = {
            username,
            avatar,
            theme,
        }


        let response = await fetch("http://localhost:4000/api/v2/profile", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profileField),
        });

        const data = await response.json();
        console.log("Response from the server:", data);

        if (response.ok) {
            localStorage.setItem("Username", username);
            localStorage.setItem("Avatar", avatar);
            localStorage.setItem("Theme", theme);
            window.location.href = "loader2.html";
        }

    } catch (error) {
        console.error("Something went wrong while creating profile", error);
    }
}
