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
        setTime(time.plus({ month: 1 }))
        setShowMonth(prev => !prev);
        setUpOrDown(1)
    }

    const MinusMonth = () => {
        setTime(time.minus({ month: 1 }))
        setShowMonth(prev => !prev);
        setUpOrDown(2)
    }

    var [showMonth, setShowMonth] = useState(() => false);
    var [time, setTime] = useState(() => GetTime());
    var [month, setMonth] = useState(() => time.toFormat('LLLL'));
    var [upOrDown, setUpOrDown] = useState(() => 0);
    var [daysInM, setDaysInM] = useState(() => 0);

    useEffect(() => {
        console.log('effect')
        setMonth(time.toFormat('LLLL'));
        setDaysInM(prev => prev = 0)
    }, [time])

    useEffect(() => {
        if (daysInM !== time.daysInMonth) {
            setTimeout(() => {
                setDaysInM(prev => prev + 1)
            }, 200)
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
    const daysList ={
        appear: null,
        appearActive: 'active',
        appearDone: 'done',
        enter: null,
        enterActive: 'active',
        enterDone: 'done',
        exit: null,
        exitActive: 'passive',
        exitDone: 'dead',
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
                    <TransitionGroup component={'div'} className='main__calendar-cells'>
                        {[...new Array(daysInM)].map((_, i) => {
                            return (
                                <CSSTransition
                                    key={i}
                                    timeout={500}
                                    classNames={daysList}
                                    unmountOnExit
                                    mountOnEnter>
                                    <CellDates index={i} time={time} />
                                </CSSTransition>
                            )
                        })}
                    </TransitionGroup>
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
            <h1 className={isNow ? 'main__d-number-now' : 'main__d-number'}>
                {timeToday.toFormat('dd')}
            </h1>
        </Link>
    )
}

export default Calendar;