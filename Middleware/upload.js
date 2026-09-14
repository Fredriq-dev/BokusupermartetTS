// upload middleware
const multer = require("multer");
const {cloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:"Bokusupermarket",
        allowedFormats:['jpg', 'jpeg', 'png'],
        transformation:[{width:500, height:500, crop:"limit"}]
    }
})

const upload = multer({storage: storage});

module.exports = upload;

