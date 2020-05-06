const sql = require("./database.js");

//Constructor
const Product = function(product){
    this.category_id = product.category_id;
    this.product_name = product.product_name;
    this.quantity = product.quantity;
    this.price = product.price;
};

//Insert new product
Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if(err){
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Product added: ", {id: res.name, ...newProduct});
        result(null, { id: res.name, ...newProduct });
    });
};

//Select all products
Product.getAll = (result) => {
    sql.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("error:  ", err);
            result(err, null);
            return;
          }
          console.log("products: ", res);
          result(null, res);
    });
};

//Select a product
Product.findById = (productId, result) => {
    sql.query(`SELECT * FROM products WHERE product_id = ${productId}`, (err, res) => {
      if (err) {
        console.log("error:  ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Found Product: ", res[0]);
        result(null, res[0]);
      }
      result({ kind: "not_found" }, null);
    });
  };

  //Edit a product
  Product.updateById = (productId, product, result) => {
    sql.query(`UPDATE products SET name=?, amount=?, available_stock=? WHERE _id =? `,
      [product.category_id, product.product_name, product.quantity, product.price, productId],(err, res) => {
        if (err) {
          console.log("error:  ", err);
          result(err, null);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Product: ");
        result(null, {product_id: productId, ...product });
      }
    );
  };

  //Delete an item
  Product.remove = (productId, result) => {
    sql.query(`DELETE FROM products WHERE product_id = ${productId}`, (err, res) => {
        if (err) {
          console.log("error:  ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Deleted Product: ");
        result(null, res);
      });
  };

module.exports = Product;