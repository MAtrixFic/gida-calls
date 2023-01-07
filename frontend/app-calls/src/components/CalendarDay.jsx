import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import '../styles/calendarday.css';


const CalendarDay = () => {

    const gotTime = useParams();
    const [thisTime] = useState(() =>
        DateTime.local(Number(gotTime.year),
            Number(gotTime.month),
            Number(gotTime.day))
            .toLocal('ru'));

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
                    <h1 className="main__date-now-month">{thisTime.monthLong}</h1>
                    <h1 className="main__date-now-number">{thisTime.toFormat('dd')}</h1>
                    <h1 className="main__date-now-tag">{thisTime.weekdayLong}</h1>
                </div>
                <div className="main__time-manager-buttons">
                    <ResetButton />
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
            <input className='main__time-input' type="text" readOnly defaultValue={'**:** - **:**'} />
        </div>
    )
}

const ResetButton = () => {
    return (
        <button className="main__reset-time-button">
            сбросить
        </button>
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