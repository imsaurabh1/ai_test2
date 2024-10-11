//This file is responsible for creating connection to the database 

require('dotenv').config();

const mysql = require("mysql2");

console.log("Connecting to MySQL at:", process.env.DB_HOST);

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "db", 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});


connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

module.exports = connection;
