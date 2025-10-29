document.addEventListener("DOMContentLoaded", () => {

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

        } catch (err) {
            console.error("Eoor, getting avatar for server", err);
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



    // Update profile sending data to the backend (Avatar or Theme or Both)

    const updateProfile = async () => {

        const confirmAvatarUpdateBtn = document.getElementById("confirm-avatar-update-btn")



        //For avatar update
        if (confirmAvatarUpdateBtn) {

            confirmAvatarUpdateBtn.addEventListener("click", async () => {
                const selectedAvatarFigure = document.querySelector("#avatar-container figure.selected");
                const avatar = selectedAvatarFigure ? selectedAvatarFigure.querySelector("img").dataset.avatar : null;

                if (!avatar) {
                    alert("Please select an avatar first!");
                    return;
                }

                try {
                    const response = await fetch("http://localhost:4000/api/v2/profile/update-profile", {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ avatar }),
                    });

                    const data = await response.json();
                    console.log("Avatar update response:", data);

                    if (response.ok) {
                        localStorage.setItem("Avatar", avatar);

                        // ✅ Instantly update avatar image on the homepage
                        const userAvatarImg = document.querySelector("#user-avatar img");
                        if (userAvatarImg) {
                            userAvatarImg.src = `http://localhost:4000/avatars/${avatar}.jpg`;
                        }

                        alert("Avatar updated successfully!");
                    } else {
                        alert(data?.message || "Failed to update avatar!");
                    }
                } catch (err) {
                    console.error("Error updating avatar:", err);
                }
            });

        }


        // For Theme

        const confirmThemeUpdateBtn = document.getElementById("confirm-theme-update-btn");

        if (confirmThemeUpdateBtn) {

            confirmThemeUpdateBtn.addEventListener("click", async () => {
                const selectedThemeEl = document.querySelector("#theme-container .box.selected");
                const theme = selectedThemeEl ? selectedThemeEl.dataset.theme : null;

                if (!theme) {
                    alert("Please select a theme first!");
                    return;
                }

                try {
                    const response = await fetch("http://localhost:4000/api/v2/profile/update-profile", {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ theme }),
                    });

                    const data = await response.json();
                    console.log("Theme update response:", data);

                    if (response.ok) {
                        localStorage.setItem("Theme", theme);

                        // Instantly apply the theme to the HTML tag
                        document.documentElement.setAttribute("data-theme", theme);
                        alert("Theme updated successfully!");
                    } else {
                        alert(data?.message || "Failed to update theme!");
                    }
                } catch (err) {
                    console.error("Error updating theme:", err);
                }
            });

        }

    }

    updateProfile();

});