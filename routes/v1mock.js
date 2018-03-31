const express = require('express')
const { log } = require('../utils')
const router = express()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(bodyParser.json())
// router.all('/', function (req, res, next) {
//     console.log('fooing the secret section ...');
//     const n = next();
//     pass control to the next handler
// })

module.exports = router
