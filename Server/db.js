const mysql = require("mysql2/promise");
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "5#xiRYWaA2{Xeeuy+Q8www}2",
  database: "user_db",
});

module.exports = mysqlPool;
