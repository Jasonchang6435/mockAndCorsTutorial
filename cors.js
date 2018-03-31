/**
 * Created by changyuan on 2017/7/14.
 */

// const origin = "http://bpm-web.sh-dev.eainc.com:8080"
const origin = "http://127.0.0.1:7000/"

const cors = (req,res,next) => {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method 
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
}


module.exports = cors
