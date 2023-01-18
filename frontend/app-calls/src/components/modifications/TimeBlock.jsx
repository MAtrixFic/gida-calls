import React from 'react';

const TimeBlock = ({ timeBlockName, func_01, func_02}) => {
    return (
        <div className="main__time-block">
            <button className="main__time-cell-button-blus-minus"
                onClick={func_02}>-</button>
            <h1>{timeBlockName}</h1>
            <button className="main__time-cell-button-blus-minus"
                onClick={func_01}>+</button>
        </div>
    );
}

export default TimeBlock;
