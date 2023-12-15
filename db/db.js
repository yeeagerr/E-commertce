const mysqldb = () => {
  const mysql = require("mysql2");

  const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
  });

  connect.connect((err) => {
    if (err) throw err;
    console.log("DB CONNECTED");
  });

  return connect;
};

module.exports = mysqldb();
