const mysql = require("mysql");
const dbConfig = require("../dbConfig/db.config");

const myDbConnection = mysql.createConnection({
    host : dbConfig.HOST,
    password : dbConfig.PASSWORD,
    user : dbConfig.USER,
    database : dbConfig.DATABASE

});

myDbConnection.connect((error) =>{
    if(error) throw error;
   console.log("Database connected... ");
});

module.exports = myDbConnection;