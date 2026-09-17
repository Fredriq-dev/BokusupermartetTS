const Product = require("../Models/products");

// create a new product
// const createProduct = async (req, res) => {
//     try {
//         const product = new Product(req.body);
//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         res.status(400).json({message:error.message});
//     };
// };

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
        res.status(201).json({message: "Product created successfully", product});
    } catch (error) {
        res.status(400).json({message: 'Error creating product', error: error.message});
    }
}

//create a product with image upload
exports.createProductWithImage = async (req, res) => {
    try {
        //check if all required fields are provided
        if (!req.body.name || !req.body.size || !req.body.description || !req.body.price || !req.body.quantity) {
            return res.status(400).json({message: "Please provide all required fields"});
        }

        upload.single('image')(req, res, async (err)=> {
            if (err) {
                return res.status(400).json({message:'Error uploading image', error: err.message})
            }
        })

        const { name, size, image, description, price, quantity, color } = req.body;
       // check if an image file is provided
        if (!req.file) {
            return res.status(400).json({message: "Please upload an image"});
        }
        const product = new product({
            name,
            size,
            description,
            price,
            quantity,
            color,
            image: req.file.path//save the image path to the database
        })
        await product.save();
        res.status(201).json({message: "Product created successfully", product});
    } catch (error) {
        res.status(400).json({message: "Error creating product", error: error.message});
    }
}

// update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // where id is the product to be updated
        const { name, size, description, price, quantity, color } = req.body;
        
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


