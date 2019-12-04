process.env.NODE_ENV = 'dev';
const express = require('express');
const app = module.exports = express();
const routes = require('./route');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 9191;



process.on('uncaughtException', (e) => {
    throw new Error('uncaught Exception: ' + e.stack);
});
if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is required');
}

// Initialize body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);

// Initialize routes
app.use(routes());


// Lisent to port
const server = app.listen(port, () => {
    console.log('Service is Running on Port:' + port);
});

server.timeout = 300000;
