import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import CellTime from './modifications/CellTime';
import TimeBlock from './modifications/TimeBlock';
import DateNow from './modifications/DateNow';
import ControlButton from './modifications/ControlButton';
import { SERVERIP } from './constantDatas/constsOfServer';

import '../styles/calendarday.css';
const CalendarDay = () => {
    const nav = useNavigate();
    const gotTime = useParams();
    const [thisTime] = useState(() =>
        DateTime.local(Number(gotTime.year),
            Number(gotTime.month),
            Number(gotTime.day))
            .toLocal('ru'));

    const [serverIp] = useState(() => SERVERIP.local);
    var [accessToWrite, setAccessToWrite] = useState(() => false); //доступ к изменению полей
    var refInpValue = useRef({ first: {}, second: {} }); //ссылка на поля инпут
    var [gettingData, setGettingData] = useState(() => GetData(String(gotTime.type)).then(data => {
        data.res === 'empty' ? setGettingData({ first: '00000000', second: '00000000' }) : setGettingData(data)
    }));//получение расписания
    var [timeList, setTimeList] = useState(() => []);



    useEffect(() => {
        let data = { first: [], second: [] };
        console.log(gettingData)
        try {
            let indexFirst = 0;
            let indexSecond = 0;
            for (let i = 0; i < gettingData.first.length / 8; i++) {
                let row = '';
                for (let j = 0; j < 8; j++) {
                    row += gettingData.first[indexFirst]
                    indexFirst += 1;
                }
                data.first.push(row);
            }
            for (let i = 0; i < gettingData.second.length / 8; i++) {
                let row = '';
                for (let j = 0; j < 8; j++) {
                    row += gettingData.second[indexSecond]
                    indexSecond += 1;
                }
                data.second.push(row);
            }
        }
        catch (err) {
            console.log('error')
        }
        setTimeList(data)
    }, [gettingData])

    function AddCellTime(number = '') {
        if (timeList[number].length < 8) {
            var prevStateOfTimeList = timeList;
            prevStateOfTimeList[number].push('00000000');
            ResetAllTime();
            setTimeList(prev => Object.assign(prev, prevStateOfTimeList))
        }
    }

    function RemoveCellTime(number = '') {
        if (timeList[number].length > 0) {
            var prevStateOfTimeList = timeList;
            ResetAllTime();
            prevStateOfTimeList[number].pop();
            setTimeList(prev => Object.assign(prev, prevStateOfTimeList))
        }
    }

    function CopyTime() {
        let timeObj = {
            first: [],
            second: []
        }
        CreateACellTime(timeObj, 'first');
        CreateACellTime(timeObj, 'second');
        localStorage.copy = JSON.stringify(timeObj);
    }

    function PastTime() {
        setTimeList(JSON.parse(localStorage.copy));
    }

    async function GetData(type = 'dynamic', update = false) {
        if (update) ResetAllTime();
        let prom;
        if (type === 'static') {
            if (gotTime.type === 'static') {
                prom = await fetch(`http://${serverIp}/calendar/${type}?` + new URLSearchParams({
                    weekDay: gotTime.weekday
                }), {
                    headers: {
                        "Authorization": localStorage?.auth
                    }
                });
            } else {
                prom = await fetch(`http://${serverIp}/calendar/${type}?` + new URLSearchParams({
                    weekDay: thisTime.weekdayLong
                }), {
                    headers: {
                        "Authorization": localStorage?.auth
                    }
                });
            }
        }
        else if (type === 'dynamic') {
            prom = await fetch(`http://${serverIp}/calendar/${type}?` + new URLSearchParams({
                weekDay: thisTime.weekdayLong,
                day: gotTime.day,
                month: gotTime.month,
                year: gotTime.year
            }), {
                headers: {
                    "Authorization": localStorage?.auth
                }
            });
        }
        if (prom.ok) {
            console.log(await prom.res)
            return await prom.json();
        }
        else if (prom.status === 401) {
            nav('/auth/log')
        }
    }

    function ResetAllTime() {
        setTimeList({
            first: [],
            second: []
        });
    }

    function GiveAccess() {
        setAccessToWrite(prev => !prev);
    }

    function CreateACellTime(obj, group) {
        for (let i = 0; i < timeList[group].length; i++) {
            let timeEl = "";
            for (let j = 0; j < 4; j++) {
                timeEl += refInpValue.current[group][`${i + 1}_${j + 1}`]?.value
            }
            obj[group].push(timeEl)
        }
    }

    function CreateROW(obj, group) {
        for (let i in refInpValue.current[group]) {
            if (refInpValue.current[group][i] !== null)
                obj[group] += refInpValue.current[group][i]?.value
        }
    }

    async function SendDate() {
        let dataOBJ = {}
        if (gotTime.type === 'dynamic') {
            dataOBJ = {
                date: `${gotTime.year}-${gotTime.month}-${gotTime.day}`,
                first: '',
                second: '',
            };
        } else if (gotTime.type === 'static') {
            dataOBJ = {
                weekday: `${gotTime.weekday}`,
                first: '',
                second: '',
            };
            console.log(dataOBJ)
        }

        CreateROW(dataOBJ, 'first')
        CreateROW(dataOBJ, 'second')
        fetch(`http://${serverIp}/calendar/${gotTime.type}`, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                "Authorization": localStorage?.auth
            },
            method: "PUT",
            body: new URLSearchParams(dataOBJ)
        }).then(res => {
            if (res.status === 401)
                nav('/auth/log')
        })
    }

    return (
        <>
            <div className="main__date-calendar">
                <h1>Звонки</h1>
                <button onClick={CopyTime}>Copy</button>
                <button disabled={(timeList?.first?.length === 0 && timeList?.second?.length === 0) ? false : true} onClick={PastTime}>Past</button>
            </div>
            <div className="main__time-manager-box">
                <div className="main__time-manager">
                    <div className={"main__first-time-box"}>
                        <TimeBlock timeBlockName={'Первая смена'} access={accessToWrite}
                            func_01={() => AddCellTime('first')}
                            func_02={() => RemoveCellTime('first')} />
                        {timeList?.['first']?.map((v, i) =>
                            <CellTime
                                key={i}
                                callValue={v}
                                ref={refInpValue}
                                access={accessToWrite}
                                group={'first'}
                                index={i + 1} />)}
                    </div>
                    <div className={"main__second-time-box"}>
                        <TimeBlock timeBlockName={'Вторая смена'} access={accessToWrite}
                            func_01={() => AddCellTime('second')}
                            func_02={() => RemoveCellTime('second')} />
                        {timeList?.['second']?.map((v, i) =>
                            <CellTime
                                key={i}
                                callValue={v}
                                ref={refInpValue}
                                access={accessToWrite}
                                group={'second'}
                                index={i + 1} />)}
                    </div>
                </div>
                <DateNow weekDay={gotTime.weekday} type={gotTime.type} _thisTime={thisTime} />
                <div className="main__time-manager-buttons">
                    <div className={`main__static-dynamic-box ${gotTime.type === 'static' && 'static'}`}>
                        <ControlButton method={() => GetData('static', true).then(data => setGettingData(data))} CN='main__standart-time-button' text={gotTime.type === 'static' ? 'загрузить данные' : 'static'} />
                        {gotTime.type === 'dynamic' && <ControlButton method={() => GetData('dynamic', true).then(data => {
                            data.res === 'empty' ? setGettingData({ first: '00000000', second: '00000000' }) : setGettingData(data)
                        })} CN='main__standart-time-button' text={'dynamic'} />}
                    </div>
                    <ControlButton method={ResetAllTime} CN='main__standart-time-button' text='сбросить' />
                    <ControlButton method={GiveAccess} CN='main__standart-time-button' text='изменить' />
                    <ControlButton method={() => SendDate().then(() => nav('/calendar'))} CN='main__ok-change-button' text='подтвердить' />
                </div>
            </div>
        </>
    );
}

export default CalendarDay;