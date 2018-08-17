var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tomwatson123",
    database: "bamazon_db"
})

connection.connect(function (err) {

})



function greeting() {
    inquirer
        .prompt({
            name: "yesOrNo",
            type: "confirm",
            message: "Welcome to the Bamazon Store! Would you like to get started?",
            choices: ["YES", "NO"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.yesOrNo) {
                start();
            } else {
                console.log("Okay, suit yourself!")
            }
        });
}

function start() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log("\n" + "Great! Here's what we have available for purchase!" + "\n");

        for (var i = 0; i < res.length; i++) {
            console.log("PRODUCT ID: " + res[i].item_id + "\r\n" + "PRODUCT NAME: " + res[i].product_name + "\r\n" + "PRICE: " + res[i].price + "\r\n" + "ITEMS IN STOCK: " + res[i].stock_quantity + "\n");
            console.log("************")

        }
        console.log("Press ⬇ to contiue.")
    });
    shopping();
}

function shopping() {
    inquirer.prompt([{
            name: "item_id",
            type: "input",
            message: "Enter the product ID of which you would like to purchase!",
            validate: function (value) {
                var integer = Number.isInteger(parseFloat(value));
                if (integer) {
                    return true;
                } else {
                    return 'Please enter a number';
                }
            }
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to purchase?',
            validate: function (value) {
                var integer = Number.isInteger(parseFloat(value));
                if (integer) {
                    return true;
                } else {
                    return 'Please enter a number';
                }
            }
        }
    ]).then(function (input) {
            var item = input.item_id;
            var quantity = input.quantity;
            // console.log("You have selcted " + "[" + quantity + "]" + " " + item + "(s)");
            var query = 'SELECT * FROM products WHERE ?';

            connection.query(query, {
                    item_id: item
                }, function (err, res) {
                    if (err) throw err;
                    if (res.length === 0) {
                        console.log("Sorry! We couldn't find that item. Try again.");
                        shopping();
                    } else {
                        var productInfo = res[0];
                        console.log("\n" + "We have " + productInfo.stock_quantity + " in stock" + "\r\n");
                        console.log("You have requested " + quantity + " units of " + "item " + item);

                        if (quantity <= productInfo.stock_quantity) {
                            console.log("\n" + "This item is in stock!");

                            var updateQuery = 'UPDATE products SET stock_quantity = ' + (productInfo.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                            connection.query(updateQuery, function (err, res) {
                                if (err) throw err;
                                console.log("\r\n" + "Your order has been placed! Your total is  " + productInfo.price * quantity);
                                console.log("Updated stock: " + productInfo.stock_quantity);
                            })

                            inquirer
                                .prompt({
                                    name: "second_prompt",
                                    type: "rawlist",
                                    message: "Would you like to view our store again?",
                                    choices: ["Y", "N"]
                                }).then(function (answer) {
                                    if (answer.second_prompt.toUpperCase() === "Y") {
                                        start();
                                    } else {
                                        connection.end();
                                    }
                                });
                        } else {
                            console.log("Not enough in stock!");
                            start();
                        }         
                    }
                  })
                })
            }

    greeting();