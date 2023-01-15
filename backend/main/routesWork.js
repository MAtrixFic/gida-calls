const exp = require('express')
const mongoose = require('mongoose');
const Calls = require('./dataWork');
const schema = mongoose.Schema;
const router = exp.Router()

const schemas = {
    static: new schema({
        name: String,
        time: {
            first: Array,
            second: Array
        }
    }),
    dynamic: new schema({
        date: String,
        time: {
            first: Array,
            second: Array
        }
    })
}

const CallsOBJ = {
    static: new Calls('mongodb://localhost:27017/Calls', schemas.static, 'static', Calls.collectionsName.static),
    dynamic: new Calls('mongodb://localhost:27017/Calls', schemas.dynamic, 'dynamic', Calls.collectionsName.dynamic)
}


async function GetData(calls = Calls, whatToFind = {}) {
    const result = await calls.ConnectToFind(whatToFind);
    return await result;
}
async function SetData(calls = Calls, filter = {}, whatToRemake = {}) {
    await calls.ConnectToWrite(filter, whatToRemake);
}

router.get('/static', (req, res, next) => {
    console.log(req.query)
    GetData(CallsOBJ.static, { name: req.query.weekDay }).then(data => res.send(data));
});

router.get('/dynamic', (req, res) => {
    const { weekDay, day, month, year } = req.query;
    GetData(CallsOBJ.dynamic, { date: `${day}.${month}.${year}` }).then(dataD => {
        if (dataD === null) {
            console.log('static');
            GetData(CallsOBJ.static, { name: weekDay }).then(dataS => res.send(dataS));
        }
        else {
            console.log('dynamic');
            res.send(dataD)
        }
    });
});

router.put('/dynamic', (req, res) => {
    const { date, first, second } = req.body;
    SetData(CallsOBJ.dynamic, { date: date }, {
        date: date,
        time: {
            first: [...first.split(',')],
            second: [...second.split(',')]
        }
    })
    res.sendStatus(200);
})


module.exports = router;