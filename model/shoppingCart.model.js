const sql = require("./database.js");

const Cart = function (carts){
    this.customer_id = carts.customer_id;
    this.product_id = carts.product_id;
    this.number_of_quantity = carts.number_of_quantity; 
};

//Insert into cart
Cart.create = (newCart, results) =>{
    sql.query("INSERT INTO carts SET ?", newCart, (err, res) =>{
        if(err){
            console.log("error: ", err);
            results(err, null);
            return;
        }
        console.log("Added to cart", {cart_id: res.cart_id, ...newCart});
        results(null, {cart_id: res.cart_id, ...newCart});
    });
};

//View carts
Cart.viewAll = (results) =>{
    sql.query("SELECT * FROM carts" , (err, res) =>{
        if(err){
            console.log("error: ", err);
            results(err, null);
            return;
        }
        console.log("carts ", res);
        results(null, res)
    });
};

//view a cart
Cart.viewOne = (cartId, results) =>{
    sql.query(`SELECT * FROM carts WHERE cart_id = ${cartId}`, (err, res)=> {
        if(err){
            console("error: ", err);
            results(err, null);
            return;
        }
        if(res.length){
            console.log("Cart found: ", res[0]);
            results(null, res[0]);
            
        }
        results({kind: "Not found"}, null);
    });
};

//Update cart
Cart.updateById = (cartId, cart, results) => {
    sql.query(`UPDATE carts SET product_id= ?, customer_id= ?, number_of_quantity= ? `,
      [ cart.product_id,cart.customer_id, cart.number_of_quantity, cartId], (err, res) => {
        if (err) {
          console.log("error: ", err);
          results(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          results({ kind: "not_found" }, null);
          return;
        }
        console.log("cart was updated: ");
        results(null, {cart_id: cartId, ...cart });
      }
    );
  };

  //delete a cart 
  Cart.remove = (cartId, results) => {
    sql.query(`DELETE FROM carts WHERE cart_id = ${cartId}`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            results(err, null);
            return;
        }
        if(res.affectedRows == 0){
            results({kind : "not found"}, null);
            return;
        }
        console.log("cart deleted:", res);
        results(null, res);
    });
  };
module.exports = Cart;

