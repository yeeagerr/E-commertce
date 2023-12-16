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
const util = require("util");
const { isUtf8 } = require("buffer");

const readFileAsync = utils.promisify(fs.readFile);

// Assuming you have a 'mysql' connection object
const queryAsync = util.promisify(mysql.query).bind(mysql);

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
    console.log(`Error rendering EJS file: `);
  }
}

async function sendEmail(nama, email, hash) {
  try {
    const ejsData = {
      nama: nama,
      kode: hash, // Pass the hash to the template
    };

    const htmlContent = await renderEjsFile("views/htmlEmail.ejs", ejsData);

    const mailOption = {
      from: "nezseco@gmail.com",
      to: email,
      subject: `Hai ${nama}! , Verifikasi Akun Yuk`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOption);
    console.log("EMAIL SENT");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error to handle it in the calling function
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

// app.post("/register", (req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.pass;

//   mysql.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result) => {
//     if (err) throw err;

//     if (result.length > 0) {
//       return res.redirect("/err/regEmail");
//     }

//     const sql = `INSERT INTO user (username, password, email, kode) VALUES ('${username}', '${password}', '${email}', '${hash}')`;

//     mysql.query(sql, (err) => {
//       if (err) throw err;
//       console.log("USER SUCCES ADDED");

//       sendEmail(username, email);

//       res.render("htmlEmail", { kode: `${hash}` });
//       return res.redirect(`/success/${hash}`);
//     });
//   });
// });

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.pass;

  try {
    // Generate a new hash for each registration
    const hash = hashing();

    // Check if email is already registered
    const existingUser = await queryAsync(
      `SELECT * FROM user WHERE email = ?`,
      [email]
    );

    if (existingUser.length > 0) {
      return res.redirect("/err/regEmail");
    }

    // Insert user into the database
    await queryAsync(
      "INSERT INTO user (username, password, email, kode) VALUES (?, ?, ?, ?)",
      [username, password, email, hash]
    );

    console.log("USER SUCCESSFULLY ADDED");

    // Send the email
    await sendEmail(username, email, hash);

    // Redirect to the success page with the new hash
    return res.redirect(`/success/${hash}`);
  } catch (error) {
    console.error("Error registering user:", error);
    return res.redirect("/err/registerError");
  }
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

  mysql.query(`SELECT * FROM user WHERE kode = ? `, [params], (err, result) => {
    let fetch;
    result.forEach((element) => {
      fetch = element.status;
    });

    if (fetch === "second") {
      res.redirect(`/verif2/fillout/${params}`);
    } else {
      res.render("verif", { params: params });
    }
  });
});

app.get("/verif/:hash/:status", (req, res) => {
  const pHash = req.params.hash;
  const status = req.params.status;

  mysql.query(
    `UPDATE user SET status = ? WHERE kode = ?`,
    [status, pHash],
    (err) => {
      if (err) throw err;

      res.redirect(`/verif2/fillout/${pHash}`);
    }
  );

  mysql.query(`SELECT * FROM user WHERE kode = ?`, [pHash], (err, result) => {
    if (err) throw err;

    for (let data of result) {
      if (data === "second") {
        res.redirect(`/verif2/fillout/${pHash}`);
      }
    }
  });
});

app.get("/verif2/fillout/:hash", (req, res) => {
  const pHash = req.params.hash;

  mysql.query(`SELECT * FROM user WHERE kode = ?`, [pHash], (err, result) => {
    for (let data of result) {
      if (data.status === "second") {
        res.render("fillout", { kode: data.kode });
      } else {
        res.redirect(`/succes/${pHash}`);
      }
    }
  });
});

app.post("/verif2/fillout/:hash", (req, res) => {
  const pHash = req.params.hash;
  const namaDepan = req.body.namaDepan;
  const namaBelakang = req.body.namaBelakang;

  mysql.query(
    `UPDATE user SET namad = ?,  namab = ?, status = 'third' WHERE kode = '${pHash}'`,
    [namaDepan, namaBelakang],
    (err, result) => {
      if (err) {
        console.log("gagal update nama ");
      }

      res.redirect("/");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Port running at ${PORT}`);
});
