const { DateTime } = require('luxon');
const ShcoolBell = require('../DataWork/shcoolBellClass');


async function GetDynamic(req, res) {
    console.log(req.query)
    const { day, month, year } = req.query;
    const connectionDynamic = new ShcoolBell();
    await connectionDynamic.SelectDynamicSchedule({ year, month, day }).then(data => {
        if (data === "error") {
            res.send({ res: 'empty' });
        }
        else {
            res.send({
                first: data[0].firstTime,
                second: data[0].secondTime
            })
        }
    })
}

async function GetStatic(req, res) {
    console.log('static')
    const { weekDay } = req.query;
    var connectionStatic = new ShcoolBell();
    await connectionStatic.SelectStaticSchedule(weekDay).then(data => {
        try {
            res.send({
                first: data[0].firstTime,
                second: data[0].secondTime
            })
        }
        catch {
            console.log('empty');
            res.send({ res: 'empty' });
        }
    });
}

async function GetDynamicNow(req, res) {
    const timeNow = DateTime.local().setLocale('ru');
    const [year, month, day] = [timeNow.toFormat('yyyy'), timeNow.toFormat('MM'), timeNow.toFormat('dd')]
    const weekDay = timeNow.weekdayLong;
    let row = timeNow.toFormat('ssmmHHddMMyyyy88880755');
    var dbConnection = new ShcoolBell();
    let convertDate = `${year}-${month}-${day}`;
    dbConnection.SelectDynamicSchedule(convertDate).then(dataD => {
        if (dataD === 'error') {
            dbConnection.SelectStaticSchedule(weekDay).then(dataS => {
                try {
                    res.send(row + dataS[0].firstTime + dataS[0].secondTime)
                }
                catch {
                    res.sendStatus(406)
                }
            })
        }
        else {
            try {
                res.send(row + dataD[0].firstTime + dataD[0].secondTime)
            }
            catch {
                res.sendStatus(406)
            }
        }
    })
}

async function GetDynamicBellsSheduleForTelegram(req, res) {
    const { date } = req.params
    var dbConnection = new ShcoolBell();
    const timeNow = DateTime.local(date.split('-')).setLocale('ru');
    const weekDay = timeNow.weekdayLong;
    console.log(weekDay, date)
    dbConnection.SelectDynamicSchedule(date).then(dataD => {
        if (dataD === 'error') {
            dbConnection.SelectStaticSchedule(weekDay).then(dataS => {
                try {
                    res.send({ first: dataS[0].firstTime, second: dataS[0].secondTime })
                }
                catch {
                    res.sendStatus(406)
                }
            })
        }
        else {
            try {
                res.send({ first: dataD[0].firstTime, second: dataD[0].secondTime })
            }
            catch {
                res.sendStatus(406)
            }
        }
    })

}

async function PutDynamic(req, res) {
    console.log(req.body)
    const { date, first, second } = req.body;
    const connectionDynamic = new ShcoolBell();
    connectionDynamic.ReplaceDynamicSchedule({ date, first, second }).then(res.sendStatus(200));
}

async function PutStatic(req, res) {
    const { weekday, first, second } = req.body;
    console.log(req.body)
    const connectionStatic = new ShcoolBell();
    connectionStatic.ReplaceStaticSchedule({ weekDay: weekday, first, second }).then(res.sendStatus(200));
}

async function GetClasses(req, res) {
    const connectionToClasses = new ShcoolBell();
    let arrayClasses = [];
    await connectionToClasses.SelectClasses().then(result => {
        try {
            for (let i of result) {
                arrayClasses.push(i.number + i.letter)
            }
            res.send(JSON.stringify(arrayClasses));
        }
        catch {
            console.log("Нет данных")
            res.sendStatus(404);
        }
    });
}

async function GetLessonsList(req, res) {
    const connectionToLessonsLis = new ShcoolBell();
    let arrayLessons = [];
    await connectionToLessonsLis.SelectLessonsList().then(result => {
        try {
            for (let i of result) {
                arrayLessons.push(i.name)
            }
            res.send(JSON.stringify(arrayLessons));
        }
        catch {
            console.log("Нет данных")
            res.sendStatus(404);
        }
    });
}

async function GetClassShedule(req, res) {
    const { year, month, day, weekDay } = req.query;
    const className = req.params.class;
    const type = req.params.type;
    const date = `${year}-${month}-${day}`
    const connectionToClassShedule = new ShcoolBell();
    await connectionToClassShedule.SelectClassShedule(type, date, weekDay, className).then(result => {
        try {
            res.send(JSON.stringify({ res: result[0].lessons }));
        }
        catch {
            res.send({ res: 'empty' })
        }
    });
}

async function SetClassShedule(req, res) {
    const { data, weekDay, day, month, year } = req.body;
    const className = req.params.class;
    const type = req.params.type;
    console.log(req.body, req.params)
    let doneData = '';
    let dataArr = data.split(',')
    const correctDate = `${year}-${month}-${day}`
    for (let i of dataArr) {
        doneData += `${i}, `
    }
    doneData = doneData.slice(0, -2);
    const connectionToClassShedule = new ShcoolBell();
    await connectionToClassShedule.PutClassShedule(type, doneData, weekDay, correctDate, className);
    res.sendStatus(200);
}

async function SetTelegramUsers(req, res) {
    const { nick, className } = req.body;
    const connectionToTelegaUsers = new ShcoolBell();
    await connectionToTelegaUsers.PutTelegramUsers(className, nick)
    res.sendStatus(200);
}

async function GetTelegaUser(req, res) {
    const { nick } = req.query;
    console.log(req.query);
    const connectionToTelegaUsers = new ShcoolBell();
    try {
        await connectionToTelegaUsers.GetTelegramUser(nick).then(data => {
            res.send(JSON.stringify(data[0].number + data[0].letter))
        })
    }
    catch {
        res.sendStatus(404)
    }
}

async function GetLessonsShedule(req, res) {
    const { className, date } = req.query;
    const timeArray = date.split('-')
    console.log(timeArray)
    const time = DateTime.local(Number(timeArray[0]),Number(timeArray[1]),Number(timeArray[2])).setLocale('ru');
    const weekDay = time.weekdayLong;
    console.log(req.query,weekDay);
    try {
        const connectionToTelegaLessons = new ShcoolBell();
        await connectionToTelegaLessons.GetTelegramLessonsShedule(className , date, weekDay).then(data => {
            console.log(data, 'data')
            res.send(data[0].lessons.split(', '))
        })   
    }
    catch {
        res.sendStatus(404)
    }
}

module.exports = { GetDynamic, GetStatic, PutDynamic, GetDynamicNow, GetClasses, GetLessonsList, GetClassShedule, SetClassShedule, PutStatic, GetDynamicBellsSheduleForTelegram, SetTelegramUsers, GetTelegaUser, GetLessonsShedule }