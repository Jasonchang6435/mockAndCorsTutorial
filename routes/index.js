const express = require('express')

const router = express()

router.get('/',(request,response) => {
    response.sendFile('HTML/index.html')
})

module.exports = router
