const nunjucks = require('nunjucks')

// const session = require('cookie-session')

const cors = require('cors')

const express = require('express')

const bodyParser = require('body-parser')

const app = express()

// const sse = require('./sse')
// const mcors = require('./cors')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(cors())
// app.use(mcors)

// app.use(express.static('./static'))
app.use(express.static('./mesv2'))
// app.use(express.static('./cds/theme'))

// const asset = __dirname + '/static'
// app.use('static',express.static(asset))
// app.use(bodyParser.urlencoded({
//     extended: true
// }))
// nunjucks.configure('static', {
//     autoescape: true,
//     express: app,
//     noCache: true,
// })
// 引入路由文件
// const index = require('./routes/index')
const mock = require('./routes/mock')
const v2 = require('./routes/v2mock')
//const v1 = require('./routes/v1mock')
// const sse = require('./sse')
app.use('/api', mock)
app.use('/api', v2)
//app.use('/api', v1)
// app.use('/mes/rest', mock)
// app.use(sse)

const log = console.log.bind(console)

// const corsOptions = {
//     origin: true,
    //  origin: 'http://bpm-web.sh-dev.eainc.com:8080',
//     optionsSuccessStatus: 200,
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     // preflightContinue: true,
// }

app.get('/',(request,response) => {
    response.sendFile(__dirname + '/static/a.html')
})

// const client = require('./routes/server')
// app.use('/', client)
//
app.use((request,response) => {
    const r = response.status(404)
    let rt = {
        message: `404 Error Not Found`
    }
    r.send(rt)
})

app.use((error,request,response,next) => {
    console.error(error.stack)
    const r = response.status(500)
    let rt = {
        message: `500 Error`
    }
    r.send(rt)
})

const run = (port='8000',host='') => {
    const server = app.listen(port,host,() => {
        const address = server.address()
        host = address.address
        port = address.port
        log(`listening server at http://${host}:${port}`)
    })
}

if (require.main === module) {
    const port = 7003
    const host = 'localhost'
    run(port,host)
}
