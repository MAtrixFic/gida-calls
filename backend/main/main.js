const express = require('express');
const server = express();
const port = 3001;
var cors = require('cors');
var bp = require('body-parser')
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const callSchema = new schema(
    {
        name: String,
        time: {
            first: Array,
            second: Array
        }
    }
);
var call = mongoose.model('Days', callSchema, 'staticDays');

const urlencode = express.urlencoded({ extended: true });
server.use(cors({
    origin: 'http://localhost:3000',
}));
server.use(bp.json());
server.use(urlencode);

server.get('/calls', (req, res) => {
    mongoose.set('strictQuery', false);
    async function main() {
        await mongoose.connect('mongodb://localhost:27017/Calls')
        console.log('connected')
        console.log(req.query);
        const result = await call.findOne({ name: 'Понедельник' })
        console.log(result);
        res.send(JSON.stringify(result));
    }
    main();
})

server.listen(port, () => {
    console.log("server has been started");
})