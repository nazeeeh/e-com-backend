const Cart = require("../model/shoppingCart.model.js");

exports.create = (req, res) => {
    
    const cart = new Cart({
        customer_id : req.body.customer_id,
        product_id :req.body.product_id,
        number_of_quantity : req.body.number_of_quantity
    });

    Cart.create(cart, (err, data)=> {
        if(err)
        res.status(500).send({
            message: err.message || "There was an error while adding to cart",
        });
        else res.send(data);
    });
};

exports.views = (req, res) =>{
    Cart.viewAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "An error  occured while adding to cart"
            });
        }
        else res.send(data);
    });
};

exports.selectOne = (req,res) =>{
    Cart.viewOne(req.params.cartId, (err, data) => {
        if(err){
            if(err.kind === "not found"){
                res.status(404).send({
                    message: `Not found a cart with id ${req.body.cartId}`,
                });
            }else {
                res.status(500).send({
                    message: `There was an error while retrieving the item with id ${req.body.cartId}`,
                });
            }
        }
        
        else res.send(data);
    
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
    }
    Cart.updateById(req.params.cartId, new Cart(req.body),(err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Order with id ${req.params.orderId}.`,
              });
            return;
          } else {
            res.status(500).send({
                message: "Error updating product with id " + req.params.orderId,
              });
            return;
          }
        } 
        else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Cart.remove(req.params.cartId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
              message: `No order with id ${req.params.cartId}`});
            } else {
            res.status(500).send({
              message: "Could not delete order with id " + req.params.cartId,
            });
        }
      } 
      else res.send({ message: `cart was deleted successfully!`});
    });
  };
