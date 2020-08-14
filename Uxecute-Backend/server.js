const http = require('http');
const app = require('./app');
const noSleep = require('./noSleep');

const port = process.env.PORT || 3000;

// Include the Deployed Backend Url here
const APP_URL = ""

const server = http.createServer(app);

server.listen(port, () =>{ noSleep(APP_URL) });