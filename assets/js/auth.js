document.addEventListener("DOMContentLoaded", () => {
    console.log("auth.js loaded");

    const loginBtn = document.getElementById("loginBtn");
    const createBtn = document.getElementById("createAccountBtn");

    // LOGIN BUTTON
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            console.log("Login button clicked");

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!username || !password) {
                alert("Please enter username and password");
                return;
            }

            const result = await apiPost("login", { username, password });
            console.log("Login result:", result);

            if (result.success) {
                localStorage.setItem("user", JSON.stringify(result.user));

                if (result.user.role === "admin") {
                    window.location.href = "dashboard.html";
                } else if (result.user.role === "evaluator") {
                    window.location.href = "evaluations.html";
                } else {
                    window.location.href = "agent.html";
                }
            } else {
                alert(result.message);
            }
        });
    }

    // CREATE ACCOUNT BUTTON
    if (createBtn) {
        createBtn.addEventListener("click", () => {
            console.log("Create Account button clicked");
            window.location.href = "signup.html";
        });
    }
});
