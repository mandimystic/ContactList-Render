const app = require('./app');
const http = require ('http');

const server = http.createServer(app);

server.listen (5003, () => {
   
    console.log('servidor corriendo');
})