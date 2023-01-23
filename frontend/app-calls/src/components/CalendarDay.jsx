import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import CellTime from './modifications/CellTime';
import TimeBlock from './modifications/TimeBlock';
import DateNow from './modifications/DateNow';
import ControlButton from './modifications/ControlButton';

import '../styles/calendarday.css';
const CalendarDay = () => {
    const nav = useNavigate();
    const gotTime = useParams();
    const [thisTime] = useState(() =>
        DateTime.local(Number(gotTime.year),
            Number(gotTime.month),
            Number(gotTime.day))
            .toLocal('ru'));

    var [accessToWrite, setAccessToWrite] = useState(() => false); //доступ к изменению полей
    var refInpValue = useRef({ first: {}, second: {} });//ссылка на поля инпут
    var [gettingData, setGettingData] = useState(() => GetData('dynamic').then(data => setGettingData(data)));//получение расписания
    var [timeList, setTimeList] = useState();

    useEffect(() => {
        setTimeList(gettingData['time'])
    }, [gettingData])

    function AddCellTime(number = '') {
        if (timeList[number].length < 8) {
            var prevStateOfTimeList = timeList;
            prevStateOfTimeList[number].push('00:00-00:00');
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
        if (update) setTimeList([]);
        let prom;
        if (type === 'static') {
            prom = await fetch(`http://localhost:3001/calendar/${type}?` + new URLSearchParams({
                weekDay: thisTime.weekdayLong
            }), {
                headers: {
                    "Authorization": localStorage?.auth
                }
            });
        }
        else if (type === 'dynamic') {
            prom = await fetch(`http://localhost:3001/calendar/${type}?` + new URLSearchParams({
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
            return await prom.json();
        }
        else {
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
                if (j === 0 || j === 2) {
                    timeEl += ":"
                }
                else if (j === 1) {
                    timeEl += "-"
                }
            }
            obj[group].push(timeEl)
        }
    }

    async function SendDate() {
        let dataOBJ = {
            date: `${gotTime.year}-${gotTime.month}-${gotTime.day}`,
            first: [],
            second: [],
        };
        CreateACellTime(dataOBJ, 'first')
        CreateACellTime(dataOBJ, 'second')
        fetch('http://localhost:3001/calendar/dynamic', {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                "Authorization": localStorage?.auth
            },
            method: "PUT",
            body: new URLSearchParams(dataOBJ)
        }).then(res => {
            if (!res.ok)
            nav('/auth/log')
        })
    }

    return (
        <>
            <div className='main__date-box'>
                <div className="main__date-calendar">
                    <h1>Календарь <span className='main__date-date'>{thisTime.year}</span></h1>
                    <button onClick={CopyTime}>Copy</button>
                    <button disabled={(timeList?.first?.length === 0 && timeList?.second?.length === 0) ? false : true} onClick={PastTime}>Past</button>
                </div>
            </div>
            <div className="main__time-manager-box">
                <div className="main__time-manager">
                    <div className="main__first-time-box">
                        <TimeBlock timeBlockName={'Первая смена'} access={accessToWrite}
                            func_01={() => AddCellTime('first')}
                            func_02={() => RemoveCellTime('first')} />
                        {timeList?.['first']?.map((v, i) => <CellTime
                            callValue={v}
                            ref={refInpValue}
                            access={accessToWrite}
                            group={'first'}
                            index={i + 1}
                            key={i} />)}
                    </div>
                    <div className="main__second-time-box">
                        <TimeBlock timeBlockName={'Вторая смена'} access={accessToWrite}
                            func_01={() => AddCellTime('second')}
                            func_02={() => RemoveCellTime('second')} />
                        {timeList?.['second']?.map((v, i) => <CellTime
                            callValue={v}
                            ref={refInpValue}
                            access={accessToWrite}
                            group={'second'}
                            index={i + 1}
                            key={i} />)}
                    </div>
                </div>
                <DateNow _thisTime={thisTime} />
                <div className="main__time-manager-buttons">
                    <div className="main__static-dynamic-box">
                        <ControlButton method={() => GetData('static', true).then(data => setGettingData(data))} CN='main__standart-time-button' text='static' />
                        <ControlButton method={() => GetData('dynamic', true).then(data => setGettingData(data))} CN='main__standart-time-button' text='dynamic' />
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