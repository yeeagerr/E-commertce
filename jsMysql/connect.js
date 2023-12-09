const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  pass: "",
  database: "crudtest20",
});

con.connect((err) => {
  if (err) {
    console.log("Error con connection", err);
    return;
  }

  console.log("connected bang");
});

module.exports = con;
