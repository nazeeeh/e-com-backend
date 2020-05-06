const sql = require("./database.js");

//Constructor
const Order = function(order){
    this.customer_id = order.customer_id;
    this.product_id = order.product_id;
    this.order_status = order.order_status;
    this.order_date = order.order_date;
    this.shipped_date = order.shipped_date;
};

//CREATE AN ORDER
Order.create = (newOrder, result)=> {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) =>{
    if(err){
        console.log("Error: ", err);
        result(err, null);
        return;
    }
    console.log("Order taken: ", {id: res.name, ...newOrder});
    result(null, {id: res.name, ...newOrder});
    
    });
};

//Select all products
Order.getAll = (result) => {
    sql.query("SELECT * FROM orders", (err, res) => {
        if (err) {
            console.log("error:  ", err);
            result(err, null);
            return;
          }
          console.log("orders: ", res);
          result(null, res);
    });
};

//Select a product
Order.findById = (orderId, results) => {
    sql.query(`SELECT * FROM orders WHERE order_id = ${orderId}`, (err, res) => {
      if (err) {
        console.log("error:  ", err);
        results(err, null);
        return;
      }
      if (res.length) {
        console.log("Found Product: ", res[0]);
        results(null, res[0]);
      }
      results({ kind: "not_found" }, null);
    });
  };

   //Edit an order
   Order.updateById = (orderId, order, result) => {
    sql.query(`UPDATE products SET customer_id=?, product_id=?, order_id =? `,
      [order.customer_id, order.product_id],(err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated order: ");
        result(null, {order_id: orderId, ...order });
      }
    );
  };

   //Delete an item
   Order.remove = (orderId, result) => {
    sql.query(`DELETE FROM orders WHERE order_id = ${orderId}`, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Order Deleted: ");
        result(null, res);
      });
  };

module.exports = Order;