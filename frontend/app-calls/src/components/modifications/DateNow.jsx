import React from 'react';

const DateNow = ({ _thisTime }) => {
    return (
        <div className="main__date-now">
            <h1 className="main__date-now-month">{_thisTime.monthLong}</h1>
            <h1 className="main__date-now-number">{_thisTime.toFormat('dd')}</h1>
            <h1 className="main__date-now-tag">{_thisTime.weekdayLong}</h1>
        </div>
    );
}

export default DateNow;
