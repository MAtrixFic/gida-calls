import React, { forwardRef } from 'react';
import { DateTime } from 'luxon';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
            setTime(time.plus({ month: 1 }))
            setShowMonth(prev => !prev);
            setUpOrDown(1)
            setDaysInM(0)
        }
    }

    const MinusMonth = () => {
        if (tap) {
            setTap(false)
            setTime(time.minus({ month: 1 }))
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

    useEffect(() => {
        console.log('effect')
        setMonth(time.toFormat('LLLL'));
    }, [time])

    useEffect(() => {
        if (daysInM !== time.daysInMonth) {
            if (daysInM === 0) {
                setTimeout(() => {
                    setDaysInM(prev => prev + 1)
                }, 100)
            }
            else {
                setTimeout(() => {
                    setDaysInM(prev => prev + 1)
                }, 30)
            }
        }
        else {
            setTap(true)
        }
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
                        {[...new Array(daysInM)].map((_, i) => {
                            return (
                                <CellDates index={i} time={time} />
                            )
                        })}
                    </div>
                </div>
                <div className="main__data-changer-box">
                    <div className="main__data-changer-body">
                        <button className='main__data-change-b-up' onClick={MinusMonth}>
                            <img className='main__data-arrow-up' src={arrow} alt="" />
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
                            <img className='main__data-arrow-down' src={arrow} alt="" />
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