// Call the controller
const express = require("express");
const router = express.Router(); // create a router instance

// import authentication middleware
const { protect } = require('../Middleware/auth');

// import authorization middleware
const { authorize } = require('../Middleware/role');

//import the product controller
const productController = require("../Controllers/ProductController");

// define the routes for the product
router.post("/createproduct", protect, authorize('supperadmin'), productController.createProduct); // create a new product
router.post("/createproductwithimage", protect, productController.createProductWithImage); // create a new product with image

router.put("/updateproduct/:id", protect, productController.updateProduct); // update a product
router.get("/getproductbyid/:id", protect, productController.getProduct); // get a product by id
router.get("/getallproducts", protect, productController.getAllProducts);


//export the router to use it in other files
module.exports = router;



