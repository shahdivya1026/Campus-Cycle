const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // XAMPP default
    password: '',       // XAMPP default
    database: 'campus_cycle'
});

// ================= Signup =================
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ msg: "All fields are required" });

    // Validate email ending
    if (!email.endsWith('@apsit.edu.in')) return res.status(400).json({ msg: "Email must end with @apsit.edu.in" });

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        if (result.length > 0) return res.status(400).json({ msg: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err2, result2) => {
            if (err2) return res.status(500).json({ msg: err2 });
            return res.status(200).json({ msg: "Signup successful", user: { name, email } });
        });
    });
});

// ================= Login =================
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "All fields are required" });

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        if (result.length === 0) return res.status(400).json({ msg: "User not found" });

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: "Incorrect password" });

        // Login successful
        return res.status(200).json({ msg: "Login successful", user: { name: user.name, email: user.email } });
    });
});

module.exports = router;
