let mysql = require('mysql');

let connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Cartmanguy!1',
	database: 'bamazon_db'
});

//export the connection for reuse
exports.connection = connection;