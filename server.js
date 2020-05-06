const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//product route
require("./routes/product.route.js")(app);

//order route
require("./routes/order.route.js")(app);

//cart routes
require("./routes/shoppingCart.route.js")(app);

const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`Server is up at port: ${port}`);
})