const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There is a new sale!');
});

myEmitter.on('newSale', () => {
  console.log('Customer name: Pranav');
});

myEmitter.on('newOrder', (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit('newSale');

myEmitter.emit('newOrder', 9);

/////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  res.end('Request Received!!');
  console.log('Request Received');
});

server.on('request', (req, res) => {
  console.log('Another Request 😂');
});

server.on('close', (req, res) => {
  console.log('Server closed');
});

server.listen(8000, '127.0.0.1', (req, res) => {
  console.log('Waiting for Requests..........');
});
