import React, { forwardRef, useState } from 'react';

const CellTime = forwardRef((props, ref) => {
    var [timeValues, setTimeValues] = useState(() =>{
        let data = [];
        let index = 0;
        for (let i = 0; i < props.callValue.length / 2; i++) {
            let row = '';
            for (let j = 0; j < 2; j++) {
                row += props.callValue[index]
                index += 1;
            }
            data.push(row);
        }
        return (data);
    });
    return (
        <div className={`main__cell-time ${props.access ? '_abled' : '_disabled'}`}>
            <InputCellTime
                timeValues={timeValues[0]}
                ref={ref}
                access={props.access} 
                group={props.group}
                indexGroup={props.index}
                indexEl={1} />
            <span className='main__cell-time-sign'>:</span>
            <InputCellTime
                timeValues={timeValues[1]}
                ref={ref}
                access={props.access}
                group={props.group}
                indexGroup={props.index}
                indexEl={2} />
            <span className='main__cell-time-sign'>-</span>
            <InputCellTime
                timeValues={timeValues[2]}
                ref={ref}
                access={props.access}
                group={props.group}
                indexGroup={props.index}
                indexEl={3} />
            <span className='main__cell-time-sign'>:</span>
            <InputCellTime
                timeValues={timeValues[3]}
                ref={ref}
                access={props.access}
                group={props.group}
                indexGroup={props.index}
                indexEl={4} />
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
            ref={(obj) => { ref.current[props.group][`${props.indexGroup}_${props.indexEl}`] = obj }}
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
    else if(event.currentTarget.value > 59){
        event.currentTarget.value = '59'
    }
}

export default CellTime;