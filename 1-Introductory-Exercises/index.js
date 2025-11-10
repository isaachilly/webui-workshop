// Include required modules
const {HttpServer, WebSocket, WebSocketMessage, LogManager} = require('@aliceo2/web-ui');

const logger = LogManager.getLogger('Exercise1');

const jwtConfig = {
  expiration: 30,
  maxAge: 30
};

const http = new HttpServer({
  port: 8080,
}, jwtConfig);

// Server `public` folder
http.addStaticPath('public');

http.get('/helloWorld', (req, res) => {
  res.status(200).json({message: 'Hello, World!'})
}, { public: true}); 

http.get('/testJWT', (req, res) => {
  logger.debugMessage('Received token:' + req.query.token);
  res.status(200).json({message: 'JWT is valid!'});
});

http.get('/addDefaultUser', (req, res) => {
  http.addDefaultUserData(req, res); // adds /api/userData endpoint
}, { public: true});

// curl cmd to test it
// curl localhost:8080/api/addDefaultUser
// JWT=
// curl -G "localhost:8080/api/testJWT" --data-urlencode "token=$JWT";

const ws = new WebSocket(http);

ws.bind('hello', (message) => {
  logger.debugMessage('Received hello message:' + message.payload.info);
  return new WebSocketMessage('200').setCommand('hello-back').setPayload({info: 'Hello from WebSocket server!'});
});