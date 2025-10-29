console.log("Hello");



const profilePageEl = document.getElementById("profile-page");
const closeBtnEl = document.getElementById("close-btn");


// Profile page options btn 

const gameplayedOptionBtnEl = document.getElementById("gameplayedOptionBtn");
const changeAvatarOptionBtnEl = document.getElementById("changeAvatarOptionBtn");
const changeThemeOptionBtnEl = document.getElementById("changeThemeOptionBtn");



// Go back elementts of each model
const gamePlayedGoBackEl = document.getElementById("games-played-go-back");
const avatarGoBackEl = document.getElementById("avatar-go-back");
const themeGoBackEl = document.getElementById("theme-go-back");


// Sections Model

const gamePlayedSectionEl = document.getElementById("game-played-section");
const avatarSectionEl = document.getElementById("avatar-section");
const themeSectionEl = document.getElementById("theme-section");






userAvatarEl.addEventListener("click", (() => {
    profilePageEl.style.transform = "translateX(0)";
    profilePageEl.style.opacity = "1";
    document.body.classList.add("dark");
}));

closeBtnEl.addEventListener("click", (() => {
    profilePageEl.style.transform = "translateX(-100%)";
    profilePageEl.style.opacity = "0";
    document.body.classList.remove("dark");

}));



// Logic for particular Model open - close.

function modelChange(openModelId, sectionId, closeModelId) {

    openModelId.addEventListener("click", () => {
        sectionId.style.transform = "translateX(0)";
        sectionId.style.opacity = "1";
    });

    closeModelId.addEventListener("click", () => {
        sectionId.style.transform = "translateX(-100%)";
        sectionId.style.opacity = "0";
    });
}

modelChange(gameplayedOptionBtnEl, gamePlayedSectionEl, gamePlayedGoBackEl);
modelChange(changeAvatarOptionBtnEl, avatarSectionEl, avatarGoBackEl);
modelChange(changeThemeOptionBtnEl, themeSectionEl, themeGoBackEl);




