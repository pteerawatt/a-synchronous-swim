
const messages = require('./js/messageQueue');
const keypressHandler = require('./js/keypressHandler');
const httpHandler = require('./js/httpHandler');

keypressHandler.initialize((message) => {
  console.log('MESSAGE: ' + message);
  messages.enqueue(message);
});


httpHandler.initialize(messages);

const http = require('http');
const server = http.createServer(httpHandler.router);

//server.initialize(messages);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
