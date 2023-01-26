const mySql = require('mysql2')

class ShcoolBell {
    constructor() {
        this.host = 'localhost';
        this.user = 'MAtrix';
        this.password = 'M1000110Atrix';
        this.database = 'school_bell';
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
