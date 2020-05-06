const Order = require("../model/order.model.js");

exports.create = (req, res)=> {
    if(!req.body){
        res.status(404).send({
            message: "Empty order",
        });
    }
    const order = new Order({
        customer_id: req.body.customer_id,
        product_id: req.body.product_id,
        order_status: req.body.order_status,
        order_date: req.body.order_date,
        shipped_date: req.body.shipped_date
    });

    Order.create(order, (err, data)=> {
        if(err)
        res.status(500).send({
            message: err.message || "An error occured while adding order",
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Order.getAll((err, data) => {
        if (err)
          res.status(500)
          .send({
            message:
              err.message || "An error occurred while retrieving Orders.",
          });
        else res.send(data);
      });
};

exports.findOne = (req, res) => {
    Order.findById(req.params.orderId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
              message: `Not found order with id ${req.params.orderId}.`,
            });
        } else {
          res.status(500).send({
              message: "Error retrieving order with id " + req.params.orderId,
            });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
    }
    Product.updateById(
      req.params.orderId, new Order(req.body),(err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404)
              .send({
                message: `Not found Order with id ${req.params.orderId}.`,
              });
            return;
          } else {
            res.status(500)
              .send({
                message: "Error updating product with id " + req.params.orderId,
              });
            return;
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Order.remove(req.params.orderId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404)
            .send({
              message: `No order with id ${req.params.orderId}`});
            } else {
            res.status(500)
            .send({
              message: "Could not delete order with id " + req.params.orderId,
            });
        }
      } 
      else res.send({ message: `order was deleted successfully!`});
    });
  };