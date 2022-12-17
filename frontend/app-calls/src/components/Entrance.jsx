import React from 'react';
import '../styles/entrance.css'
import circle_pink from '../images/circle_pink.svg';
import circle_blue from '../images/circle_blue.svg';
import circle_green from '../images/circle_green.svg';


const Entrance = () => {
    return (
        <div className='entrance'>
            <img src={circle_pink} alt="o" className='entrance__circle-pink'/>
            <img src={circle_blue} alt="o" className='entrance__circle-blue'/>
            <img src={circle_green} alt="o" className='entrance__circle-green'/>
            <form action="http://localhost:3001/entrance" method='POST' className='entrance__form'>
                <section className='entrance__logo-log'>
                    <h1>GIDA</h1>
                </section>
                <section className='entrance__fields-log'>
                    <article className='entrance__field-login'>
                        <input
                            type="text"
                            name="login"
                            required
                            id="login" />
                        <label className='entrance__label-login' htmlFor='login'>Логин</label>
                    </article>
                    <article className='entrance__field-password'>
                        <input
                            type="password"
                            name="password"
                            required
                            id="password" />
                        <label className='entrance__label-password' htmlFor='password'>Пароль</label>
                    </article>
                </section>
                <section className='entrance__chb-log'>
                    <label className='entrance__label-remember' htmlFor='remember'>Запомнить</label>
                    <input type="checkbox"
                        name="remember"
                        id="remember" />
                </section>
                <section className='entrance__buttons-log'>
                    <button
                        type="submit"
                        className="entrance__button-ent" >
                        Вход
                    </button>
                </section>
            </form>
        </div>
    );
}

export default Entrance;