const express = require('express')
const router = express()
const { log } = require('../utils')
const http = require('http')
const https = require('https')
const url = require('url')

const clientByProtocol = (protocol) => {
    if (protocol === 'http:') {
        return http
    } else {
        return https
    }
}

const apiOptions = () => {
    const envServer = process.env.apiServer
    const defaultServer = 'http://127.0.0.1:9999'
    const server = defaultServer
    const result = url.parse(server)
    const obj = {
        headers: {
            'Content-Type': 'application/json',
        },
        rejectUnauthorized: false,
    }
    const options = Object.assign({}, obj, result)

    if (options.href.length > 0) {
        delete options.href
    }
    return options
}

const httpOptions = (request) => {
    const baseOptions = apiOptions()
    const pathOptions = {
        path: request.originalUrl,
    }
    const options = Object.assign({}, baseOptions, pathOptions)
    Object.keys(request.headers).forEach((k) => {
        options.headers[k] = request.headers[k]
    })
    options.method = request.method
    return options
}
router.all('/*', (request, response) => {
    const options = httpOptions(request)
    log('request options', options)
    const client = clientByProtocol(options.protocol)
    const r = client.request(options, (res) => {
        response.status(res.statusCode)
        log('debug res', res.headers, res.statusCode)
        Object.keys(res.headers).forEach((k) => {
            const v = res.headers[k]
            response.setHeader(k, v)
        })
        res.on('data', (data) => {
            log('debug data', data.toString('utf8'))
            response.write(data)
        })

        res.on('end', () => {
            log('debug end')
            response.end()
        })

        res.on('error', (error) => {
            console.error(`error to request: ${request.url}`)
        })

    })

    r.on('error', (error) => {
        response.status(500).send(error)
        console.error(`请求 api server 遇到问题: ${request.originalUrl}/${request.url}`, error)
    })

    log('debug options method', options.method)
    if (options.method !== 'GET') {
        log('debug body',body, typeof body)
        const body = JSON.stringify(request.body)
        r.write(body)
    }
    r.end()
})


module.exports = router
