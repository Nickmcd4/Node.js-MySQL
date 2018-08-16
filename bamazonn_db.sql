CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Balexa", "Electronics", 200, 150),
	("Bose Speakers", "Electronics", 150, 50),
    ("Headphones", "Electronics", 70.50, 200),
    ("Floral Shoppe", "Music", 10.99, 500),
    ("Good News for People Who Love Bad News", "Music", 6.99, 20),
    ("Gucci Flip Flops", "Clothing", 650, 2),
    ("Clout Goggles", "Clothing", 5.99, 50),
    ("Forbidden Bagel", "Food", 500, 3),
    ("Cheetos", "Food", 2.75, 700),
    ("Dog Chow", "Food", 12, 45);