const Calls = require('./calls');

const CallsOBJ = {
    static: new Calls(Calls.Schemas.static, 'static', Calls.collectionsName.static),
    dynamic: new Calls(Calls.Schemas.dynamic, 'dynamic', Calls.collectionsName.dynamic)
}

async function GetData(calls = Calls, whatToFind = {}) {
    const result = await calls.ConnectToFind(whatToFind);
    return await result;
}
async function SetData(calls = Calls, filter = {}, whatToRemake = {}) {
    await calls.ConnectToWrite(filter, whatToRemake);
}

module.exports = { SetData, GetData, CallsOBJ }