// Call the controller
const express = require("express");
const router = express.Router(); // create a router instance

//import the product controller
const productController = require("../Controllers/ProductController");

// define the routes for the product
router.post("/createproduct", productController.createProduct); // create a new product
router.put("/updateproduct/:id", productController.updateProduct); // update a product

//export the router to use it in other files
module.exports = router;



