import mysql from "mysql2";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "blog_app",
});

connection.connect((err) => {
  if (err) {
    console.log("error in mysql database", err.message);
  } else {
    console.log("connected to mysql database");
  }
});
export default connection;
