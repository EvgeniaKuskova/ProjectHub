import React from 'react'; 
import {Link, useNavigate} from 'react-router-dom';
import './LoginAndRegistration.css';

export function LoginPage() {

    const navigation = useNavigate();

    const handleLogin = () => {
        navigation('/')
    };

    return (
        <>
            <div className="container">
                <h1 className="loginHeader">ProjectHub</h1>
                <form className="form">
                    <input
                        type="text"
                        className="form-input-login username"
                        placeholder="Ссылка на telegram"
                    />
                    <input
                        type="password"
                        className="form-input-login password"
                        placeholder="Пароль"
                    />
                    <button className="button" type="button" onClick={handleLogin}>Войти</button>
                    <Link className="link" to="/Registration">Нет аккаунта? Зарегистрироваться</Link>
                </form>
            </div>
        </>
    );
}