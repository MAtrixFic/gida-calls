const express = require('express');
const server = express();
const port = 3001;

const urlencodedParser = express.urlencoded({extended: false});

server.post('/entrance', urlencodedParser, (req, res) =>{
    console.log(req.body);
    res.send(req.body);
})

server.listen(port, () => {
    console.log("server has been started");
})