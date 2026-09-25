// upload middleware
const multer = require("multer");
const cloudinary = require("../Config/cloudinary");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error("Only JPEG and PNG images are allowed."));
        }

        cb(null, true);
    }
});

const uploadToCloudinary = (buffer, filename) => {
    return new Promise((resolve, reject) => {
        const publicId = filename ? filename.replace(/\.[^/.]+$/, "") : `product-${Date.now()}`;

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "bokusupermarket",
                public_id: publicId,
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        stream.end(buffer);
    });
};

module.exports = { upload, uploadToCloudinary };