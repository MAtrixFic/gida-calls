const { DateTime } = require('luxon');
const ShcoolBell = require('../DataWork/shcoolBellClass');


async function GetDynamic(req, res) {
    console.log(req.query)
    const { weekDay, day, month, year } = req.query;
    const connectionDynamic = new ShcoolBell();
    await connectionDynamic.SelectDynamicSchedule({ weekDay, year, month, day }).then(data => {
        try {
            res.send({
                first: data[0].firstTime,
                second: data[0].secondTime
            })
        }
        catch {
            res.sendStatus(406)
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
            res.sendStatus(406)
        }
    });
}

async function GetDynamicNow(req, res) {
    const timeNow = DateTime.local().setLocale('ru');
    const [year, month, day] = [timeNow.toFormat('yyyy'), timeNow.toFormat('MM'), timeNow.toFormat('dd')]
    const weekDay = timeNow.weekdayLong;
    let row = timeNow.toFormat('ssmmHHddMMyyyy88880755');
    var dbConnection = new ShcoolBell();
    dbConnection.SelectDynamicSchedule({ weekDay, year, month, day }).then(data => {
        try {
            res.send(row + data[0].firstTime + data[0].secondTime)
        }
        catch {
            res.sendStatus(406)
        }
    })
}

async function PutDynamic(req, res) {
    console.log(req.body)
    const { date, first, second } = req.body;
    const connectionDynamic = new ShcoolBell();
    connectionDynamic.ReplaceDynamicSchedule({ date, first, second }).then(res.sendStatus(200));
}

async function GetClasses(req, res) {
    const connectionToClasses = new ShcoolBell();
    let arrayClasses = [];
    await connectionToClasses.SelectClasses().then(result => {
        try{
            for(let i of result){
                arrayClasses.push(i.number + i.letter)
            }
            res.send(JSON.stringify(arrayClasses));
        }
        catch{
            console.log("Нет данных")
            res.sendStatus(404);
        }
    });
}

async function GetLessonsList(req, res) {
    const connectionToLessonsLis = new ShcoolBell();
    let arrayLessons = [];
    await connectionToLessonsLis.SelectLessonsList().then(result => {
        try{
            for(let i of result){
                arrayLessons.push(i.name)
            }
            res.send(JSON.stringify(arrayLessons));
        }
        catch{
            console.log("Нет данных")
            res.sendStatus(404);
        }
    });
}

module.exports = { GetDynamic, GetStatic, PutDynamic, GetDynamicNow, GetClasses, GetLessonsList }