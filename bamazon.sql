DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER(100) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id)

);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Oreo", "Foods", 2.50, 1000);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Coke", "Drinks", 1.50, 500);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Philips Hue", "Utilities", 4.50, 400);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Spring Hill", "Water", 6.99, 50);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Gillette Shave", "Mens", 23.00 , 60);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Axe Deodorant", "Mens", 2.50, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Marlboro", "Cigarrettes",13.50 , 500);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Vodoo Ranger", "Liquor", 8.50 , 90);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("Lays", "Foods", 2.50, 117);

INSERT INTO products(product_name, department_name, price, stock_quantity) 
VALUES("HP 360 Ink", "Stationary", 30.00, 50);

CREATE TABLE departments (
	department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs DECIMAL(10, 2),
    total_sales DECIMAL(10, 2),
    PRIMARY KEY(department_id)
);


INSERT INTO departments
	(department_name, over_head_costs, total_sales)
VALUES
	("Meats and Poultry", 3500.00, 0.00),
    ("International Selection", 350.00, 0.00),
    ("Diaries", 350.00, 0.00),
    ("Fruits and Vegetables", 1000.00, 0.00),
    ("Soda", 350.00, 0.00),
    ("Greeting Cards", 350.00, 0.00);