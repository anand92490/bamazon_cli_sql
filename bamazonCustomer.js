//require the mysql and the inquirer modules
//create the mysql conncetion
//Display the product data for the customer
//prompt the user with the option select the product by ID
//prompt the user to select the number of units they'd like to purchase
//check if there is sufficient product to meet the customer's request
//if not log 'insufficient quantity' and prevent the order form going through
//if the stock is available process the transaction
//deduct the quanitiy - User's unit input
//display the total cost of the customer's purchase


const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Cartmanguy!1",
  database: "bamazon_db"
});
  
connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start(){
    connection.query("SELECT * FROM products", function(err, response){
        if(err) throw err;
        console.log("welcome to bamazon.\n");

        for (let i = 0; i < response.length; i++){
            console.log('ID- ' + response[i].item_id + '| PRODUCT- ' + response[i].product_name + '| DEPARTMENT - ' + response[i].department_name + '| PRICE - ' + response[i].price + '| QUANTITY - ' + response[i].stock_quantity + '\n');

        }

         productSelection();

    });

}


function  productSelection(){
inquirer.prompt([
    {
     name: "id",
     type: "input",
     message: "What is the item ID you would like to purchase?", 
     validate: function(value){
         if (isNaN(value) === false){
             return true;

         }else{
             console.log("Please enter the product ID to make a selection. \n");
             return false;
         }
     }
    },

    {
        name: 'amount',
        type: 'input',
        message: "How many units of the product would you like to buy?",
        validate: function(value){
            if(isNaN(value) === false){
                return true;
            }else{
                console.log("Please enter the number of units you wish to purchase.\n");
                return false;

            }
        }


    }

])
}

