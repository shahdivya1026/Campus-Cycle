// ================= Toggle Password =================
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.querySelector(".eye-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        eyeIcon.textContent = "👁️";
    }
}

// ================= Signup/Login Form =================
document.querySelector(".form-box").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password")?.value || "";

    // Email validation
    if (!/^[^@]+@apsit\.edu\.in$/.test(email)) {
        return alert("Email must end with @apsit.edu.in");
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordPattern.test(password)) {
        return alert("Password must have 8+ chars, uppercase, lowercase, number & special char.");
    }

    if (confirmPassword && password !== confirmPassword) {
        return alert("Passwords do not match!");
    }

    // Determine if it's login or signup
    const isSignup = !!document.getElementById("name");
    const url = isSignup ? "http://localhost:3000/api/auth/signup" : "http://localhost:3000/api/auth/login";

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(isSignup ? { name, email, password } : { email, password }),
        });
        const data = await res.json();

        if (res.ok) {
            alert(data.message);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.name);
            window.location.href = "home.html"; // redirect to home page
        } else {
            alert(data.error);
        }
    } catch (err) {
        alert("Server error: " + err.message);
    }
});
