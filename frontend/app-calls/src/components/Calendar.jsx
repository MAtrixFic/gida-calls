import React from 'react';
import '../styles/calendar.css';
import arrow from '../images/arrow.svg';

const Calendar = () => {
    return (
        <>
            <div className='main__date-box'>
                <div className="main__date-calendar">
                    <h1>Календарь <span className='main__date-date'>2023</span></h1>
                </div>
            </div>
            <div className='main__calendar-box'>
                <div className='main__calendar'>
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                    <Сell_dates month="Январь" number="09" tag="Понедельник" />
                </div>
            </div>
            <div className='main__data-changer-box'>
                <div className="main__data-changer-body">
                    <div className="main__button-change-left">
                        <img src={arrow} alt="<" />
                    </div>
                    <div className="main__date-change">Январь</div>
                    <div className="main__button-change-right">
                        <img src={arrow} alt=">" />
                    </div>
                </div>
            </div>
        </>
    );
}

const Сell_dates = (props) => {
    return (
        <div className="main__cell-dates">
            <h1 className="main__d-year">{props.month}</h1>
            <h1 className="main__d-number">{props.number}</h1>
            <h1 className="main__d-tag">{props.tag}</h1>
        </div>
    )
}

export default Calendar;
