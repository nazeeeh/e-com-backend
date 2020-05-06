module.exports = (app) => {

    const product = require("../controllers/product.controller.js");
    
    //Insert into product
    app.post("/products", product.create);

    //Get all the products
    app.get("/products", product.findAll);

    //get an item
    app.get("/products/:productId", product.findOne);

    //update an item
    app.put("/products/:productId", product.update);

    //delete an item
    app.delete("/products/:productId", product.delete);

};