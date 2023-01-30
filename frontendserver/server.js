const exp = require('express');
const path = require('path');
const server = exp();
const PORT = 3002;
const ADDRESSES = {school: '192.168.1.25', local: 'localhost'};

server.use(exp.static(path.join(__dirname, 'build')));
server.use('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

server.listen(PORT, ADDRESSES.local, ()=>{
    console.log(`Server http://${ADDRESSES.local}:${PORT} has been started`);
});