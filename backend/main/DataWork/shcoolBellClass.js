const mySql = require('mysql2')

class ShcoolBell {
    constructor(_host, _user, _password, _database) {
        this.host = _host;
        this.user = _user;
        this.password = _password;
        this.database = _database;
        this.#connectToDB();
    }

    #connectToDB() {
        this.connection = mySql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        })
    }
}

module.exports = ShcoolBell;
