const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    size: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity: {
        type:Number,
        required:true
    },
    isAvailable: {
        type:Boolean,
        default:true
    },
    image: {
        type:String,
        required:false
    },
    color: {
        type:String,
        required:false
    }
},
{timestamps:true}
)

// create model
const Product = mongoose.model("Product", productSchema);

module.exports = Product; //export the model to use it in other files 

