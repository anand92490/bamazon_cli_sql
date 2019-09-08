
let connect = require('./mysql.js');
let inquirer = require('inquirer');
let prompt = inquirer.createPromptModule();
let Table = require('cli-table');


function listActions() {

    prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?\n',
        choices: ['View Product Sales by Department', 'Create New Department']

    }).then(function (answer) {

        switch (answer.action) {

            case 'View Product Sales by Department':
                viewSalesByDepartment();
                break;


            case 'Create New Department':
                createNewDepartment();
                break;


            default:
                listActions();

        }
    });
}



function viewSalesByDepartment() {

    let query = 'SELECT * from departments';
    // pull up the sales data for department table
    connect.connection.query(query, function (err, data) {

        if (err) throw err;

        // create empty arrays to populate the cli-table npm
        let head_array = [];
        let table_data = [];

        // loop through the first object in the data array
        for (let key in data[0]) {
            head_array.push(key);
        }

        head_array.push('total_profit');

        // create a new instance of cli-table
        let table = new Table({
            head: head_array
        });


        let data_length = data.length;
        for (let i = 0; i < data_length; i++) {

            // loop through each object in the data array returned from the connection
            for (let key in data[i]) {
                // push each value from each object into the table data array
                table_data.push(data[i][key]);
            }

            //Set a letiable to store the profit from the tables data of totalsales - overhead cost
            let total_profit = data[i].total_sales - data[i].over_head_costs;

            // push that profit amount into the table data array to populate that last column.
            table_data.push(total_profit.toFixed(2));

            // push all the data into the cli-table
            table.push(table_data);

            // reset the table data to an empty string so we can add data to a the new array each time we loop through a new object
            table_data = [];

        }

        // display the department into the cli-table
        console.log(table.toString());

        listActions();
    });
}




function createNewDepartment() {
    //prompt the user what department would they like to add

    prompt([

        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the new department?',
            validate: function (value) {

                if (value !== '') {
                    return true;

                } else {
                    console.log('\n\nPlease enter a valid input.\n');
                    return false;
                }
            }
        },

        {
            name: 'overhead_costs',
            type: 'input',
            message: 'What are the overhead costs associated with this department?',
            validate: function (value) {

                if (isNaN(value) == false) {
                    return true;

                } else {

                    console.log('\n\nPlease enter a valid input.\n');
                    return false;

                }
            }
        },

        {
            name: 'total_sales',
            type: 'input',
            message: 'What are the total sales for the department?',
            validate: function (value) {

                if (isNaN(value) == false) {
                    return true;
                } else {

                    console.log('\n\nPlease enter a valid input.\n');
                    return false;

                }
            }
            // pass the name, overhead costs and total sales
        }

    ]).then(function (answer) {

        let overhead_costs_int = parseFloat(answer.overhead_costs);
        let total_sales_int = parseFloat(answer.total_sales);

        let query = 'INSERT INTO departments SET ?';

        let values = {
            department_name: answer.name,
            over_head_costs: overhead_costs_int,
            total_sales: total_sales_int
        }

        connect.connection.query(query, values, function (err, data) {

            if (err) throw err;

            console.log('\nDepartment has been created\n');

            listActions();

        });
    });
}

listActions();