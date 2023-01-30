const { DateTime } = require('luxon');
const ShcoolBell = require('../DataWork/shcoolBellClass');


async function GetDynamic(req, res) {
    console.log(req.query)
    const { weekDay, day, month, year } = req.query;
    let response;
    const connectionDynamic = new ShcoolBell().connection;
    connectionDynamic.query(`SELECT firstTime, secondTime FROM dynamicdays WHERE definiteDate = "${year}-${month}-${day}"`, (errD, resD) => {
        if (String(resD) === '') {
            const connectionStatic = new ShcoolBell().connection;
            connectionStatic.query(`SELECT firstTime, secondTime FROM staticdays WHERE dateWeekDay = "${weekDay}"`, (errS, resS) => {
                if(resS[0]=== undefined){
                    res.sendStatus(200);
                }
                else{
                    console.log(resS, 'static');
                    response = ({ first: resS[0].firstTime, second: resS[0].secondTime });
                    res.send(response);
                }
                connectionStatic.end();
                connectionDynamic.end();
            })
        }
        else {
            console.log(resD, 'dynamic')
            response = ({ first: resD[0].firstTime, second: resD[0].secondTime });
            res.send(response);
            connectionDynamic.end();
        }
    })
}

async function GetStatic(req, res) {
    console.log(req.query)
    const { weekDay } = req.query;
    const connectionStatic = new ShcoolBell().connection;
    connectionStatic.query(`SELECT firstTime, secondTime FROM staticdays WHERE dateWeekDay = "${weekDay}"`, (errD, resS) => {
        const response = ({ first: resS[0].firstTime, second: resS[0].secondTime });
        res.send(response);
        connectionStatic.end();
    })
}

async function GetDynamicNow(req, res) {
    const timeNow = DateTime.local().setLocale('ru');
    const definiteDate = timeNow.toFormat('yyyy-MM-dd');
    const weekDay = timeNow.weekdayLong;
    console.log(weekDay, definiteDate)
    let rowInfo = timeNow.toFormat('ssmmHHddMMyyyy88880755');
    const connectionDynamic = new ShcoolBell().connection;
    connectionDynamic.query(`SELECT firstTime, secondTime FROM dynamicdays WHERE definiteDate = "${definiteDate}"`, (errD, resD) => {
        if (String(resD) === '') {
            const connectionStatic = new ShcoolBell().connection;
            connectionStatic.query(`SELECT firstTime, secondTime FROM staticdays WHERE dateWeekDay = "${weekDay}"`, (errD, resS) => {
                console.log(resS, 'static');
                rowInfo += (resS[0].firstTime + resS[0].secondTime);
                res.send(rowInfo);
                connectionStatic.end();
                connectionDynamic.end();
            })
        }
        else {
            console.log(resD, 'dynamic')
            rowInfo += (resD[0].firstTime + resD[0].secondTime);
            res.send(rowInfo);
            connectionDynamic.end();
        }
    })
}

async function PutDynamic(req, res) {
    console.log(req.body)
    const { date, first, second } = req.body;
    const connectionDynamic = new ShcoolBell().connection;
    connectionDynamic.query(`REPLACE dynamicdays(definiteDate, firstTime, secondTime) VALUES("${date}","${first}","${second}")`, (errD, resD) => {
        connectionDynamic.end();
    })
}

module.exports = { GetDynamic, GetStatic, PutDynamic, GetDynamicNow }