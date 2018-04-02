/*
CORS原理及解决方案
    现代浏览器 跨域时
    1. 浏览器自行先发送 options 请求（预检请求）确认是否可跨域
        主要是请求的方法 域名 验证信息 请求头
    2. 返回成功的相应 才会发送真实的代码的 ajax请求

    解决方案：
    1. server配置HTTP头：
        'Access-Control-Allow-Origin': '*';
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        'Access-Control-Allow-Credentials': true
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    2. 反向代理
    3. 应用服务同源转发 如 server.js
    2，3原理相似 即前端发送请求到同源的后台，后台包装转发请求


mockServer 方案
    node express 提供mock接口和数据 可以用随意替换为同样功能的软件提供接口，如soapui
    nginx 提供转发请求和提供ui项目的server环境
    好处是
        这样你构建的好的前后端分离的项目可以在任意的目录调试
        也可以是你的git仓库目录 修改调试完可以直接push到远端仓库
        
nginx这里只提供nginx.conf文件 根据以下参考链接安装和自行配置
       https://www.cnblogs.com/saysmy/p/6609796.html


项目的使用：（这里是以windows为例）
    express routes 
        含mock名的为自行添加接口的文件 支持文件上传接口 
    nginx 
        windows环境下直接解压 linux/mac需要自行安装 
        自定义conf/nginx.conf内的端口和ui文件夹绝对路径 
        配置说明在nginx.conf带注释
        
    启动：
        cd nginx根目录   start nginx
        express node app.js
        比如 express 配置端口是7000
        nginx 默认端口9000 转发端口7000
        前端项目是文件夹是/static（这里前端的ui不是express发送的 而是由nginx返回的）
        浏览器访问localhost：9000可以看到ui  http请求/api/* 都会请求到express上
*/
