const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  uri: process.env.MYSQL_URL, // or use individual options like host, user, password, database
  connectionLimit: 10, // Adjust according to your needs
});

// Get banner details
app.get("/api/banner", (req, res) => {
  pool.query("SELECT * FROM banner_db LIMIT 1", (err, result) => {
    if (err) {
      console.log("query error...");
      res.status(500).json({ error: "Database query failed" });
      return;
    }
    res.json(result[0]);
    console.log("query accepted, get");
  });
});

// Update banner details
app.post("/api/banner", (req, res) => {
  const { description, timer, link, visible } = req.body;
  pool.query(
    "UPDATE banner_db SET description=?, timer=?, link=?, visible=? WHERE id=1",
    [description, timer, link, visible],
    (err, result) => {
      if (err) {
        console.log("cant post stuff here ...");
        res.status(500).json({ error: "Database query failed" });
        return;
      }
      res.json({ status: "success" });
      console.log("query accepted, post");
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
