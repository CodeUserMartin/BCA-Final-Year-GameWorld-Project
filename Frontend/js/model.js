
// Navigation Buttons elements
const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");


// Slider Logic elements
const sections = document.querySelectorAll(".setup-section");
const sliderWrapperEl = document.querySelector(".slider-wrapper");

// model display element
const model = document.getElementById("message-model");
const usernamePopUpEl = document.getElementById("username-popup");
const usernameCheckPopup = document.getElementById("username-check-popup");


// Profile Setup elements
const username = document.getElementById("username");

let currentIndex = 0;

function updateButtonState() {
    if (currentIndex === 0) {
        prevEl.disabled = true; // Disable prev button on first section
    } else {
        prevEl.disabled = false; // Enable prev button on other sections
    }

    // Change Next to Finish on last slide
    if (currentIndex === sections.length - 1) {
        document.getElementById("text").innerHTML = "F I N I S H";
    } else {
        document.getElementById("text").textContent = "N E X T";
    }
}


function isUsernameValid() {
    return username.value.trim() !== ""; // Checks if input is not empty
}

nextEl.addEventListener("click", () => {
    if (currentIndex === 0) {
        if (!isUsernameValid()) {

            usernamePopUpEl.classList.add("show");

            setTimeout(() => {
                usernamePopUpEl.classList.remove("show");
            }, 3000)

            return;
        }

        if (!isUsernameAvailable) {
            usernameCheckPopup.classList.add("show");

            setTimeout(() => {
                usernameCheckPopup.classList.remove("show");
            }, 3000)

            return;
        }
    }

    if (currentIndex == sections.length - 1) {
        // Trigger the final setup submission
        if (typeof profileData === "function") {
            profileData(); // It's declared globally in setup.js
        } else {
            console.alert("Profile data function not found in setup js file!");
        }

    }

    if (currentIndex < sections.length - 1)
        currentIndex++
    updateSlider();
    updateButtonState();
    increaseProgress();
})


prevEl.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--
        updateSlider();
        updateButtonState();
        decreaseProgress();
    }
})

function updateSlider() {
    sliderWrapperEl.style.transform = `translateX(-${currentIndex * 100}vw)`;
}



let progressSteps = [0, 33.3, 66.6, 100]; // Progress in steps
let stepIndex = 1;

// Progress bar function
function setProgress(step) {

    // Circular Bar
    const circle = document.querySelector('.progress-bar');
    const circleText = document.querySelector('.progress-text');

    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (progressSteps[step] / 100) * circumference;

    circle.style.strokeDashoffset = offset;
    circleText.textContent = `${step}/3`;


    // Horizontal Bar
    const bar = document.querySelector('.horizontal-bar');
    const barText = document.querySelector('.horizontal-text');

    bar.style.width = `${progressSteps[step]}%`;
    barText.textContent = `${step}/3`;
}

// increased Section number function
function increaseProgress() {
    if (stepIndex < 3) {
        stepIndex++; // Move to next step
        setProgress(stepIndex);
    }

}

// Decreased section number function
function decreaseProgress() {
    if (stepIndex <= 3) {
        stepIndex--;
        setProgress(stepIndex);
    }
}


updateButtonState();