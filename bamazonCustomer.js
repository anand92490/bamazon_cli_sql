
let connect = require('./mysql.js');

let inquirer = require('inquirer');
let prompt = inquirer.createPromptModule();

function displayInventory() {

    connect.connection.query('SELECT * FROM products', function (err, data) {
        if (err) throw err;

        console.log("\n                      welcome to bamazon.\n            \n           ------------------------------------------\n");

        // loop through the list of items and display the data
        let data_length = data.length;
        for (let i = 0; i < data_length; i++) {
        }

        // call the selectProduct function here after the the table of contents are displayed
        selectProduct();

    });
}

// ask user what products they wish to buy
function selectProduct() {
    prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the item ID you would like to purchase?',
        validate: function (value) {
            //ensuring the user's input is a number
            if (isNaN(value) == false) {
                return true;
            } else {
                console.log('\n\nPlease enter the product ID to make a selection.\n');
                return false;
            }
        }
    }, {
        name: 'amount',
        type: 'input',
        message: 'How many units of the product would you like to buy?',
        validate: function (value) {

            if (isNaN(value) == false) {
                return true;
            } else {
                console.log('\n\nPlease enter the number of units you wish to purchase.\n');
                return false;
            }
        }
        // pass the item_id and number of units to the purchaseProduct function to complete the transaction
    }]).then(function (answer) {

        purchaseProduct(answer);

    });
}

// check the inventory and purchase the product with the itemID and amount to purchase
function purchaseProduct(selected_item) {

    selected_item_int = parseInt(selected_item.amount);

    let query_select = 'SELECT * FROM products WHERE ?';

    connect.connection.query(query_select, { item_id: selected_item.id }, function (err_select, data_select) {

        if (err_select) throw err_select;

        // check if the amount in stock is less than the selected amount
        if (data_select[0].stock_quantity < selected_item_int) {

            console.log('\nSorry, but you selected to purchase more than we have in stock. Please look over our products and make another selection.\n');

            // start the process over 
            selectProduct();

        } else {

            let new_quantity = data_select[0].stock_quantity - selected_item_int;

            // store the total price in a variable 
            let total_price = data_select[0].price * selected_item_int;

            let query_update = 'UPDATE products p, department_name d SET p.stock_quantity = ?, d.total_sales = d.total_sales + ? WHERE p.item_id = ? AND d.department_name = ?';

            // update the Products table with the new stock_quantity for the purchased item
            connect.connection.query(query_update, [new_quantity, total_price, data_select[0].item_id, data_select[0].department_name], function (err_update, data_update) {

                if (err_update) throw err_update;

            });

            console.log('\nThank you for your purchase. Total price is $' + total_price + '\n');

            // start the process over and display the products
            displayInventory();
        }
    });
}

displayInventory();