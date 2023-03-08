import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/weekdayslist.css';

const WeekDaysList = () => {
    const { theme } = useParams()
    const [WeekDays] = useState(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']);
    return (
        <div className='main__week-days-box'>
            {WeekDays.map((el, i) => <Link key={i} to={`/main/${theme}/static/${el.toLowerCase()}`} className='main__week-day'>{el}</Link>)}
        </div>
    );
}

export default WeekDaysList;
