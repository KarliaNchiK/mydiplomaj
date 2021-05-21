const bodyParser = require('body-parser')
const mysql = require("mysql2");
const api = require('express')()
const cors = require('cors')
const jsonwt = require('jsonwebtoken')
const secret = "b72a0f05-28b0-40a1-8199-2e713c21f2a1"
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())
var cookieParser = require('cookie-parser')
api.use(cookieParser())

api.use(cors())
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "diplom",
    password: "Warworldof2314"
});
module.exports = { api: api, pool: pool, jsonwt: jsonwt, secret: secret};