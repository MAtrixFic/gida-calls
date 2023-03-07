import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/calendarmenu.css';

const CalendarMenu = () => {

    const { day, month, year } = useParams();
    const [arrayOfChoise] = useState(() => [
        {
            name: 'Звонки',
            sPath: '#',
            dPath: `/main/calendar/bells/dynamic/${day}/${month}/${year}`
        },
        {
            name: 'Уроки',
            sPath: `/main/calendar/lessons/static/${day}/${month}/${year}`,
            dPath: `/main/calendar/lessons/dynamic/${day}/${month}/${year}`
        }]);
    const [countOfArrayOfChoise, setCountOfArrayOfChoise] = useState(() => 0);
    useEffect(() => {
        if (countOfArrayOfChoise < arrayOfChoise.length) {
            setTimeout(() => {
                setCountOfArrayOfChoise(countOfArrayOfChoise + 1)
            }, 200)
        }
    }, [countOfArrayOfChoise]);

    return (
        <div className='main__calendar-munu-box'>
            {new Array(countOfArrayOfChoise).fill('').map((_, i) =>
                <SettingCell settingsName={arrayOfChoise[i].name} key={i}
                    staticPath={arrayOfChoise[i].sPath}
                    dynamicPath={arrayOfChoise[i].dPath} />
            )}
        </div>
    );
}

export default CalendarMenu;


const SettingCell = ({ settingsName, staticPath, dynamicPath }) => {
    return (
        <div className={'main__settings-box'}>
            <span className='main__settings-name'>{settingsName}</span>
            <div className="main__settings-choise">
                <Link className='main__choise-static-link' to={`${staticPath}`}>Стандартное</Link>
                <Link className='main__choise-dynamic-link' to={`${dynamicPath}`}>Измененное</Link>
            </div>
        </div>
    );
}