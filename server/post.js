const { api, pool } = require('./app.js')
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var multer = require('multer');
var path = require('path');
var fs = require("fs-extra");

var uploadav = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            let type = req.params.polz;
            let path = `./uploads/${type}`;
            fs.mkdirsSync(path);
            callback(null, path)
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    limits:{fileSize: 20971520}
}).single('file')

module.exports = api;