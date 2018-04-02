 const express = require('express')
const { log } = require('../utils')
const router = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer({
    dest: 'uploads/',
})
// req.query.produceId
// req.body
// req.params.id


const fs = require('fs')

// 注：接口和 mock的数据，如发送 DELETE /api/devices/1
// 就会返回 200 内容空字符串
router.delete('/devices/:id',(req,res) => {
    log("get /devices/:id", req.params.id)
    res.send('')
})

router.get('/deviceParamFields',(req,res) => {
    log("get deviceParamFields", req.query.type)
    let a = [
                {
                    "deviceType": "manualThermoformming",
                    "paramField": "string",
                    "isNecessary": 0
                }
            ]
    res.send(a)
})

router.post('/manualOperationRecords',(req,res) => {
    log("post /manualOperationRecords", req.body)
    let a = 'ok'
    res.send(a)
})

router.put('/qaRecords',(req,res) => {
    log('post /qaRecords', req.body)
    let r = res.status(204)
    r.send('ok')
})


router.post('/upload',upload.single('upfile'),(req,res) => {
    log('debug request file', req.file)
    let a = {
        filePath: 'upfile/success/location',
    }
    res.send(a)
})


module.exports = router
