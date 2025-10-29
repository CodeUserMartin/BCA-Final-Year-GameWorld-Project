console.log("Hello World");




const reqHandler = (id, url, message) => {

    id.addEventListener('submit', async function (e) {
        e.preventDefault();


        // Get input field dynamically

        const nameField = document.getElementById("name");
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const userData = nameField ?
            { name: nameField.value.trim(), email, password } : { email, password };

        console.log("User data:", userData);

        try {

            let response = await fetch(url, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            });


            const { data } = await response.json();

            if (response.ok) {
                if (message == "Signup") {
                    window.location.href = "setup.html"
                }
                else if (message == "Login") {

                    try {
                        if (data && data.user) {

                            const { username, avatar, theme } = data.user;


                            localStorage.setItem("Username", username);
                            localStorage.setItem("Avatar", avatar);
                            localStorage.setItem("Theme", theme);

                            window.location.href = "index.html";
                        } else {
                            console.error("User data not found in response.");
                        }
                    } catch (error) {
                        console.error("Error: ", error.message);

                    }

                }

            } else {
                console.error(`Error While doing ${message}`, data.message || "Unknown Error");
            }

        } catch (error) {
            console.error("Someting Went Wrong!", error);
        }
    });

}



const signupForm = document.getElementById("signup-form");
if (signupForm) {

    reqHandler(signupForm, "http://localhost:4000/api/v1/users/signup", "Signup");
}


const loginForm = document.getElementById("login-form");
if (loginForm) {

    reqHandler(loginForm, "http://localhost:4000/api/v1/users/login", "Login");
}


