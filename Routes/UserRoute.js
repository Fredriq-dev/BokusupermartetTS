const express = require("express");
const router = express.Router(); // create a router instance

const userController = require("../Controllers/UserController");

// define the routes
router.post("/createuser", userController.createUser); // create a new user
router.post("/loginuser", userController.loginUser); // login a user

//export the router to use it in other files
module.exports = router;





