const { DateTime } = require('luxon');
const { GetData, SetData, CallsOBJ } = require('../DataWork/callsOptions');

async function GetDynamic(req, res) {
    console.log(req.query)
    const { weekDay, day, month, year } = req.query;
    GetData(CallsOBJ.dynamic, { date: `${year}-${month}-${day}` }).then(dataD => {
        if (dataD === null) {
            GetData(CallsOBJ.static, { name: weekDay }).then(dataS => {
                res.send(dataS);
            });
        }
        else {
            res.send(dataD)
        }
    });
}

async function GetStatic(req, res) {
    console.log(req.query)
    GetData(CallsOBJ.static, { name: req.query.weekDay }).then(data => res.send(data));
}

async function GetDynamicNow(req, res) {
    const timeNow = DateTime.local().setLocale('ru');
    const [year, month, day] = timeNow.toFormat('yyyy-MM-dd').split('-');
    const weekDay = timeNow.weekdayLong;
    let rowInfo = timeNow.toFormat('ssmmHHddMMyyyy88880755');
    GetData(CallsOBJ.dynamic, { date: `${year}-${month}-${day}` }).then(dataD => {
        if (dataD === null) {
            GetData(CallsOBJ.static, { name: weekDay }).then(dataS => {
                rowInfo += MakeRow(dataS.time)
                res.send(rowInfo)
            });
        }
        else {
            rowInfo += MakeRow(dataD.time)
            res.send(rowInfo);
        }
    });
}

async function PutDynamic(req, res) {
    const { date, first, second } = req.body;
    SetData(CallsOBJ.dynamic, { date: date }, {
        date: date,
        time: {
            first: [...first.split(',')],
            second: [...second.split(',')]
        },
        type: 'dynamic'
    })
    res.sendStatus(200);
}

function MakeRow(time = {}){
    let row = '';
    let timeArrays = time?.first.concat(time.second)
    for (let i of timeArrays) {
        row += i.replace(':', '').replace('-', '').replace(':', '');
    }
    return row;
}

module.exports = { GetDynamic, GetStatic, PutDynamic, GetDynamicNow }