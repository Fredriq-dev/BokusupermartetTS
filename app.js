const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./Config/databaseConfig");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

app.use(express.json()); // middleware to parse JSON request bodies

const productRoute = require("./Routes/ProductRoute");
const userRoute = require("./Routes/UserRoute");


app.use("/products", productRoute); // use the product route for all requests staring with /products
app.use("/users", userRoute); // use the user route for all api requests starting with /users


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

 