const path = require('path');
const config = require('./config.js');

const {HttpServer, LogManager, WebSocket, WebSocketMessage} = require('@aliceo2/web-ui');

const logger = LogManager.getLogger('Exercise2');

const http = new HttpServer(config.http, config.jwt, config.oAuth);
http.addStaticPath(path.join(__dirname, 'public'));

http.get('/applicationData', (req, res) => {
    logger.debugMessage('Request for application data');
    res.json({
        appName: "2-3-4 Exercises Application",
    });
});

const ws = new WebSocket(http);

ws.bind('random-number', (message) => message);

setInterval(() => {
    const randomNum = Math.floor(Math.random() * 100);
    const msg = new WebSocketMessage(200).setCommand('random-number-update')
        .setPayload({number: randomNum});
    ws.broadcast(msg);
    logger.infoMessage(`Broadcasted random number: ${randomNum}`);
}, 5000);