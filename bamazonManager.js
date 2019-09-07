let connect = require ('./mysql');
let inquirer = require('inquirer');
let prompt = inquirer.createPromptModule();

let Table = require('cli-table');

function listActions(){
    prompt ({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
        'View Products for Sale', 
        'View Low Inventoy',
        'Add to Inventory', 
        'Add New Product']
        
    }).then(function(answer) {
        switch(answer.action){
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

function viewProducts(){
    connect.connection.query('SELECT * FROM products', function(err, data){

        if (err) throw err;

        console.log('"\n                      Items availavle for sale.\n             " + "\n           ------------------------------------------\n"');

            let data_length = data.length;
            for(let i = 0; i < data_length; i++){

                console.log('ID- ' + data[i].item_id + '  || PRODUCT- ' + data[i].product_name + '   || DEPT - ' + data[i].department_name + '   || PRICE - ' + data[i].price + '    || QTY - ' + data[i].stock_quantity + '\n');


            }

            listActions();
    });
}