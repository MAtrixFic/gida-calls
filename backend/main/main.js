const express = require('express');
const cors = require('cors');
const router = require('./routesWork');
const server = express();


const port = 3001;
const urlencode = express.urlencoded({ extended: true });


server.use(cors({
    origin: 'http://localhost:3000',
}));
server.use(urlencode);
server.use('/calendar', router);


server.listen(port, () => {
    console.log("server has been started");
})