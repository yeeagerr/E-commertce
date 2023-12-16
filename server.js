const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const path = require("path");
const app = express();
const mysql = require("./db/db.js");
const ejs = require("ejs");

//email
const nodemailer = require("nodemailer");
const fs = require("fs");
const utils = require("util");
const { isUtf8 } = require("buffer");

const readFileAsync = utils.promisify(fs.readFile);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nezseco@gmail.com",
    pass: "dyis cdjw lihh kjdf",
  },
});

async function renderEjsFile(path, data) {
  try {
    const fileContent = await readFileAsync(path, "utf-8");
    const renderedContent = ejs.render(fileContent, data);
    return renderedContent;
  } catch (error) {
    throw new Error(`Error rendering EJS file: ${error}`);
  }
}

async function sendEmail(nama, email) {
  try {
    const ejsData = {
      nama: nama,
    };

    const htmlContent = await renderEjsFile("template.ejs", ejsData);

    const mailOption = {
      from: "nezseco@gmail.com",
      to: email,
      subject: `Hai ${nama}! , Verifikasi Akun Yuk`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOption);
    console.log("EMAIL SENT");

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

//

function hashing() {
  const d = new Date();
  const hash = crypto.createHash("sha256");
  hash.update(d.toString());
  const resulthash = hash.digest("hex");
  return resulthash;
}

let hash = hashing();

console.log("hash part 1", hash);

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

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

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.pass;

  mysql.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      return res.redirect("/err/regEmail");
    }

    const sql = `INSERT INTO user (username, password, email, kode) VALUES ('${username}', '${password}', '${email}', '${hash}')`;

    mysql.query(sql, (err) => {
      if (err) throw err;
      console.log("USER SUCCES ADDED");

      sendEmail(email);
      return res.redirect(`/success/${resulthash}`);
    });
  });
});

app.get("/err/:cause", (req, res) => {
  const cause = req.params.cause;
  let output = "";
  let redirect = "";

  switch (cause) {
    case "regEmail":
      output = "Email Sudah Terdaftar";
      redirect = "/register";
      break;

    default:
      break;
  }
  res.render("error", { output: output, redirect: redirect });
});

app.get("/success/:newParams", (req, res) => {
  const params = req.params.newParams;
  res.render("verif", { params: params });
});

app.listen(PORT, () => {
  console.log(`Port running at ${PORT}`);
});
