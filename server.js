const express = require("express");
const inquirer = require("inquirer");
const mysql = require('mysql');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "new_password",
    database: "emp_db"
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log('connected');
  });


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });