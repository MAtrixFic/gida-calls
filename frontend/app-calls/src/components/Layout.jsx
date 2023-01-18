import React, {useState} from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import CopyTimeContext from './modifications/CopyTimeContext';
import '../styles/layout.css';

import home from '../images/home.svg';
import calendar from '../images/calendar.svg';
import voting from '../images/voting.svg';
import settings from '../images/settings.svg';
import exit from '../images/exit.svg';

const Layout = () => {
    var [copyTime, setCopyTime] = useState(()=>{
        return {first: [], second:[]}
    });
    return (
        <>
            <header className='header'>
                <div className='header__logo-box'>
                    <h1 className='header__logo'>GIDA</h1>
                </div>
                <div className='header__nav-box'>
                    <nav className='header__nav'>
                        <div className='header__main-links'>
                            <LinkComponent where="home" objClassName='header__link-home' svgIcon={home} nameLink='Домой' />
                            <LinkComponent where="calendar" objClassName='header__link-calendar' svgIcon={calendar} nameLink='Календарь' />
                            <LinkComponent where="voting" objClassName='header__link-voting' svgIcon={voting} nameLink='Голосование' />
                        </div>
                        <LinkComponent where="settings" objClassName='header__link-settings' svgIcon={settings} nameLink='Настройки' />
                    </nav>
                </div>
                <div className='header__exit-box'>
                    <LinkComponent where="entrance" objClassName='header__link-exit' svgIcon={exit} nameLink='Выход' />
                </div>
            </header>
            <main className='main'>
                <CopyTimeContext.Provider value={{copyTime, setCopyTime}}>
                <Outlet />
                </CopyTimeContext.Provider>
            </main>
        </>
    );
}

const LinkComponent = (props) => {
    return (
        <NavLink to={props.where} className={props.objClassName}>
            <img className='header__link-icon' src={props.svgIcon} alt="*" />
            <h1 className='header__link-name'>{props.nameLink}</h1>
        </NavLink>
    )
}

export default Layout;