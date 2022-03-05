const mysql = require("mysql2");
// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB,
  insecureAuth: true,
});

// open the MySQL connection
const connectDB = async () => {
  try {
    const con = await connection.connect();
    console.log("Connected to database");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { connectDB, connection };
