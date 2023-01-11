import React, { forwardRef, useState } from 'react';

const CellTime = forwardRef((props, ref) => {
    var [timeValues] = useState(() => props.callValue.replace(':',' ').replace('-',' ').replace(':',' ').split(' '));
    return (
        <div className={`main__cell-time${props.access ? '_abled' : '_disabled'}`}>
            <input className={'main__time-input'}
                type="text"
                maxLength={2}
                defaultValue={timeValues[0]}
                readOnly={props.access ? false : true}
                ref={(obj) => { ref.current[`${props.group}_1`] = obj }} />
            <span className='main__cell-time-sign'>:</span>
            <input className={'main__time-input'}
                type="text"
                maxLength={2}
                defaultValue={timeValues[1]}
                readOnly={props.access ? false : true}
                ref={(obj) => { ref.current[`${props.group}_2`] = obj }} />
            <span className='main__cell-time-sign'>-</span>
            <input className={'main__time-input'}
                type="text"
                maxLength={2}
                defaultValue={timeValues[2]}
                readOnly={props.access ? false : true}
                ref={(obj) => { ref.current[`${props.group}_3`] = obj }} />
            <span className='main__cell-time-sign'>:</span>
            <input className={'main__time-input'}
                type="text"
                maxLength={2}
                defaultValue={timeValues[3]}
                readOnly={props.access ? false : true}
                ref={(obj) => { ref.current[`${props.group}_4`] = obj }} />
        </div>
    );
});

export default CellTime;