const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const path = require("path");
const app = express();
const mysql = require("./db/db.js");

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/LogOrReg/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/LogOrReg/register.html"));
});

app.post("/registered", (req, res) => {
  const d = new Date();
  const hash = crypto.createHash("sha256");
  hash.update(d.toString());
  const resulthash = hash.digest("hex");

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.pass;

  const sql = `INSERT INTO user (username, password, email, kode) VALUES ('${username}', '${password}', '${email}', '${resulthash}')`;

  res.send(result);

  //   mysql.query(sql, (err) => {
  //     if (err) throw err;
  //     console.log("USER SUCCES ADDED");

  //   });
});

app.listen(PORT, () => {
  console.log(`Port running at ${PORT}`);
});
