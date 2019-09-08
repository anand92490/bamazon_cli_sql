let connect = require('./mysql');
let inquirer = require('inquirer');
let prompt = inquirer.createPromptModule();




function listActions() {
    prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View Products for Sale',
            'View Low Inventoy',
            'Add to Inventory',
            'Add New Product']


    }).then(function (answer) {
        switch (answer.action) {
            case 'View Products for Sale':
                viewProducts();
                break;

            case 'View Low Inventoy':
                viewLowInventory();
                break;

            case 'Add to Inventory':
                addToInventory();
                break;

            case 'Add New Product':
                departmentList();
                break;

            default:
                listActions();
        }

    })
}



function viewProducts() {
    connect.connection.query('SELECT * FROM products', function (err, data) {

        if (err) throw err;

        console.log('"\n                      Items availavle for sale.\n               \n           ------------------------------------------\n"');

        let data_length = data.length;
        for (let i = 0; i < data_length; i++) {

            console.log('ID- ' + data[i].item_id + '  || PRODUCT- ' + data[i].product_name + '   || DEPT - ' + data[i].department_name + '   || PRICE - ' + data[i].price + '    || QTY - ' + data[i].stock_quantity + '\n');


        }

        listActions();
    });
}



function viewLowInventory() {
    let query = 'SELECT * FROM products WHERE stock_quantity < 5';

    connect.connection.query(query, function (err, data) {
        if (err) throw err;

        console.log('\nItems with quantity less than 5:\n');

        let data_length = data.length;
        for (let i = 0; i < data_length; i++) {
            console.log('ID- ' + data[i].item_id + '  || PRODUCT- ' + data[i].product_name + '   || DEPT - ' + data[i].department_name + '   || PRICE - ' + data[i].price + '    || QTY - ' + data[i].stock_quantity + '\n');

        }
        listActions();
    });
}



function addToInventory() {
    prompt([
        {
            name: 'id',
            type: 'input',
            mesasge: 'What is the product ID you would like to Add to the Inventory?',
            validate: function (vlaue) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    console.log("\nEnter the quantity to update the inventory.\n")
                    return false;
                }
            }
        },

        {
            name: 'amount',
            type: 'input',
            message: 'How many would you like to add?',
            validate: function (value) {
                if (NaN(value) === false) {
                    return true;

                } else {
                    return false;
                }
            }

        }

    ]).then(function (answer) {
        let item_int = parseInt(answer.id);
        let amount_int = parseInt(answer.amount);

        let query = 'UPDATE products SET stock_quantity + ? WHERE item_id = ?';
        connect.connection.query(query, [amount_int, item_int], function (err, data) {

            if (err) throw err;
            console.log('\nThe Inventory has been updated\n');

            listActions();
        });
    });

}

function departmentList() {
    let department_List = [];
    let query = 'SELECT department_name From departments';
    
    connect.connection.query(query, function (err, data){
        if (err) throw err;

        let data_length = data.length;
        for(let i = 0; i < data_length; i++){
            department_List.push(data[i].department_name);

        }

        addNewProduct(department_List);

    });
}

function departmentList() {
    let department_list = [];

    let query = 'SELECT department_name FROM departments';

    connect.connection.query(query, function(err, data) {
        
        if (err) throw err;

      
        let data_length = data.length;
        for (let i = 0; i < data_length; i++) {
            department_list.push(data[i].department_name);
        } 

     
        addNewProduct(department_list);

    }); 
}


function addNewProduct(dep_list) {
    
   
    prompt([

        {
        name: 'name',
        type: 'input',
        message: 'What is the name of the new product?',
        validate: function(value) {
      
            if (value !== '') {
                return true;

            } else {

                console.log('\n\nIt doesn\'t appear as if you entered anything. Try again.\n');
                return false;
            } 
        } 
    },


    
    {
        name: 'department',
        type: 'list',
        message: 'What department should this new product be part of?',
        choices: dep_list 
    }, 

    
    
    {
        name: 'price',
        type: 'input',
        message: 'How much does this product sell for?',
        validate: function(value) {
        
            if (isNaN(value) == false) {
                return true;

            } else {

                console.log('\n\nWe need a number for the price.\n');
                return false;
            }
        }
    },

    
    
    {
        name: 'amount',
        type: 'input',
        message: 'How many new quantity do we have?',
        validate: function(value) {
           
            if (isNaN(value) == false) {
                return true;

            } else {

                console.log('\n\nWe need a number for the stock quantity.\n');
                return false;

            }
        } 
    }


]).then(function(answer) {

        let price_int = parseFloat(answer.price);
        let amount_int = parseInt(answer.amount);
        
        let query = 'INSERT INTO products SET ?';

     
        let values = {
            product_name: answer.name,
            department_name: answer.department,
            price: price_int,
            stock_quantity: amount_int
        }

        connect.connection.query(query, values, function(err, data) {

            if (err) throw err;

            console.log('\nProduct has been added\n');

        
            listActions();

        });		
    });
}

listActions();