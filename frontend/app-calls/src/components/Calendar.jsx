import React, { forwardRef } from 'react';
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';

import '../styles/calendar.css';
import arrow from '../images/rectButton.svg';

const Calendar = () => {

    const GetTime = () => {
        let now = DateTime.local();
        return (now.setLocale('ru'));
    }

    const PlusMonth = () => {
        if (tap) {
            setTap(false)
            setTime(prev => prev.plus({ month: 1 }))
            setShowMonth(prev => !prev);
            setUpOrDown(1)
            setDaysInM(0)
        }
    }

    const MinusMonth = () => {
        if (tap) {
            setTap(false)
            setTime(prev => prev.minus({ month: 1 }))
            setShowMonth(prev => !prev);
            setUpOrDown(2)
            setDaysInM(0)
        }
    }

    var [showMonth, setShowMonth] = useState(() => false);
    var [time, setTime] = useState(() => GetTime());
    var [month, setMonth] = useState(() => time.toFormat('LLLL'));
    var [upOrDown, setUpOrDown] = useState(() => 0);
    var [daysInM, setDaysInM] = useState(() => 0);
    var [tap, setTap] = useState(() => true);
    var [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('redirection') === 'weekend') {
            alert('Этовыходной день!')
        }
        else if (searchParams.get('redirection') === 'uncorrect') {
            alert('Неправильная дата!')
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setMonth(time.toFormat('LLLL'));
        }, 200)
    }, [time])

    useEffect(() => {
        if (daysInM < time.daysInMonth) {
            if (daysInM === 0) {
                setTimeout(() => {
                    setDaysInM(prev => prev + 1)
                }, 100)
            }
            else {
                setTimeout(() => {
                    setDaysInM(prev => prev + 1)
                }, 1)
            }
        }
        else {
            setTap(true)
        }
        console.log(daysInM)
    }, [daysInM])

    const monthsList = {
        appear: null,
        appearActive: 'active',
        appearDone: 'done',
        enter: null,
        enterActive: 'active',
        enterDone: 'done',
        exit: null,
        exitActive: 'active',
        exitDone: 'done',
    }
    return (
        <>
            <div className='main__date-box'>
                <div className="main__date-calendar">
                    <h1>Календарь <span className='main__date-date'>{time.toFormat('yyyy')}</span></h1>
                </div>
            </div>
            <div className='main__calendar-box'>
                <div className='main__calendar'>
                    <ul className='main__weekdays'>
                        <li id='weekday'>Понедельник</li>
                        <li id='weekday'>Вторник</li>
                        <li id='weekday'>Среда</li>
                        <li id='weekday'>Четверг</li>
                        <li id='weekday'>Пятница</li>
                        <li id='weekday'>Суббота</li>
                        <li id='weekday'>Воскресенье</li>
                    </ul>
                    <div className="main__calendar-cells">
                        {[...new Array(daysInM)].map((_, i) =>
                            <CellDates index={i} time={time} key={i} />
                        )}
                    </div>
                </div>
                <div className="main__data-changer-box">
                    <div className="main__data-changer-body">
                        <button className='main__data-change-b-up' onClick={MinusMonth}>
                            <svg width="72" height="65" viewBox="0 0 72 65" fill="#8896D9" xmlns="http://www.w3.org/2000/svg" className='main__data-arrow-up'>
                                <path d="M27.3397 5C31.1887 -1.66666 40.8113 -1.66667 44.6603 5L70.641 50C74.49 56.6667 69.6788 65 61.9808 65H10.0192C2.32124 65 -2.49002 56.6667 1.35898 50L27.3397 5Z" />
                            </svg>
                        </button>
                        <CSSTransition
                            timeout={200}
                            in={showMonth}
                            classNames={monthsList}>
                            <div className={upOrDown === 0 ?
                                "main__data-change-month" : upOrDown === 1 ?
                                    "main__data-change-month-up" : "main__data-change-month-down"}>
                                {month}
                            </div>
                        </CSSTransition>
                        <button className="main__data-change-b-down" onClick={PlusMonth}>
                            <svg width="72" height="65" viewBox="0 0 72 65" fill="#8896D9" xmlns="http://www.w3.org/2000/svg" className='main__data-arrow-down'>
                                <path d="M27.3397 5C31.1887 -1.66666 40.8113 -1.66667 44.6603 5L70.641 50C74.49 56.6667 69.6788 65 61.9808 65H10.0192C2.32124 65 -2.49002 56.6667 1.35898 50L27.3397 5Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const CellDates = (props) => {
    const time = props.time;
    const index = props.index;
    const timeToday = time.minus({ days: time.day - (index + 1) })
    const link = `date/${timeToday.toFormat('dd')}/${timeToday.toFormat('MM')}/${timeToday.year}`;
    const isNow = DateTime.local().setLocale('ru').toFormat('yyyy-MM-dd') === timeToday.toFormat('yyyy-MM-dd');
    function ItsHoliday(event) {
        event.preventDefault();
        window.alert('Это выходной день');
    }
    return (
        <Link className={isNow ? 'main__cell-dates-now' : 'main__cell-dates'}
            style={{ gridColumn: `${timeToday.weekday}/${timeToday.weekday + 1}` }}
            to={link}
            onClick={timeToday.weekdayLong === 'воскресенье' ? ItsHoliday : null}>
            <span className={isNow ? 'main__d-number-now' : 'main__d-number'}>
                {timeToday.toFormat('dd')}
            </span>
        </Link>
    )
}

export default Calendar;