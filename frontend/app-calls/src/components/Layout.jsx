import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../styles/layout.css';

const Layout = () => {
    return (
        <>
            <header className='header'>
                <div className='header__logo-box'>
                    <h1 className='header__logo'>GIDA</h1>
                </div>
                <div className='header__nav-box'>
                    <nav className='header__nav'>
                        <div className='header__main-links'>
                            <NavLink to="#" className='header__link-home'>Домой</NavLink>
                            <NavLink to="calendar" className='header__link-calendar'>Календарь</NavLink>
                            <NavLink to="#" className='header__link-voting'>Голосование</NavLink>
                        </div>
                        <NavLink to="#" className='header__link-settings'>Настройки</NavLink>
                    </nav>
                </div>
                <div className='header__exit-box'>
                    <NavLink className='header__link-exit'>Выход</NavLink>
                </div>
            </header>
            <main className='main'>
                <Outlet />
            </main>
        </>
    );
}

export default Layout;