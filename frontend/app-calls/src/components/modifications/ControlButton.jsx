import React from 'react';

const ControlButton = (props) => {
    return (
        <button className={props.CN}
            onClick={props.method}>
            {props.text}
        </button>
    );
}

export default ControlButton;
