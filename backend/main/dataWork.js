const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

class Calls {
    static collectionsName = {
        static : 'staticDays',
        dynamic : 'dynamicDays',
        people : 'people'
    }

    constructor(dbPath, schema, modelName, collectionName) {
        this.dbPath = dbPath;
        this.schema = schema;
        this.modelName = modelName;
        this.collectionName = collectionName;
        this.callModel = mongoose.model(this.modelName, this.schema, this.collectionName);
    }

    async ConnectToFind(what) {
        await mongoose.connect(this.dbPath);
        const result = await this.callModel.findOne(what);
        return await result;
    }

    async ConnectToWrite(filter, what) {
        await mongoose.connect(this.dbPath);
        await this.callModel.replaceOne(filter, what, {upsert: true, strict: false});
    }
}

module.exports = Calls;