import React from 'react';

const DateNow = ({type, _thisTime, weekDay }) => {
    if(type === 'dynamic'){
        return (
            <div className="main__date-now">
                <h1 className="main__date-now-month">{_thisTime.monthLong}</h1>
                <h1 className="main__date-now-number">{_thisTime.toFormat('dd')}</h1>
                <h1 className="main__date-now-tag">{_thisTime.weekdayLong}</h1>
            </div>
        );
    }
    else if(type === 'static'){
        return (
            <div className="main__date-now one">
                <h1 className="main__date-week-day">{weekDay}</h1>
            </div>
        );
    }
}

export default DateNow;
