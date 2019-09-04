//require the mysql and the inquirer modules
//create the mysql conncetion

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cartmanguy!1",
  database: "bamazon_db"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to the database as ID " + connection.threadId);
    start();
  });

function start(){
    connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
        if(err) throw err;
        var products = res
        connection.end();
    });

};


