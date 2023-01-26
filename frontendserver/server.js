const exp = require('express');
const path = require('path');
const server = exp();
const port = 9000;
const ip = '192.168.1.25'

server.use(exp.static(path.join(__dirname, 'build')));
server.use('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

server.listen(port, ip);