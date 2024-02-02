// mysql connection location
const mysql = require("mysql2");
const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the Employee_Tracker database.`)
  );
  module.exports = db;