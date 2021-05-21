const { api, pool, jsonwt, secret } = require('./app.js')
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


api.get("/api/getCity", async function (req, res) {
    let getcity = function () {
        return new Promise((resolve, reject) => {
            pool.query("SELECT name FROM allcity LIMIT 102", function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
    await getcity().then((result) => {
        let b = []
        for(let i = 0; i < result.length; i++){
            b.push(result[i].name)
        }
        res.json(b)
    }).catch((result) => {
        return console.log(result)
    })
})

api.get("/api/addCity/:pos", async function (req, res) {
    const pos = req.params.pos
    let getcity = function () {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT name FROM allcity LIMIT ${pos}, 102`, function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
    await getcity().then((result) => {
        let b = []
        for(let i = 0; i < result.length; i++){
            b.push(result[i].name)
        }
        res.json(b)
    }).catch((result) => {
        return console.log(result)
    })
})

api.get("/api/getCity/:name", async function (req, res) {
    const name = "%" + req.params.name + "%"
    let getcity = function () {
        return new Promise((resolve, reject) => {
            pool.query("SELECT name FROM allcity WHERE name LIKE ? LIMIT 102 ", [name], function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
    await getcity().then((result) => {
        let b = []
        for(let i = 0; i < result.length; i++){
            b.push(result[i].name)
        }
        res.json(b)
    }).catch((result) => {
        return console.log(result)
    })
})

api.get("/api/getbranch", async function (req, res) {
    let getbranch = function () {
        return new Promise((resolve, reject) => {
            pool.query("SELECT name FROM branch", function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
    await getbranch().then((result) => {
        let b = []
        for(let i = 0; i < result.length; i++){
            b.push(result[i].name)
        }
        res.json(b)
    }).catch((result) => {
        return console.log(result)
    })
})

//api.get("/download/:e6", function (req, res) {
//    var e6 = req.params.e6
//    var pat = './static/file/txt' + e6 + '.txt';
//    res.download(pat)
//})

module.exports = api;