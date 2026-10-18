const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // database connection

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔹 Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// 🔹 Cart routes
const cartRoutes = require("./routes/cart");
app.use("/api/cart", cartRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
