const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hi :v')
})

server.listen(3000);
console.log('Servidor en puerto 3000');