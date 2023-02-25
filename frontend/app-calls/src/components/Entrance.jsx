import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVERIP } from './constantDatas/constsOfServer';
import '../styles/entrance.css'

const Entrance = () => {
    const [serverIp] = useState(() => SERVERIP.local);
    var nickRef = useRef();
    var passwordRef = useRef();
    const nav = useNavigate()
    console.log(localStorage)
    
    async function SendUserInfo(event) {
        await Request({
            username: nickRef.current.value,
            password: passwordRef.current.value
        }).then(data => {
            if (data.status === 'authenticated') {
                localStorage.setItem('auth', data.res)
                localStorage.setItem('status', 'authorized')
                nav('/calendar');
            }
            else {
                alert(data.res)
            }
        });
    }

    async function Request(query = {}) {
        const res = await fetch(`http://${serverIp}/auth/log`, {
            method: 'POST',
            body: new URLSearchParams(query),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
        return await res.json();
    }

    function ShowPassword() {
        if (passwordRef.current.type === 'password') {
            passwordRef.current.type = 'text';
        }
        else if (passwordRef.current.type === 'text') {
            passwordRef.current.type = 'password'
        }
    }


    return (
        <div className='entrance'>
            <div className='entrance__form'>
                <div className='entrance__logo-box'>
                    <h1 className='entrance__logo'>GIDA BELL</h1>
                </div>
                <div className='entrance__log-box'>
                    <div className='entrance__log-fields'>
                        <div className='entrance__field-login'>
                            <label htmlFor="input-login" className='entrance__label-login'>Логин</label>
                            <input ref={nickRef} name='login' type="text" id="input-login" className='entrance__input-field-login' autoComplete={'on'} required />
                        </div>
                        <div className='entrance__field-password'>
                            <label onClick={ShowPassword} htmlFor="input-password" className='entrance__label-password'>Пароль</label>
                            <input ref={passwordRef} name='password' type="password" id="input-password" className='entrance__input-field-password' autoComplete={'off'} required />
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