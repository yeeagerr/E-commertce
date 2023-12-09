const dbcon = require("./connect.js");

dbcon.query("SELECT * FROM mahasiswa", (err, results) => {
  if (err) {
    console.log("error view result", err);
    return;
  }
  console.log(results);
});

dbcon.end((err) => {
  if (err) {
    console.log(err, "error bang");
    return;
  }
  console.log("succes");
});
