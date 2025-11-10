const path = require('path');
const config = require('./config.js');

const {HttpServer, LogManager} = require('@aliceo2/web-ui');

const logger = LogManager.getLogger('Exercise2');

const http = new HttpServer(config.http, config.jwt, config.oAuth);
http.addStaticPath(path.join(__dirname, 'public'));

http.get('/applicationData', (req, res) => {
    logger.debugMessage('Request for application data');
    res.json({
        appName: "2-3-4 Exercises Application",
    });
});

