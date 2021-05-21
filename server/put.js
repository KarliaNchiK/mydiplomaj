const { api, pool, jsonwt, secret } = require('./app.js')
var bcrypt = require('bcrypt');
var fs = require("fs-extra");
var salt = bcrypt.genSaltSync(10);


api.put("/avatar", function (req, res) {
    const ava = req.body.avatar;
    let preava = req.body.oldavatar;
    if (preava != null) {
        while (preava.indexOf("\\") != -1) {
            preava = preava.replace("\\", "/");
        }
        fs.stat('./uploads/' + preava, function (err, stats) {
            //console.log(stats);

            if (err) {
                return console.error(err);
            }

            fs.unlink('./uploads/' + preava, function (err) {
                if (err) return console.log(err);
                //console.log('file deleted successfully');
            });
        });
    }

    pool.query("UPDATE datauser SET avatar = ? WHERE idUser=?", [ava, req.cookies.idUser], function (err, data) {
        if (err) return console.log(err);
    });
    res.send("success")
});




module.exports = api;