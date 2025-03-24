import React from 'react'; 
import { Link } from 'react-router-dom';
import './Login.css';

export function LoginPage() {
    const handleLogin = () => {
        alert("Кнопка ввода нажата!");
    };

    return (
        <>
            <div className="container">
                <h1 className="loginHeader">ProjectHub</h1>
                <div className="form">
                    <input
                        type="text"
                        id="username"
                        placeholder="Ссылка на telegram"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Пароль"
                    />
                    <button className="button" onClick={handleLogin}>Войти</button>
                    <Link className="link" to="/RegistrationPage">Нет аккаунта? Зарегистрироваться</Link>
                </div>
            </div>
        </>
    );
}