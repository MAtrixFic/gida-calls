import React from 'react';
import '../styles/calendarday.css';

const CalendarDay = () => {
    return (
        <>
            <div className='main__date-box'>
                <div className="main__date-calendar">
                    <h1>Календарь <span className='main__date-date'>2023</span></h1>
                </div>
            </div>
            <div className="main__time-manager-box">
                <div className="main__time-manager">
                    <div className="main__first-time-box">
                        <div className="main__first-time-block">
                            <h1>Первая смена</h1>
                        </div>
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                    </div>
                    <div className="main__second-time-box">
                        <div className="main__second-time-block">
                            <h1>Вторая смена</h1>
                        </div>
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                        <CellTime />
                    </div>
                </div>
                <div className="main__date-now">
                    <h1 className="main__date-now-month">Январь</h1>
                    <h1 className="main__date-now-number">09</h1>
                    <h1 className="main__date-now-tag">Понедельник</h1>
                </div>
                <div className="main__time-manager-buttons">
                    <button className="main__reset-time-button">
                        сбросить
                    </button>
                    <ChangeTimeButton />
                    <OkChangeButton />
                </div>
            </div>
        </>
    );
}

const CellTime = () => {
    return (
        <div className="main__cell-time">
            <input className='main__time-input' type="text" readOnly value={'**:** - **:**'} />
        </div>
    )
}

const OkChangeButton = () => {
    return (
        <button className="main__ok-change-button">
            подтвердить
        </button>
    )
}

const ChangeTimeButton = () => {
    return (
        <button className="main__change-time-button">
            изменить
        </button>
    )
}

export default CalendarDay;