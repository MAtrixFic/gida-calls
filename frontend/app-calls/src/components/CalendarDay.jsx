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

    var [accessToWrite, setAccessToWrite] = useState(() => false);
    var [callTime, setCallTime] = useState(() => GetData().then(data => setCallTime(data)));
    var refInpValue = useRef({});
    async function GetData() {
        const prom = await fetch('http://localhost:3001/calls?' + new URLSearchParams({
            weekDay: thisTime.weekdayLong,
            day: gotTime.day,
            month: gotTime.month,
            year: gotTime.year
        }));
        return await prom.json();
    }

    useEffect(() => {
        console.log(callTime?.time?.['first']);
        console.log(callTime?.time?.['second']);
    }, [callTime])

    const ReloadPage = () => {
        nav(0);
    }

    function ToCalendar() {
        nav('/calendar');
    }

    function GiveAccess() {
        setAccessToWrite(!accessToWrite);
        console.log(refInpValue);
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
                        <div className="main__first-time-block">
                            <h1>Первая смена</h1>
                        </div>
                        {callTime?.time?.['first'].map((v, i) => <CellTime
                            callValue={v}
                            ref={refInpValue}
                            access={accessToWrite}
                            group={`first_${i + 1}`}
                            key={i} />)}
                    </div>
                    <div className="main__second-time-box">
                        <div className="main__second-time-block">
                            <h1>Вторая смена</h1>
                        </div>
                        {callTime?.time?.['second'].map((v, i) => <CellTime
                            callValue={v}
                            ref={refInpValue}
                            access={accessToWrite}
                            group={`second_${i + 1}`}
                            key={i} />)}
                    </div>
                </div>
                <DateNow _thisTime={thisTime} />
                <div className="main__time-manager-buttons">
                    <ControlButton method={ReloadPage} CN='main__reset-time-button' text='сбросить' />
                    <ControlButton method={GiveAccess} CN='main__change-time-button' text='изменить' />
                    <ControlButton method={ToCalendar} CN='main__ok-change-button' text='подтвердить' />
                </div>
            </div>
        </>
    );
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