module.exports = (app)=> {

    const order = require("../controllers/order.controller.js");

    //Create order route
    app.post("/orders", order.create);

    //Select all orders route
    app.get("/orders", order.findAll);

    //select just one item
    app.get("/orders/:orderId", order.findOne);

    //Update an order
    app.put("/orders/:orderId", order.update);

    //Delete an Order
    app.delete("/orders/:orderId", order.delete);

};