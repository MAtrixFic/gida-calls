import React, { useState } from 'react';
import '../styles/voting.css';

const Voting = () => {
    var [rowColunm, setRowColumn] = useState(() => false);
    var [elementsLen, setElementsLen] = useState(() => 0);

    return (
        <>
            <div className='main__date-box'>
                <div className="main__date-calendar">
                    <h1>Голосование <span className='main__date-date'>{2023}</span></h1>
                </div>
            </div>
            <div className="main__voting-box">
                <div className="main__v-tool-bar">
                    <button className="main__v-make-column" onClick={() => setRowColumn(false)}>
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C8 6.20914 6.20914 8 4 8C1.79086 8 0 6.20914 0 4C0 1.79086 1.79086 0 4 0C6.20914 0 8 1.79086 8 4ZM8 34C8 36.2091 6.20914 38 4 38C1.79086 38 0 36.2091 0 34C0 31.7909 1.79086 30 4 30C6.20914 30 8 31.7909 8 34ZM4 23C6.20914 23 8 21.2091 8 19C8 16.7909 6.20914 15 4 15C1.79086 15 0 16.7909 0 19C0 21.2091 1.79086 23 4 23ZM38 4C38 6.20914 36.2091 8 34 8C31.7909 8 30 6.20914 30 4C30 1.79086 31.7909 0 34 0C36.2091 0 38 1.79086 38 4ZM34 38C36.2091 38 38 36.2091 38 34C38 31.7909 36.2091 30 34 30C31.7909 30 30 31.7909 30 34C30 36.2091 31.7909 38 34 38ZM38 19C38 21.2091 36.2091 23 34 23C31.7909 23 30 21.2091 30 19C30 16.7909 31.7909 15 34 15C36.2091 15 38 16.7909 38 19ZM19 8C21.2091 8 23 6.20914 23 4C23 1.79086 21.2091 0 19 0C16.7909 0 15 1.79086 15 4C15 6.20914 16.7909 8 19 8ZM23 34C23 36.2091 21.2091 38 19 38C16.7909 38 15 36.2091 15 34C15 31.7909 16.7909 30 19 30C21.2091 30 23 31.7909 23 34ZM19 23C21.2091 23 23 21.2091 23 19C23 16.7909 21.2091 15 19 15C16.7909 15 15 16.7909 15 19C15 21.2091 16.7909 23 19 23Z" fill="#2D4047" />
                        </svg>

                    </button>
                    <button className="main__v-make-row" onClick={() => setRowColumn(true)}>
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2C0 0.895431 0.895431 0 2 0H36C37.1046 0 38 0.895431 38 2C38 3.10457 37.1046 4 36 4H2C0.89543 4 0 3.10457 0 2ZM0 36C0 34.8954 0.895431 34 2 34H36C37.1046 34 38 34.8954 38 36C38 37.1046 37.1046 38 36 38H2C0.89543 38 0 37.1046 0 36ZM2 17C0.895431 17 0 17.8954 0 19C0 20.1046 0.89543 21 2 21H36C37.1046 21 38 20.1046 38 19C38 17.8954 37.1046 17 36 17H2Z" fill="#6E8087" />
                        </svg>
                    </button>
                    <button className="main-v-add-voting" onClick={() => setElementsLen(prev => prev + 1)}>
                        Создать голосование
                        <span className="main-v-add-voting-sign">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="#8A96D6" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8V0H8V8L0 8V10L8 10V18H10V10L18 10V8L10 8Z" />
                            </svg>
                        </span>
                    </button>
                </div>
                <ul className={`main__voting-list ${rowColunm ? 'row' : 'column'}`}>
                    {[...new Array(elementsLen)].map((_, i) => {
                        return <li key={i} className='main__voting-cell'>{i + 1}</li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default Voting;
