import React from 'react';
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import '../styles/calendar.css';
import arrow from '../images/arrow.svg';

const Calendar = () => {

    const GetTime = () => {
        let now = DateTime.local();
        return (now.setLocale('ru'));
    }

    const PlusMonth = () => {
        setTime(time.plus({ month: 1 }))
    }

    const MinusMonth = () => {
        setTime(time.minus({ month: 1 }))
    }

    var [time, setTime] = useState(() => GetTime());
    var [daysCount, setDaysCount] = useState(() => time.daysInMonth);

    useEffect(() => {
        setDaysCount(daysCount = time.daysInMonth);
    }, [time])

    return (
        <>
            <div className='main__date-box'>
                <div className="main__date-calendar">
                    <h1>Календарь <span className='main__date-date'>{time.toFormat('yyyy')}</span></h1>
                </div>
            </div>
            <div className='main__calendar-box'>
                <div className='main__calendar'>
                    {[...new Array(daysCount)].map((v, i) => <CellDates index={i} time={time} key={i} />)}
                </div>
            </div>
            <div className='main__data-changer-box'>
                <div className="main__data-changer-body">
                    <button className="main__button-change-left" onClick={MinusMonth}>
                        <img src={arrow} alt="<" />
                    </button>
                    <div className="main__date-change">{time.toFormat('LLLL')}</div>
                    <button className="main__button-change-right" onClick={PlusMonth}>
                        <img src={arrow} alt=">" />
                    </button>
                </div>
            </div>
        </>
    );
}

const CellDates = (props) => {
    const time = props.time;
    const index = props.index;
    const timeToday = time.minus({ days: time.day - (index + 1) })
    const link = `date/${timeToday.day}/${timeToday.month}/${timeToday.year}`;
    if (DateTime.local().setLocale('ru').toFormat('yyyy-MM-dd') === timeToday.toFormat('yyyy-MM-dd')) {
        return (
            <Link className={"main__cell-dates-now"} to={link}>
                <h1 className="main__d-year">{time.toFormat('LLLL')}</h1>
                <h1 className="main__d-number-now">{timeToday.toFormat('dd')}</h1>
                <h1 className="main__d-tag">{timeToday.weekdayLong}</h1>
            </Link>
        )
    }
    else {
        return (
            <Link className={"main__cell-dates"} to={link}>
                <h1 className="main__d-year">{time.toFormat('LLLL')}</h1>
                <h1 className="main__d-number">{timeToday.toFormat('dd')}</h1>
                <h1 className="main__d-tag">{timeToday.weekdayLong}</h1>
            </Link>
        )
    }
}

export default Calendar;