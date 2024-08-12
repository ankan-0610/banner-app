require('dotenv').config();  // Load .env file content into process.env

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbURL = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_PRIVATE_DOMAIN}:3306/${process.env.MYSQL_DATABASE}`;

const db = mysql.createConnection(dbURL);

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Get banner details
app.get("/api/banner", (req, res) => {
  db.query("SELECT * FROM banner_db LIMIT 1", (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Update banner details
app.post("/api/banner", (req, res) => {
  const { description, timer, link, visible } = req.body;
  db.query(
    "UPDATE banner_db SET description=?, timer=?, link=?, visible=? WHERE id=1",
    [description, timer, link, visible],
    (err, result) => {
      if (err) throw err;
      res.json({ status: "success" });
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});