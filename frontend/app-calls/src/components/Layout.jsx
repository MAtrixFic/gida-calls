import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import '../styles/layout.css';

import home from '../images/home.svg';
import calendar from '../images/calendar.svg';
import voiting from '../images/voiting.svg';

const Layout = () => {
    const nav = useNavigate()
    function Exit() {
        if (localStorage.status === 'authorized') {
            let exitM = window.confirm('Вы действительно хотите выйти из учетной записи?');
            if (exitM) {
                localStorage.setItem('status', 'unauthorized');
                localStorage.setItem('auth', 'nothing')
                nav('/auth/log')
            }
        }
        else {
            nav('/auth/log')
        }
    }
    return (
        <>
            <header className='header__logo-top'>
                <div className='header__logo-top-box'>
                    <h1 className='header__logo'>GB</h1>
                </div>
                <button className='header__exit-top' onClick={Exit}>
                    <svg fill="#8A96D6" viewBox="0 0 16 16" className='header__exit-icon' xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 0H9V2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H9V16H3C1.34315 16 0 14.6569 0 13V3C0 1.34315 1.34315 0 3 0ZM14.6879 7.1583C15.3013 7.5518 15.3013 8.4482 14.6879 8.8417L10.7899 11.3422C10.1244 11.7692 9.25 11.2913 9.25 10.5006V9H4C3.44772 9 3 8.55228 3 8C3 7.44772 3.44772 7 4 7H9.25V5.49945C9.25 4.70872 10.1244 4.23079 10.7899 4.65775L14.6879 7.1583Z" />
                    </svg>
                </button>
            </header>
            <header className='header'>
                <div className='header__logo-box'>
                    <h1 className='header__logo'>GIDA BELL</h1>
                </div>
                <nav className='header__nav-box'>
                    <LinkComponent where="/main/home" nameLink='Домой' icon={home} />
                    <LinkComponent where="/main/calendar" nameLink='Календарь' icon={calendar} />
                    <LinkComponent where="/main/voting" nameLink='Голосование' icon={voiting} />
                </nav>
                <div className='header__exit-box'>
                    <button className='header__exit' onClick={Exit}>
                        <span className='header__exit-name'>Выход</span>
                    </button>
                </div>
            </header>
            <main className='main'>
                <Outlet />
            </main>
        </>
    );
}

const LinkComponent = (props) => {
    return (
        <NavLink to={props.where} className="header__link">
            <img src={props.icon} alt="*" className='header__link-icon' />
            <span className='header__link-name'>{props.nameLink}</span>
        </NavLink>
    )
}

export default Layout;