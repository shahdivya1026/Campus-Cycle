const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // your XAMPP MySQL root password
  database: "campus_cycle_db",
});

module.exports = db;
