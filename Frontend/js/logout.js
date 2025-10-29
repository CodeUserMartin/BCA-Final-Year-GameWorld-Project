
const logoutBtnEl = document.getElementById("logout")

logoutBtnEl.addEventListener("click", async (e) => {
    e.preventDefault();


    try {
        let response = await fetch("http://localhost:4000/api/v1/users/logout", {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }

        });

        const result = await response.json();
        console.log(result.message);

        if (response.ok) {
            localStorage.clear();
            window.location.href = "../components/login.html"
        }


    } catch (error) {
        console.error("Error during logout", error);
    }

})