document.querySelector(".form-box").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email.endsWith("@apsit.edu.in")) return alert("Email must end with @apsit.edu.in");
    if (password === "") return alert("Password cannot be empty!");

    try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (res.status !== 200) return alert("❌ " + data.msg);

        // Save logged-in user info
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("✅ Login Successful!");
        window.location.href = "home.html"; // redirect to home
    } catch (err) {
        alert("Server error: " + err.message);
    }
});

// Password toggle
function togglePassword() {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}
