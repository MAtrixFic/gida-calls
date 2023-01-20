import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/entrance.css'

const Entrance = () => {
    var nickRef = useRef();
    var passwordRef = useRef();
    console.log(localStorage)
    async function SendUserInfo(event) {
        await Request({
            nick: nickRef.current.value,
            password: passwordRef.current.value
        }).then(data => {
            if(data.error === 'ups'){
                alert('неправильный пароль или логин')
            }
            else{
                console.log(data)
                localStorage.nick = data.nick;
                localStorage.authorized = true;
                console.log(localStorage)
            }
        });
    }

    async function Request(query = {}) {
        const res = await fetch('http://localhost:3001/entrance/send',{
            method: 'POST',
            body: new URLSearchParams(query),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
        return await res.json();
    }



    return (
        <div className='entrance'>
            <div className='entrance__form'>
                <div className='entrance__logo-box'>
                    <h1 className='entrance__logo'>GIDA</h1>
                </div>
                <div className='entrance__log-box'>
                    <div className='entrance__log-fields'>
                        <div className='entrance__field-login'>
                            <label htmlFor="input-login" className='entrance__label-login'>Логин</label>
                            <input ref={nickRef} name='login' type="text" id="input-login" className='entrance__input-field-login' required />
                        </div>
                        <div className='entrance__field-password'>
                            <label htmlFor="input-password" className='entrance__label-password'>Пароль</label>
                            <input ref={passwordRef} name='password' type="password" id="input-password" className='entrance__input-field-password' required />
                        </div>
                    </div>
                </div>
                <div className='entrance__submits-box'>
                    <div className='entrance__buttons-fields'>
                        <button onClick={SendUserInfo} className='entrance__entry-button'>Вход</button>
                        <a href="#" className='entrance__forgot-password-button'>Забыли пароль?</a>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default Entrance;