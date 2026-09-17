const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables before using them

const connectDB = require("./Config/databaseConfig");
connectDB(); // Connect to MongoDB

app.use(express.json()); // middleware to parse JSON request bodies

const productRoute = require("./Routes/ProductRoute");
const userRoute = require("./Routes/UserRoute");


app.use("/products", productRoute); // use the product route for all requests staring with /products
app.use("/users", userRoute); // use the user route for all api requests starting with /users


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

 