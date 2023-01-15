import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import CellTime from './modifications/CellTime';

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
    var [staticTime, setStaticTime] = useState();//обычное расписание
    var [dynamicTime, setDynamicTime] = useState();//измененное расписание
    var refInpValue = useRef({first:{}, second:{}});//ссылка на поля инпут
    var [callTime, setCallTime] = useState(() => GetData('http://localhost:3001/calendar/dynamic?',
        {
            weekDay: thisTime.weekdayLong,
            day: gotTime.day,
            month: gotTime.month,
            year: gotTime.year
        }).then(data => setCallTime(data)));//получение расписания

    async function GetData(url, params = null, reqInit = {}) {
        const prom = await fetch(url + new URLSearchParams(params), reqInit);
        return await prom.json();
    }

    useEffect(() => {
        setStaticTime(callTime?.time);
        setDynamicTime(callTime?.time);
    }, [callTime])

    const ReloadPage = () => {
        nav(0);
    }

    function ResetAllTime() {
        setCallTime([]);
    }

    function GiveAccess() {
        setAccessToWrite(!accessToWrite);
    }

    function CreateACellTime(obj, group){
        for (let i = 0; i < Object.keys(refInpValue.current[group]).length / 4; i++){
            let timeEl = "";
            for (let j = 0; j < 4; j++){
                timeEl += refInpValue.current[group][`${i+1}_${j+1}`]?.value
                if(j == 0 || j == 2){
                    timeEl += ":"
                }
                else if(j == 1){
                    timeEl += "-"
                }
            }
            obj[group].push(timeEl)
        }
    }

    async function SendDate() {
        let dataOBJ = {
            date: `${gotTime.day}.${gotTime.month}.${gotTime.year}`,
            first: [],
            second: []
        };
        CreateACellTime(dataOBJ, 'first')
        CreateACellTime(dataOBJ, 'second')
        fetch('http://localhost:3001/calendar/dynamic', {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"
            },
            method: "PUT",
            body: new URLSearchParams(dataOBJ)
        })
    }

    return (
        <>
            <div className='main__date-box'>
                <div className="main__date-calendar">
                    <h1>Календарь <span className='main__date-date'>{thisTime.year}</span></h1>
                </div>
            </div>
            <div className="main__time-manager-box">
                <div className="main__time-manager">
                    <div className="main__first-time-box">
                        <TimeBlock timeBlockName={'Первая смена'} access={accessToWrite} />
                        {staticTime?.['first'].map((v, i) => <CellTime
                            callValue={v}
                            ref={refInpValue}
                            access={accessToWrite}
                            group={'first'}
                            index={i + 1}
                            key={i} />)}
                    </div>
                    <div className="main__second-time-box">
                        <TimeBlock timeBlockName={'Вторая смена'} access={accessToWrite} />
                        {staticTime?.['second'].map((v, i) => <CellTime
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
                        <ControlButton method={ReloadPage} CN='main__standart-time-button' text='static' />
                        <ControlButton method={ReloadPage} CN='main__standart-time-button' text='dynamic' />
                    </div>
                    <ControlButton method={ResetAllTime} CN='main__standart-time-button' text='сбросить' />
                    <ControlButton method={GiveAccess} CN='main__standart-time-button' text='изменить' />
                    <ControlButton method={() => SendDate().then(()=>nav('/calendar'))} CN='main__ok-change-button' text='подтвердить' />
                </div>
            </div>
        </>
    );
}

function TimeBlock({ timeBlockName, func_01, func_02, access }) {
    return (
        <div className="main__time-block">
            <button className="main__time-cell-button-blus-minus"
                onClick={func_01}>+</button>
            <h1>{timeBlockName}</h1>
            <button className="main__time-cell-button-blus-minus"
                onClick={func_02}>-</button>
        </div>
    )
}

function DateNow({ _thisTime }) {
    return (
        <div className="main__date-now">
            <h1 className="main__date-now-month">{_thisTime.monthLong}</h1>
            <h1 className="main__date-now-number">{_thisTime.toFormat('dd')}</h1>
            <h1 className="main__date-now-tag">{_thisTime.weekdayLong}</h1>
        </div>
    )
}

function ControlButton(props) {
    return (
        <button className={props.CN}
            onClick={props.method}>
            {props.text}
        </button>
    )
}

export default CalendarDay;