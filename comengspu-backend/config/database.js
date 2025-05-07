// const mysql = require('mysql');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'SPUAdmin',
//     port: 3306,
//     password: 'SPU#1234Admin',
//     database: 'comenspu_database',
//     connectionLimit: 10
// });

// // ใช้ pool ในการเชื่อมต่อ
// const initMYSQL = () => {
//     return pool; // ไม่ต้องเชื่อมต่อซ้ำทุกครั้ง
// };

// module.exports = initMYSQL;

const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "SPUAdmin",
  port: 3306,
  password: "SPU#1234Admin",
  database: "comengspu_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
