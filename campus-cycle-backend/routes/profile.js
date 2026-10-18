const express = require('express');
const router = express.Router();

// This route fetches profile info for a logged-in user (frontend sends email in query)
router.get('/', (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ msg: "Email required" });

    const mysql = require('mysql');
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'campus_cycle'
    });

    db.query('SELECT name, email FROM users WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        if (result.length === 0) return res.status(404).json({ msg: "User not found" });

        return res.status(200).json({ profile: result[0] });
    });
});

module.exports = router;
