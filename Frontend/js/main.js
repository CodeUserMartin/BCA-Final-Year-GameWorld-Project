console.log("Hello World");

// Existing Html Elements

const usernameEl = document.getElementById("user");
const userAvatarEl = document.querySelector("#user-avatar img");

const storedUserNameEl = localStorage.getItem("Username");
const storedThemeEl = localStorage.getItem("Theme");
const storedAvatarEl = localStorage.getItem("Avatar");


// Setting up the local storage data to the UI
usernameEl.innerHTML = storedUserNameEl;
document.documentElement.setAttribute("data-theme", storedThemeEl);

if (storedAvatarEl && userAvatarEl) {
    userAvatarEl.src = `http://localhost:4000/avatars/${storedAvatarEl}.jpg`;
}


const profileUserNameEl = document.getElementById("username");
profileUserNameEl.innerHTML = storedUserNameEl;