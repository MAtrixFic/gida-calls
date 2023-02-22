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
                    <h1 className='header__logo'>GIDA BELL</h1>
                </div>
                <button className='header__exit-top' onClick={Exit}>
                    <span className='header__exit-name'>Выход</span>
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