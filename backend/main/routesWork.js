const exp = require('express')
const mongoose = require('mongoose');
const Calls = require('./dataWork');
const schema = mongoose.Schema;
const router = exp.Router()

const schemaCallsStatic = new schema({
    name: String,
    time: {
        first: Array,
        second: Array
    }
});

const schemaCallsDynamic = new schema({
    date: String,
    time: {
        first: Array,
        second: Array
    }
});

const staticCalls = new Calls('mongodb://localhost:27017/Calls', schemaCallsStatic, 'static', Calls.collectionsName.static);
const dynamicCalls = new Calls('mongodb://localhost:27017/Calls', schemaCallsDynamic, 'dynamic', Calls.collectionsName.dynamic);

async function GetData(calls = Calls, whatToFind) {
    const result = await calls.ConnectToFind(whatToFind);
    return await result;
}

router.get('/static', (req, res, next) => {
    console.log(req.query)
    GetData(staticCalls, { name: req.query.weekDay }).then(data => res.send(data));
});

router.get('/dynamic', (req, res) => {
    const { weekDay, day, month, year } = req.query;
    GetData(dynamicCalls, { date: `${day}.${month}.${year}` }).then(data => {
        if (data === null) {
            console.log(data);
            GetData(staticCalls, { name: weekDay }).then(data => res.send(data));
        }
        else {
            console.log(data);
            res.send(data)
        }
    });
});


module.exports = router;