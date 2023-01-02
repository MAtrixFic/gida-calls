import React from 'react';
import '../styles/entrance.css'

const Entrance = () => {
    return (
        <div className='entrance'>
            <form className='entrance__form' action="#" method='POST'>
                <div className='entrance__logo-box'>
                    <h1 className='entrance__logo'>GIDA</h1>
                </div>
                <div className='entrance__log-box'>
                    <div className='entrance__log-fields'>
                        <div className='entrance__field-login'>
                            <label htmlFor="input-login" className='entrance__label-login'>Логин</label>
                            <input type="text" id="input-login" className='entrance__input-field-login' required />
                        </div>
                        <div className='entrance__field-password'>
                            <label htmlFor="input-password" className='entrance__label-password'>Пароль</label>
                            <input type="password" id="input-password" className='entrance__input-field-password' required />
                        </div>
                    </div>
                </div>
                <div className='entrance__submits-box'>
                    <div className='entrance__buttons-fields'>
                        <button type='submit' className='entrance__entry-button'>Вход</button>
                        <a href="#" className='entrance__forgot-password-button'>Забыли пароль?</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Entrance;