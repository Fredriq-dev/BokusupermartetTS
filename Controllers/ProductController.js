const Product = require("../Models/products");
const { uploadToCloudinary } = require("../Middleware/upload");
const sendEmail = require("../Middleware/emailsender");

// another way to create a product and export at the same time
exports.createProduct = async (req, res) => {
    try {
        //check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
            return res.status(400).json({message: "All fields are required"});
        }

        const { name, size, description, price, quantity } = req.body;
        const product = new Product({name, size, description, price, quantity});

        await product.save();

        //send email notification to the superadmin about the new product creation
        const subject = "New Product Created";
        const text = `A new product has been created: \n\nName: ${name}\nSize: ${size}\nDescription: ${description}\nPrice: ${price}\nQuantity: ${quantity}`;
        // await sendEmail(process.env.EMAIL_USER, subject, text);
        await sendEmail('jasonhummel121@gmail.com', subject, text);

        res.status(201).json({message: "Product created successfully", product});
    } catch (error) {
        res.status(400).json({message: 'Error creating product', error: error.message});
    }
}

// create a product with image upload
exports.createProductWithImage = async (req, res) => {
    try {
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const { name, size, description, price, quantity, color, isAvailable } = req.body;

        const cloudinaryResult = await uploadToCloudinary(req.file.buffer, req.file.originalname);

        const product = new Product({
            name,
            size,
            description,
            price,
            quantity,
            isAvailable: isAvailable ?? true,
            color,
            image: cloudinaryResult.secure_url
        });

        await product.save();
        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error("createProductWithImage error:", error);
        return res.status(400).json({ message: "Error creating product", error: error.message });
    }
};

// update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // where id is the product to be updated
        const { name, size, description, price, quantity, isAvailable, color } = req.body;
        console.log(req.body);

        const product = await Product.findByIdAndUpdate(id, {name, size, description, price, quantity}, {new: true});
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product updated successfully", product});
    } catch (error) {
        res.status(400).json({message: 'Error updating product', error: error.message});
    }
};

// get a product by id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params; // where id is the product to be retrieved
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product retrieved successfully", product});
    } catch (error) {
        res.status(500).json({message: "Error getting product", error: error.message});
    }
};

// get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({message: "Products retrieved successfully", products});
    } catch (error) {
        res.status(500).json({message: "Error getting products", error: error.message});
    }
};