const Calls = require('./calls');

const CallsOBJ = {
    static: new Calls(Calls.Schemas.static, 'static', Calls.collectionsName.static),
    dynamic: new Calls(Calls.Schemas.dynamic, 'dynamic', Calls.collectionsName.dynamic),
    users: new Calls(Calls.Schemas.users, 'users', Calls.collectionsName.users)
}

async function GetData(calls = Calls, whatToFind = {}) {
    const result = await calls.ConnectToFind(whatToFind);
    return await result;
}
async function SetData(calls = Calls, filter = {}, whatToRemake = {}) {
    await calls.ConnectToWrite(filter, whatToRemake);
}

async function RemoveData(calls = Calls, filter = {date: { $lt : new Date()}}){
    await calls.ConnectToRemove(filter);
}

module.exports = { SetData, GetData, RemoveData, CallsOBJ }