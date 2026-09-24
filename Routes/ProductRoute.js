// import the express module
const express = require("express");
const router = express.Router(); // create a router instance to be able to navigate to different parts of the controller

// import authentication middleware
const { protect } = require('../Middleware/auth');

// import authorization middleware
const { authorize } = require('../Middleware/role');

//import the product controller
const productController = require("../Controllers/ProductController");

// define the routes for the product
router.post("/createproduct", protect, authorize('superadmin'), productController.createProduct); // create a new product
router.post("/createproductwithimage", protect, authorize('superadmin'), productController.createProductWithImage); // create a new product with image

router.put("/updateproduct/:id", protect, authorize('storekeeper'), productController.updateProduct); // update a product
router.get("/getproductbyid/:id", protect, productController.getProductById); // get a product by id
router.get("/getallproducts", protect, productController.getAllProducts);


//export the router to use it in other files
module.exports = router;

