const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const path = require("path");
const app = express();
const mysql = require("./db/db.js");
const ejs = require("ejs");
const session = require("express-session");

//session
app.use(
  session({
    secret: "S3SS-10N",
    resave: false,
    saveUninitialized: true,
  })
);

function sessionCheck(req, res, params) {
  if (req.session && req.session.user) {
    return res.render("indexing", { kode: params });
  } else {
    return res.sendFile(path.join(__dirname + "/appMain.html"));
  }
}

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

async function sendAdvice(nama, email, nohp, keluhan, unik) {
  try {
    let dataKeluh = {
      nama: nama,
      email: email,
      nohp: nohp,
      keluhan: keluhan,
      kode: unik,
    };

    const ejsRender = await renderEjsFile("views/keluh.ejs", dataKeluh);

    const mailOption = {
      from: email,
      to: "nezseco@gmail.com",
      subject: `Baginda Developer Habib, ada keluhan dari rakyat`,
      html: ejsRender,
    };

    const info = await transporter.sendMail(mailOption);
    console.log("email keluh berhasil dikirim");
  } catch (error) {
    console.log("error sending keluhan", error);
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

app.get("/", function (req, res) {
  res.redirect(`/Main/${hash}`);
});

app.get("/landing/:uniq", (req, res) => {
  const uniq = req.params.uniq;

  mysql.query(`SELECT * FROM user WHERE kode = ?`, [uniq], (err, result) => {
    if (result.length > 0) {
      res.redirect(`/Main/${result}`);
    }

    res.redirect(`/Main/${uniq}`);
  });
});

app.get("/Main/:kode", function (req, res) {
  const paramsKode = req.params.kode;
  sessionCheck(req, res, paramsKode);
});

app.get("/login", (req, res) => {
  let error = "";

  res.render("login", { err: error });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;

  if (email || pass) {
    mysql.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, pass],
      (err, result) => {
        if (err) {
          return console.log("err login");
        }
        let error = "";

        if (result.length > 0) {
          const dataFetch = result[0];
          req.session.user = `${email}, ${pass}`;
          res.redirect(`/Main/${dataFetch.kode}`);
        } else {
          error = "Email Atau Password Salah !";
          res.render("login", { err: error });
        }
      }
    );
  } else {
    error = "Form Masih Kosong !";
    res.render("login", { err: error });
  }
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/LogOrReg/register.html"));
});

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
      res.render("error", { output: output, redirect: redirect });
      break;

    default:
      break;
  }
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
  const alamat = req.body.alamat;

  mysql.query(
    `UPDATE user SET namad = ?,  namab = ?, status = 'third', alamat = ? WHERE kode = '${pHash}'`,
    [namaDepan, namaBelakang, alamat],
    (err, result) => {
      let dataFetch;

      if (err) {
        console.log("gagal update nama ");
      }

      req.session.user = `${pHash}`;
      res.redirect(`/Main/${pHash}`);
    }
  );
});

app.get("/account/:kode", (req, res) => {
  const params = req.params.kode;

  mysql.query("SELECT * FROM user WHERE kode = ?", [params], (err, result) => {
    if (result.length > 0) {
      const dataFetch = result[0];

      let aktor;
      let kki;
      let kka;
      const output = "";

      if (dataFetch.aktor == "baru") {
        aktor = "";
      } else {
        kki = "(";
        aktor = dataFetch.aktor;
        kka = ")";
      }

      res.render("account", {
        data: dataFetch,
        aktor: aktor,
        kki: kki,
        kka: kka,
        output: output,
      });
    } else {
      res.send("no data");
    }
  });
});

app.post("/account/:kode", (req, res) => {
  const kode = req.params.kode;

  const {
    password,
    newPassword,
    validationPw,
    namaDepan,
    namaBelakang,
    email,
    alamat,
  } = req.body;

  const qry = `SELECT * FROM user WHERE kode = ?`;
  let output = "";

  mysql.query(qry, [kode], (err, result) => {
    let dataFetch = result[0];

    let aktor;
    let kki;
    let kka;

    if (dataFetch.aktor == "baru") {
      aktor = "";
    } else {
      kki = "(";
      aktor = dataFetch.aktor;
      kka = ")";
    }

    const qryu = `UPDATE user SET namad = ? , namab = ? , email = ? , alamat = ? , password = ? WHERE kode = ?`;

    if (namaDepan && namaBelakang && email && alamat && kode) {
      if (password == dataFetch.password) {
        if (newPassword == validationPw) {
          mysql.query(
            qryu,
            [namaDepan, namaBelakang, email, alamat, newPassword, kode],
            (err, result) => {
              if (err) {
                return console.log("ERR update user info", err);
              }

              output = "Akun Berhasil Di Update !";
              res.render("account", {
                data: dataFetch,
                aktor: aktor,
                kki: kki,
                kka: kka,
                output: output,
              });
            }
          );
        } else {
          output = "Konfirmasi Password Tidak Sama !";
          res.render("account", {
            data: dataFetch,
            aktor: aktor,
            kki: kki,
            kka: kka,
            output: output,
          });
        }
      } else {
        output = "Password Anda Salah !";
        res.render("account", {
          data: dataFetch,
          aktor: aktor,
          kki: kki,
          kka: kka,
          output: output,
        });
      }
    }
  });
});

app.get("/about/:kode", (req, res) => {
  const params = req.params.kode;
  res.render("aboutus", { kode: params });
});

app.get("/contact/:kode", (req, res) => {
  const params = req.params.kode;
  mysql.query(`SELECT * FROM user WHERE kode = ?`, [params], (err, results) => {
    if (err) {
      return console.log("error in contact");
    }

    const data = results[0];

    res.render("contact", { kode: params, data: data });
  });
});

app.post("/contact/:id", (req, res) => {
  const params = req.params.id;
  const nama = req.body.nama;
  const email = req.body.email;
  const nohp = req.body.nohp;
  const isi = req.body.keluh;

  try {
    sendAdvice(nama, email, nohp, isi, params);

    res.redirect(`/contact/${params}`);
  } catch (error) {
    console.log("error /contact/:id", error);
  }
});

app.get("/wishlist/:kode/:kode2", (req, res) => {
  const kode = req.params.kode2;
  res.render("wishlist", { kode: kode });
});

app.get("/cart/:kode", (req, res) => {
  const params = req.params.kode;
  res.render("cart", { kode: params });
});

app.get("/proces/cart/:id", (req, res) => {
  const params = req.params.id;
  res.render("checkout", { kode: params });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Port running at ${PORT}`);
});
