import React, { forwardRef, useState } from 'react';

const CellTime = forwardRef((props, ref) => {
    var [timeValues] = useState(() => props.callValue.replace(':', ' ').replace('-', ' ').replace(':', ' ').split(' '));
    return (
        <div className={`main__cell-time${props.access ? '_abled' : '_disabled'}`}>
            <InputCellTime
                timeValues={timeValues[0]}
                ref={ref}
                access={props.access} />
            <span className='main__cell-time-sign'>:</span>
            <InputCellTime
                timeValues={timeValues[1]}
                ref={ref}
                access={props.access} />
            <span className='main__cell-time-sign'>-</span>
            <InputCellTime
                timeValues={timeValues[2]}
                ref={ref}
                access={props.access} />
            <span className='main__cell-time-sign'>:</span>
            <InputCellTime
                timeValues={timeValues[3]}
                ref={ref}
                access={props.access} />
        </div>
    );
});

const InputCellTime = forwardRef((props, ref) => {
    return (
        <input className={'main__time-input'}
            type="text"
            maxLength={2}
            defaultValue={props.timeValues}
            readOnly={props.access ? false : true}
            ref={(obj) => { ref.current[`${props.group}_4`] = obj }}
            onBlur={CheckOneNumber} />
    )
})

function CheckOneNumber(event) {
    if (event.currentTarget.value.length === 1) {
        event.currentTarget.value = ('0' + event.currentTarget.value)
    }
    else if(event.currentTarget.value.length === 0){
        event.currentTarget.value = '00'
    }
}

export default CellTime;