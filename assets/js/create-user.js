document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("createUserBtn");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        const username = document.getElementById("newUsername").value.trim();
        const password = document.getElementById("newPassword").value.trim();
        const fullName = document.getElementById("fullName").value.trim();
        const role = document.getElementById("role").value;

        if (!username || !password || !fullName || !role) {
            alert("All fields are required");
            return;
        }

        try {
            const result = await apiPost("createUser", { username, password, fullName, role });
            if (result.success) alert("User created successfully!");
            else alert(result.message);
        } catch (err) {
            console.error(err);
            alert("Error creating user");
        }
    });
});
