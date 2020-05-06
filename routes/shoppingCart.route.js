module.exports = (app) => {
    const cart = require("../controllers/shoppingCart.controller");

    //Add to cart
    app.post("/carts", cart.create);

    //View all carts
    app.get("/carts", cart.views);

    //view just a cart
    app.get("/carts/:cartId", cart.selectOne);

    //Update a cart
    app.put("/carts/:cartId", cart.update);

    //delete a cart
    app.delete("/carts/:cartId", cart.delete);

};