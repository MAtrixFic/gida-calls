const mongoose = require("mongoose");
const schema = mongoose.Schema;
mongoose.set('strictQuery', false);

class Calls {
    static collectionsName = {
        static: 'staticDays',
        dynamic: 'dynamicDays',
        users: 'users'
    }

    static Schemas = {
        static: new schema({
            name: String,
            time: {
                first: Array,
                second: Array
            },
            type: String
        }),
        dynamic: new schema({
            date: mongoose.SchemaTypes.Date,
            time: {
                first: Array,
                second: Array
            },
            type: String
        }),
        users: new schema({
            username: String,
            password: String,
            role: { type: String, default: 'BASIC' }
        })
    }

    constructor(schema, modelName, collectionName) {
        this.schema = schema;
        this.modelName = modelName;
        this.collectionName = collectionName;
        this.callModel = mongoose.model(this.modelName, this.schema, this.collectionName);
    }

    async ConnectToFind(what) {
        await mongoose.connect('mongodb://localhost:27017/Calls')
        const result = await this.callModel.findOne(what);
        return await result;
    }

    async ConnectToWrite(filter, what) {
        await mongoose.connect('mongodb://localhost:27017/Calls')
        await this.callModel.replaceOne(filter, what, { upsert: true, strict: false });
    }

    async ConnectToRemove(filter = {date: { $lt : new Date()}}){
        await mongoose.connect('mongodb://localhost:27017/Calls')
        await this.callModel.deleteMany(filter);
    }
}

module.exports = Calls;