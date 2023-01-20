const entRouter = require('express').Router();
const mongoose = require('mongoose');
const Calls = require('../dataWork')
const schema = mongoose.Schema;

const SchemaList = [
    new schema({
        nick: String,
        password: String,
        status: String
    })
]

async function GetData(calls = Calls, whatToFind = {}) {
    const result = await calls.ConnectToFind(whatToFind);
    return await result;
}

entRouter.post('/send', (req, res) =>{
    GetData(new Calls('mongodb://localhost:27017/Calls',
    SchemaList[0],
    'people',
    Calls.collectionsName.people),
    { nick: req.body.nick, password: req.body.password} )
    .then(data =>{
        if(data === null){
            console.log(data);
            res.send({
                error: 'ups'
            });
        }
        else{
            console.log(data);
            res.send({
                nick: data.nick,
            });
        }
    })
})

module.exports = entRouter