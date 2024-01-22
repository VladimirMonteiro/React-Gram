const multer = require('multer');
const path = require('path');

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";

        // Verifica se o caminho base da requisição inclui "/api/user" ou "/api/profile"
        if (req.baseUrl.includes("user") || req.baseUrl.includes("profile")) {
            folder = "users";
        } else if (req.baseUrl.includes("/api/photos")) {
            folder = "photos";
        }

        cb(null, path.join(__dirname, `../public/images/${folder}`));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas png ou jpg"));
        }
        cb(null, true);
    },
});

module.exports = imageUpload;
