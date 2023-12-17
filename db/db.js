const mysqldb = () => {
  const mysql = require("mysql2");

  const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce",
  });

  connect.connect((err) => {
    if (err) {
      console.log("Err Connect Database");
      return;
    }
    console.log("DB CONNECTED");
  });

  return connect;
};

module.exports = mysqldb();
