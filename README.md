# Node.js-MySQL 
________________________________________________________________________________________________
# OVERVIEW
Amazon-like storefront ustlizing MySQL . The app takes in orders from customers and depletes stock from the store's inventory. Additionally, the app tracks product sales across the store's departments and then provides a summary of the highest-grossing departments in the store.

**USAGE**
**********************************************

The app will prompt users with two messages.



The first asks them the ID of the product they would like to buy.
The second message asks how many units of the product they would like to buy.



Once the customer has placed the order, the application checks if your store has enough of the product to meet the customer's request.



If not, the app logs a phrase like Insufficient quantity!, and then prevent the order from going through.



However, if your store does have enough of the product,  it will fulfill the customer's order.


This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, the customer will be shown the total cost of their purchase.

**EXAMPLE**

![gif_example](images/walkthrough.gif)