const db_plus = require('mysql-plus');
const time = require('luxon').DateTime;

class ShcoolBell {
    constructor() {
        this.host = 'localhost';
        this.user = 'MAtrix';
        this.password = 'M1000110Atrix';
        this.database = 'school_bell';
        this.#connectToDB();
    }

    #connectToDB() {
        this.pool = db_plus.createPool({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

        this.tables = {
            dynamicdays: this.pool.defineTable('dynamicdays', {
                columns: {
                    id: db_plus.ColTypes.int(),
                    definiteDate: db_plus.ColTypes.date(),
                    firstTime: db_plus.ColTypes.varchar(200),
                    secondTime: db_plus.ColTypes.varchar(200)
                }
            }),
            staticdays: this.pool.defineTable('staticdays', {
                columns: {
                    id: db_plus.ColTypes.int(),
                    dateWeekDay: db_plus.ColTypes.varchar(20),
                    firstTime: db_plus.ColTypes.varchar(200),
                    secondTime: db_plus.ColTypes.varchar(200)
                }
            }),
            users: this.pool.defineTable('users', {
                columns: {
                    id: db_plus.ColTypes.int(),
                    userName: db_plus.ColTypes.varchar(20),
                    userPassword: db_plus.ColTypes.varchar(100),
                    role: db_plus.ColTypes.varchar(20)
                }
            })
        }
    }

    async SelectStaticSchedule(weekDay) {
        const result = await this.tables.staticdays.select('firstTime, secondTime', `WHERE dateWeekDay = "${weekDay}"`);
        return result;
    }

    async SelectDynamicSchedule({ weekDay, year, month, day }) {
        let convertDate = `${year}-${month}-${day}`;
        const dynamicResult = await this.tables.dynamicdays.select('firstTime, secondTime', `WHERE definiteDate = "${convertDate}"`);
        if (dynamicResult[0] === undefined) {
            return await this.SelectStaticSchedule(weekDay);
        }
        else {
            return dynamicResult;
        }
    }

    async ReplaceDynamicSchedule({ date, first, second }) {
        await this.tables.dynamicdays.query(`REPLACE dynamicdays(definiteDate, firstTime, secondTime) VALUES("${date}","${first}","${second}")`);
    }

    async SelectUser({ username }) {
        const result = await this.tables.users.select('userName, userPassword, role', `WHERE userName = "${username}"`);
        return result;
    }

    async SelectUserPassport({ username }) {
        const result = await this.tables.users.select('*', `WHERE userName = "${username}"`);
        return result;
    }

    async DeleteTime() {
        let date = time.local().toLocal('ru')
        this.tables.dynamicdays.delete(`WHERE definiteDate < "${date.toFormat('yyyy-MM-dd')}"`).then(res => {
            if(res.affectedRows === 0){
                console.log(`Нет данных для удаления!`, `время: ${date.toFormat('HH:mm:ss')}`);
            }
            else{
                console.log(`Удаление произошло успешно! Количество удаленных строк: ${res.affectedRows}.`, `время: ${date.toFormat('HH:mm:ss')}`);
            }
        }).catch(() => {
            console.log('Произошла ошибка при удалении!', `время: ${date.toFormat('HH:mm:ss')}`);
        })
    }
}

module.exports = ShcoolBell;